/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

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
  env: {
    sitetitle: "School Project",
    component: "frontend",
    basepath: "/school",
    // server: "http://192.168.1.3:3002/school/api",
    server: "http://localhost:3002/school/api",
  },
  basePath: "",
  nextConfig,
  experimental: {
    outputStandalone: true,
  },
});
