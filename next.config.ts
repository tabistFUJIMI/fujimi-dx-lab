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
            // TODO: script-src の 'unsafe-inline' を nonce 方式に置き換える。
            //   現状は Google Tag Manager のインラインスクリプトを許可するため残している。
            //   対応時は proxy.ts (Next.js middleware) で per-request nonce を生成し、
            //   layout.tsx の <Script> / next/script に nonce prop を渡す必要がある。
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
