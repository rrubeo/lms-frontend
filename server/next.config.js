/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
};

const isProd = process.env.NODE_ENV === "production";

// const LMS_PROD = "https://lmswebapi.istitutojanus.it";
const LMS_PROD = "https://lmswebapidev.cloudandpartners.com";
const LMS_DEV = "https://lmswebapidev.cloudandpartners.com";

// const FRONT_PROD = "https://lmsweb.istitutojanus.it";
const FRONT_PROD = "https://lmsweb.cloudandpartners.com";
const FRONT_DEV = "http://localhost:3000";

// const SERVER_PROD = "https://lmsserver.istitutojanus.it/school/api";
const SERVER_PROD = "https://lmswebapi.cloudandpartners.com/school/api";
const SERVER_DEV = "http://localhost:3002/school/api";

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
