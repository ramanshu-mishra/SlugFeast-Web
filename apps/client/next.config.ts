import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
};

export default nextConfig;
module.exports = {
    fastRefresh: true,
    concurrentFeatures: true,
    productionBrowserSourceMaps: false, // Disable source maps in development
    optimizeFonts: false, // Disable font optimization
    minify: false, // Disable minification
};
