/** @type {import('next').NextConfig} */
const path = require("path");
const withTM = require("next-transpile-modules")(["gsap"]);
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  plugins: [
    [
      "@fullhuman/postcss-purgecss",
      {
        content: [
          "./pages/**/*.{js,jsx,ts,tsx}",
          "./components/**/*.{js,jsx,ts,tsx}",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    ],
    "postcss-preset-env",
  ],
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 60,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["localhost"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  eslint: {
    ignoreDuringBuilds: true,
    // extends: ['eslint:recommended', 'next'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  output: "standalone",
  compress: true,
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = withBundleAnalyzer(withTM(nextConfig));
