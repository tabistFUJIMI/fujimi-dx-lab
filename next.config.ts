import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: "/products/fujimin-pass", destination: "/fujimin-pass", permanent: true },
      { source: "/lp/massage", destination: "/fujimin-pass", permanent: true },
      { source: "/lp/reserve-navi", destination: "/products/reserve-navi", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://ask-navi.fujimin-pass.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
              "font-src 'self' fonts.googleapis.com fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://*.googletagmanager.com",
              "frame-src https://ask-navi.fujimin-pass.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
