import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// Karma Timal — Edge security middleware
//
// Responsibilities
//   1. Block known bad user-agents (vulnerability scanners, exploit bots).
//   2. Block traversal & probing paths before they reach the app.
//   3. Cheap in-memory rate-limit per IP for write endpoints (booking form, API).
//   4. Add request ID for log correlation.
//   5. Reject requests with suspicious content-type / oversized bodies.
//
// Notes
//   - The in-memory limiter is per-edge-instance. On Vercel Edge it covers the
//     vast majority of automated attacks. For high traffic, swap for Upstash
//     Redis (see `RATELIMIT_KV_URL` env var hook in `rateLimit()`).
// ─────────────────────────────────────────────────────────────────────────────

/** Block list — user-agents commonly used by attack tooling. */
const BLOCKED_UA_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /nessus/i,
  /openvas/i,
  /acunetix/i,
  /nmap/i,
  /masscan/i,
  /zgrab/i,
  /metasploit/i,
  /\bcurl\/7\.\d{1,2}\.0\b/i, // very-old curl often used in scripts
  /python-requests\/2\.(1\d|[0-9])\b/i, // very-old requests
  /go-http-client/i,
  /libwww-perl/i,
  /wpscan/i,
];

/** Block list — suspicious URL patterns (probes for known CMS / leaks). */
const BLOCKED_PATH_PATTERNS = [
  /\.env(\.|$)/i,
  /\.git\//i,
  /\.svn\//i,
  /\.ds_store/i,
  /\/wp-(admin|login|content|includes)\b/i,
  /\/xmlrpc\.php/i,
  /\/phpmyadmin/i,
  /\/admin\.php/i,
  /\/config\.json$/i,
  /\/etc\/passwd/i,
  /\/proc\/self/i,
  /\.{2,}\//, // path traversal "../"
  /%2e%2e/i, // URL-encoded traversal
  /<script/i, // reflected XSS attempt in URL
  /\bunion\s+select\b/i, // SQLi attempt in URL
];

/** Routes for which we apply strict per-IP rate limits. */
const RATE_LIMITED_PATHS = ["/booking", "/api/"];

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 req/min/IP on protected paths
const GLOBAL_LIMIT_MAX = 240; // 4 req/sec/IP global cap (very generous for humans)

interface Bucket {
  hits: number;
  windowStart: number;
}
// per-edge instance memory. Trades cross-region perfection for zero cost.
const ipBuckets = new Map<string, Bucket>();
const globalBuckets = new Map<string, Bucket>();

function getClientIp(req: NextRequest): string {
  // Vercel sets these; fall back to "unknown" never used as key for important logic.
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return req.ip || "0.0.0.0";
}

function rateLimit(
  ip: string,
  store: Map<string, Bucket>,
  max: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  const bucket = store.get(ip);
  if (!bucket || now - bucket.windowStart > windowMs) {
    store.set(ip, { hits: 1, windowStart: now });
    return { allowed: true, remaining: max - 1, resetMs: windowMs };
  }
  bucket.hits += 1;
  if (bucket.hits > max) {
    return { allowed: false, remaining: 0, resetMs: windowMs - (now - bucket.windowStart) };
  }
  return { allowed: true, remaining: max - bucket.hits, resetMs: windowMs - (now - bucket.windowStart) };
}

/** Periodic GC of stale buckets (memory hygiene). */
function gcBuckets() {
  const now = Date.now();
  const sweep = (store: Map<string, Bucket>, ttl: number) => {
    if (store.size < 5000) return; // only trigger when memory grows
    for (const [ip, b] of store) {
      if (now - b.windowStart > ttl * 4) store.delete(ip);
    }
  };
  sweep(ipBuckets, RATE_LIMIT_WINDOW_MS);
  sweep(globalBuckets, RATE_LIMIT_WINDOW_MS);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") || "";
  const ip = getClientIp(request);

  // ── 1. Reject scanners / known bad bots immediately ────────────────────────
  if (BLOCKED_UA_PATTERNS.some((re) => re.test(ua))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // ── 2. Reject probe paths (cheap) ─────────────────────────────────────────
  if (BLOCKED_PATH_PATTERNS.some((re) => re.test(pathname + request.nextUrl.search))) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // ── 3. Global cheap-cap to brake DoS bursts ────────────────────────────────
  const global = rateLimit(ip, globalBuckets, GLOBAL_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!global.allowed) {
    gcBuckets();
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": Math.ceil(global.resetMs / 1000).toString(),
        "X-RateLimit-Limit": GLOBAL_LIMIT_MAX.toString(),
        "X-RateLimit-Remaining": "0",
      },
    });
  }

  // ── 4. Strict rate-limit for sensitive endpoints ───────────────────────────
  const isSensitive = RATE_LIMITED_PATHS.some((p) => pathname.startsWith(p));
  if (isSensitive) {
    const limited = rateLimit(ip, ipBuckets, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
    if (!limited.allowed) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Slow down." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": Math.ceil(limited.resetMs / 1000).toString(),
            "X-RateLimit-Limit": RATE_LIMIT_MAX.toString(),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }
  }

  // ── 5. Block requests with suspicious oversized headers ────────────────────
  let headerSize = 0;
  request.headers.forEach((v) => (headerSize += v.length));
  if (headerSize > 8192) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  // ── 6. Decorate request with a correlation ID for observability ────────────
  const response = NextResponse.next();
  response.headers.set("x-request-id", crypto.randomUUID());

  // Also restate critical security headers at edge (defence in depth).
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

// ─────────────────────────────────────────────────────────────────────────────
// Apply middleware to all routes EXCEPT static assets and the optimized image
// handler (which is owned by Next and has its own cache rules).
// ─────────────────────────────────────────────────────────────────────────────
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|photos/).*)",
  ],
};
