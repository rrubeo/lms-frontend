/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
};

const isProd = process.env.NODE_ENV === "production";

// const LMS_PROD = "http://lmsapi.bitreloaded.com";
const LMS_PROD = "http://lmswebapidev.cloudandpartners.com";
const LMS_DEV = "http://lmswebapidev.cloudandpartners.com";

// const FRONT_PROD = "http://lms.istitutojanus.it:3000";
const FRONT_PROD = "http://lmsweb.cloudandpartners.com:3000";
const FRONT_DEV = "http://localhost:3000";

// const SERVER_PROD = "http://lms.istitutojanus.it:3002/school/api";
const SERVER_PROD = "http://lmsweb.cloudandpartners.com:3002/school/api";
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
