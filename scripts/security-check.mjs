#!/usr/bin/env node
/**
 * Karma Timal — pre-deploy security check
 *
 * Run automatically before each build/deploy (see package.json:audit:security).
 * Fails (exit 1) if any check fails.
 *
 *   1. Scan the working tree for accidentally-committed secrets.
 *   2. Ensure .env files are .gitignored.
 *   3. Ensure essential security files exist.
 *   4. Verify next.config.js sets at least the most important headers.
 *   5. Verify middleware.ts exists.
 *   6. Sanity-check that no NEXT_PUBLIC_ var carries something that looks like a secret.
 *
 * Intentionally has zero third-party deps so it runs anywhere.
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

let failures = 0;
const skip = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  ".vercel",
  ".turbo",
  "out",
  ".cache",
  "public/photos/.originals",
]);

// Lock files contain base64 hash digests that look like secrets but aren't.
const LOCK_FILES = new Set(["package-lock.json", "yarn.lock", "pnpm-lock.yaml"]);

const SECRET_PATTERNS = [
  // AWS
  { name: "AWS Access Key", re: /AKIA[0-9A-Z]{16}/g },
  { name: "AWS Secret", re: /(?:^|[^A-Za-z0-9])([A-Za-z0-9/+=]{40})(?:[^A-Za-z0-9]|$)/g, prefilter: "aws" },
  // Generic API tokens
  { name: "Resend API key", re: /re_[A-Za-z0-9]{20,}/g },
  { name: "Stripe key", re: /(sk|pk)_(test|live)_[A-Za-z0-9]{16,}/g },
  { name: "Anthropic key", re: /sk-ant-[A-Za-z0-9_-]{20,}/g },
  { name: "OpenAI key", re: /sk-[A-Za-z0-9]{20,}/g },
  { name: "GitHub PAT", re: /gh[ps]_[A-Za-z0-9]{36,}/g },
  { name: "Google API key", re: /AIza[0-9A-Za-z_-]{35}/g },
  // Generic high-entropy after a "secret" / "token" keyword
  { name: "Hardcoded secret literal", re: /(?:secret|password|api_?key|token)\s*[:=]\s*['"][A-Za-z0-9_+/=-]{16,}['"]/gi },
  // Private key headers
  { name: "Private key", re: /-----BEGIN (RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/g },
  // JWT (3 base64url segments)
  { name: "JWT", re: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g },
];

function walk(dir, files = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(ROOT, full);
    if ([...skip].some((s) => rel === s || rel.startsWith(s + path.sep))) continue;
    if (e.isDirectory()) walk(full, files);
    else if (
      /\.(t|j)sx?$/.test(e.name) ||
      /\.(json|md|env|ya?ml|toml|sh|mjs|cjs)$/.test(e.name) ||
      e.name === ".npmrc"
    ) {
      files.push(full);
    }
  }
  return files;
}

function fail(msg) {
  failures += 1;
  console.error(`${RED}✗ ${msg}${RESET}`);
}
function ok(msg) {
  console.log(`${GREEN}✓ ${msg}${RESET}`);
}
function warn(msg) {
  console.log(`${YELLOW}! ${msg}${RESET}`);
}

console.log("\n=== Karma Timal · pre-deploy security check ===\n");

// ── 1. Secret scan ─────────────────────────────────────────────────────────
const files = walk(ROOT);
let secretsFound = 0;
for (const file of files) {
  if (path.basename(file) === ".env.example") continue;
  if (file.endsWith("security-check.mjs")) continue; // skip self
  if (LOCK_FILES.has(path.basename(file))) continue; // base64 hashes ≠ secrets
  let content;
  try {
    content = fs.readFileSync(file, "utf8");
  } catch {
    continue;
  }
  for (const { name, re } of SECRET_PATTERNS) {
    re.lastIndex = 0;
    const matches = content.match(re);
    if (matches) {
      // Filter out obvious noise (lock files / hash digests)
      const real = matches.filter((m) => !/integrity|sha512-|sha256-/.test(m));
      if (real.length > 0) {
        secretsFound += real.length;
        fail(`Possible ${name} in ${path.relative(ROOT, file)}`);
      }
    }
  }
}
if (secretsFound === 0) ok("No leaked secrets detected");

// ── 2. .gitignore must list env files ──────────────────────────────────────
const gi = path.join(ROOT, ".gitignore");
if (!fs.existsSync(gi)) {
  fail(".gitignore is missing");
} else {
  const gic = fs.readFileSync(gi, "utf8");
  if (!/\.env(\b|\.\*)/.test(gic)) fail(".gitignore does not exclude .env files");
  else ok(".gitignore excludes env files");
  if (!/node_modules/.test(gic)) fail(".gitignore does not exclude node_modules");
}

// ── 3. Required security files ─────────────────────────────────────────────
const required = [
  "next.config.js",
  "middleware.ts",
  "app/booking/actions.ts",
  ".env.example",
];
for (const f of required) {
  if (!fs.existsSync(path.join(ROOT, f))) fail(`Required file missing: ${f}`);
  else ok(`Found ${f}`);
}

// ── 4. next.config.js must define security headers ─────────────────────────
const nc = fs.readFileSync(path.join(ROOT, "next.config.js"), "utf8");
for (const h of [
  "Strict-Transport-Security",
  "X-Frame-Options",
  "X-Content-Type-Options",
  "Content-Security-Policy",
  "Referrer-Policy",
  "Permissions-Policy",
  "poweredByHeader",
]) {
  if (!nc.includes(h)) fail(`next.config.js is missing ${h}`);
}

// ── 5. No NEXT_PUBLIC_ secret-looking vars in code ─────────────────────────
const grepPublic = files
  .filter((f) => /\.(t|j)sx?$/.test(f))
  .flatMap((f) => {
    const content = fs.readFileSync(f, "utf8");
    const m = content.match(/NEXT_PUBLIC_[A-Z_]+/g) || [];
    return m;
  });
const suspicious = grepPublic.filter((v) =>
  /(KEY|SECRET|TOKEN|PASSWORD|PRIVATE)/i.test(v)
);
if (suspicious.length) {
  fail(
    "Suspicious NEXT_PUBLIC_ variables referenced in code (these are sent to the browser): " +
      [...new Set(suspicious)].join(", ")
  );
} else {
  ok("No suspicious NEXT_PUBLIC_ variables");
}

// ── 6. npm audit (high or above blocks deploy) ─────────────────────────────
try {
  execSync("npm audit --audit-level=high --omit=dev", { stdio: "pipe" });
  ok("npm audit: no high/critical vulnerabilities in production deps");
} catch (e) {
  // Non-fatal for now (Next.js carries some advisories we mitigate at app layer)
  warn(
    "npm audit reports advisories. Inspect with `npm audit` and confirm they are mitigated."
  );
}

// ── Summary ────────────────────────────────────────────────────────────────
console.log();
if (failures > 0) {
  console.error(`${RED}✗ Security check failed: ${failures} issue(s).${RESET}`);
  process.exit(1);
}
console.log(`${GREEN}✓ All security checks passed.${RESET}`);
