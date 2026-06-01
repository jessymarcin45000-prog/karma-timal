/** @type {import('next').NextConfig} */

// ─────────────────────────────────────────────────────────────────────────────
// Content Security Policy
// ─────────────────────────────────────────────────────────────────────────────
// Strict-by-default. Whitelist exact 3rd parties we actually embed.
//
// Sources whitelisted because of integrations :
//   - Spotify : open.spotify.com (iframe + their scripts/styles inside iframe)
//   - YouTube  : youtube.com, youtube-nocookie.com, ytimg.com
//   - Unsplash : images.unsplash.com (was for placeholders; safe to keep)
//   - Google Fonts (loaded via next/font, served from same origin)
// ─────────────────────────────────────────────────────────────────────────────
const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  // 'unsafe-inline' is required for Next.js inline styles (Tailwind) and
  // some framer-motion runtime styles. We accept this trade-off.
  "style-src 'self' 'unsafe-inline'",
  // 'unsafe-inline' & 'unsafe-eval' required by Next.js dev tools and React.
  // In production, Next emits its own scripts on the same origin (no eval needed by default).
  "script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""),
  "img-src 'self' data: blob: https://images.unsplash.com https://i.scdn.co https://i.ytimg.com https://*.googleusercontent.com",
  "media-src 'self' https://*.googlevideo.com",
  "font-src 'self' data:",
  "connect-src 'self' https://open.spotify.com https://www.youtube.com",
  "frame-src https://open.spotify.com https://www.youtube.com https://www.youtube-nocookie.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Forces HTTPS for 2 years, including subdomains. Preload-ready.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Prevent rendering inside iframes (clickjacking).
  // Redundant with frame-ancestors but covers older browsers.
  { key: "X-Frame-Options", value: "DENY" },
  // No MIME-type sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Disable powerful browser APIs we don't use.
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()",
  },
  // Limit referrer leakage cross-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // CSP applied as report-only in dev, enforced in prod.
  {
    key: process.env.NODE_ENV === "production" ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  // Cross-Origin isolation
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Prevent IE from launching downloads in site context.
  { key: "X-Download-Options", value: "noopen" },
  // Disable DNS prefetching to avoid info leak.
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig = {
  reactStrictMode: true,
  // Hide the X-Powered-By: Next.js header (don't advertise stack to attackers).
  poweredByHeader: false,
  // Compress responses.
  compress: true,
  // Disable image optimization (sharp issue) + lock remote sources.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.scdn.co" },
    ],
    // Cap content type sniffing within next/image too.
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Prevent SVG with embedded JS.
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [
      {
        // Apply security headers to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Aggressive caching for static photos (immutable).
        source: "/photos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Block common attack-path probes & dotfile lookups.
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/wp-login.php",
        destination: "/",
        permanent: false,
      },
      {
        source: "/.env",
        destination: "/",
        permanent: false,
      },
      {
        source: "/.git/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
