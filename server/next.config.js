/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
};

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  // assetPrefix: isProd ? "https://cdn.mydomain.com" : "",
  env: {
    sitetitle: "School Project",
    component: "server",
    basepath: "/school",
    // frontend: "http://192.168.1.3:3000",
    // server: "http://192.168.1.3:3002/school",
    frontend: "http://localhost:3000",
    server: "http://localhost:3002/school",
  },
  basePath: "/school",
  nextConfig,
  experimental: {
    outputStandalone: true,
  },
};
