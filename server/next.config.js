/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
};

const isProd = process.env.NODE_ENV === "production";

const LMS_PROD = "http://lmswebapi.cloudandpartners.com";
const LMS_DEV = "http://lmswebapidev.cloudandpartners.com";

const FRONT_PROD = "http://192.168.1.3:3000";
const FRONT_DEV = "http://localhost:3000";

const SERVER_PROD = "http://192.168.1.3:3002/school";
const SERVER_DEV = "http://localhost:3002/school";

module.exports = {
  // assetPrefix: isProd ? "https://cdn.mydomain.com" : "",
  env: {
    sitetitle: "School Project",
    component: "server",
    basepath: "/school",   
    API_SERVER: isProd ? LMS_PROD : LMS_DEV,
    frontend: isProd ? FRONT_PROD : FRONT_DEV,
    server: isProd ? SERVER_PROD : SERVER_DEV,
  },
  basePath: "/school",
  nextConfig,
  experimental: {
    outputStandalone: true,
  },
};
