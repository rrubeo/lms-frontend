/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const isProd = process.env.NODE_ENV === "production";

const LMS_PROD = "http://lmsapi.bitreloaded.com";
const LMS_DEV = "http://lmsapi.bitreloaded.com";

const FRONT_PROD = "http://lms.istitutojanus.it:3000";
const FRONT_DEV = "http://lms.istitutojanus.it:3000";

const SERVER_PROD = "http://lms.istitutojanus.it:3002/school/api";
const SERVER_DEV = "http://lms.istitutojanus.it:3002/school/api";

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
  "@fullcalendar/list",
]);

module.exports = withTM({
  optimizeFonts: false,
  images: {
    domains: ["lmsfiles.bitreloaded.com"],
  },
  env: {
    sitetitle: "School Project",
    component: "frontend",
    basepath: "/school",
    API_SERVER: isProd ? LMS_PROD : LMS_DEV,
    frontend: isProd ? FRONT_PROD : FRONT_DEV,
    server: isProd ? SERVER_PROD : SERVER_DEV,
    SECRET_COOKIE_PASSWORD: "t0Kb5wKyD1yaybCwhipeG4r7YmzGNa6c",
    version: "1.2.0",
  },
  basePath: "",
  nextConfig,
  experimental: {
    outputStandalone: true,
  },
});
