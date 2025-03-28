/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
};

const isProd = process.env.NODE_ENV === "production";

const CLOUD_FILES_PROD = "https://lmsfiles.istitutojanus.it";
// const CLOUD_FILES_PROD = "https://lmsfilesdev.cloudandpartners.com";
const CLOUD_FILES_DEV = "https://lmsfilesdev.cloudandpartners.com";

//const LMS_PROD = "https://lmswebapi.istitutojanus.it";
const LMS_PROD = "https://belezioni.istitutojanus.it";
const LMS_DEV = "https://belezioni.istitutojanus.it";

//const FRONT_PROD = "https://lmsweb.istitutojanus.it";
const FRONT_PROD = "https://lezioni.istitutojanus.it";
const FRONT_DEV = "http://localhost:3000";

//const SERVER_PROD = "https://lmsserver.istitutojanus.it/school/api";
const SERVER_PROD = "https://slezioni.istitutojanus.it/school/api";
const SERVER_DEV = "http://localhost:3002/school/api";

module.exports = {
  // assetPrefix: isProd ? "https://cdn.mydomain.com" : "",
  env: {
    sitetitle: "School Project",
    component: "server",
    basepath: "/school",   
    API_SERVER: isProd ? LMS_PROD : LMS_DEV,
    cloudfiles: isProd ? CLOUD_FILES_PROD : CLOUD_FILES_DEV,
    frontend: isProd ? FRONT_PROD : FRONT_DEV,
    server: isProd ? SERVER_PROD : SERVER_DEV,
  },
  basePath: "/school",
  nextConfig,
  experimental: {
    outputStandalone: true,
  },
};
