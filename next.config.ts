// next.config.ts
import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  // Service worker source (compiled by Next.js separately)
  swSrc: "app/sw.ts",
  // Output location (must be in public/ for browser access)
  swDest: "public/sw.js",
  // CRITICAL: Disable SW in development to avoid Turbopack/HMR conflicts
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withSerwist(nextConfig);
