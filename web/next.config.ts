import type { NextConfig } from "next";

// GitHub Pages serves a project site under /<repo> until a custom domain is
// attached. The deploy workflow passes the path from actions/configure-pages,
// which is empty once josemuniz.dev points at this repo.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
