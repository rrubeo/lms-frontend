/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const isProd = process.env.NODE_ENV === "production";

const JAAS_ID_PROD = "vpaas-magic-cookie-a8b4ddef72a34e29a94228185fb02e12";
const JAAS_ID_DEV = "vpaas-magic-cookie-a8b4ddef72a34e29a94228185fb02e12";
const JAAS_PRIVATE_KEY_PROD =
  "-----BEGIN PRIVATE KEY-----MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCTEVnF8Ijvh7dMZd/z1Uket9l6PfJyTy1uCcSbhecIiMvByieVGh9DEg0U9Q45IqE5pImWZ4y3vrOZaRf5Koa2YcFW7OJ6xcoUwP7036E2H1Oh8gpqwy+/7nCoAHrY7wE+VcHs3uAgclqy+mbgIY8MjRm3sqZJGFCkFs1w0f325lwEPqhmu1i+MPP4u958WJnhnSir+7RRomfCovLEXyMEoASR8sVesLPjq44Gta0bMEsms7PJ8UN86BQ7pYZLb4LR2qm9n1wZ1vmjUsGlautMkxOC55N4lc7Mn2ibrRM22g3UD3ahiNJGcMJ83CcIknlmiCV/ktjSFN2BMeupNr8RAgMBAAECggEAFvoL+4fT7RBYC+CSt6an8NuqZ5XMDh3erCVsiRvHd6bfppwtyPa20aS9VHvgx/5oD/hr4oq1CnQJ3Tr1GuGRAGePbERAMgw6wTlR2/IgXrNQPqnxBLMP/72B7k184+2bVSDS1m4PuCIFl5bVgcjcb4qP7QpFPoBFAQ3q9Ohp9CvVprXnfgHGh1v6/BxooLUGodrOulmSuwnJmqe5mEwXcYmJ9ETbCSM/3ur0hCg4ryRnWUXuMTYEoROVcPiCnzFoDGuKKVf9qhKMGR5b6YVrDZcAIzwsci/S84T+xCq7Jk/hniDyrsYKZUZ4MMWuVeztQwKjSFYwJTS8vILfoBTQAQKBgQDpJ3R4EbP1RUIpXh/uB18gT1rU1Hcrvv+fKIXaViNQF9OjdwkJ1KHWUbxqIfoqut6zRhqwtC88goOJjS9rdlhZsHVstcFxhOffKImAmzXmxM2lMw4WUFt3c8FYxU+LEziniRcfjEUZejA9VUp9pUUxvWIE9Gd8KALLTR32JgYsEQKBgQChendgKf4zA6iZ2M4s/CV4f8vZ83aBToqQr3uF/aFqUvVyL8USRd6JG41LeDQTNM/xfoGSuHGMY4XOmWkWtuMGSAjW/6mJOH6jYFjeCH+pHwjeir9ei45Lwy3czabuWRwjaTvgYOD7pYBqK79jcN8jtXPgnO8xrN+xUBDBW8ZjAQKBgQDjuL+PDmtgIdcvJFm3WMfWfOtQeHw05AYzY5bo27z922fAfuD7Ew1GkOqgFrOKzJ37J3umHzcLuMXUsWshYKOGZk0qcpOP1qnKUoOKcw5AaPQaaDVYIgBUOWEc3QqF4a4yJDnLfGt5KNi47vckpSliHYEBKd1xbHreKmIbKqRYoQKBgAI8vCKs8kSqrE9VXaXp6Gr++kgOw3mPKQRQKhn1JaNfet8WIljadvbXVuHQzIfnl2n1Ir5xp8EWL+ho37fc2NBhdx3jdOndyoNg9lo9K+ef8nOC4Jviuxn5nk0M3F85BNbIwnedYACcjmbqLECoc67++JgIFJhPmNnQDitfpiQBAoGBANheyjSIA7UL/847jMwiqcn+wqEKh8V35YJzAIJH2+mN9dRMCCBYC0iHGh8/4YSQ2oQjifVMW6Ely8FVA/4fMzsSL/CTIoonUlW3GIRaKPl5ZfuhmcFfJckb7V5IcDdrqSvy6Ww56XdgEeR1jGFn9pkFB4nBQOlLW+B5fFxPexyJ-----END PRIVATE KEY-----";
const JAAS_PRIVATE_KEY_DEV =
  "-----BEGIN PRIVATE KEY-----MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCTEVnF8Ijvh7dMZd/z1Uket9l6PfJyTy1uCcSbhecIiMvByieVGh9DEg0U9Q45IqE5pImWZ4y3vrOZaRf5Koa2YcFW7OJ6xcoUwP7036E2H1Oh8gpqwy+/7nCoAHrY7wE+VcHs3uAgclqy+mbgIY8MjRm3sqZJGFCkFs1w0f325lwEPqhmu1i+MPP4u958WJnhnSir+7RRomfCovLEXyMEoASR8sVesLPjq44Gta0bMEsms7PJ8UN86BQ7pYZLb4LR2qm9n1wZ1vmjUsGlautMkxOC55N4lc7Mn2ibrRM22g3UD3ahiNJGcMJ83CcIknlmiCV/ktjSFN2BMeupNr8RAgMBAAECggEAFvoL+4fT7RBYC+CSt6an8NuqZ5XMDh3erCVsiRvHd6bfppwtyPa20aS9VHvgx/5oD/hr4oq1CnQJ3Tr1GuGRAGePbERAMgw6wTlR2/IgXrNQPqnxBLMP/72B7k184+2bVSDS1m4PuCIFl5bVgcjcb4qP7QpFPoBFAQ3q9Ohp9CvVprXnfgHGh1v6/BxooLUGodrOulmSuwnJmqe5mEwXcYmJ9ETbCSM/3ur0hCg4ryRnWUXuMTYEoROVcPiCnzFoDGuKKVf9qhKMGR5b6YVrDZcAIzwsci/S84T+xCq7Jk/hniDyrsYKZUZ4MMWuVeztQwKjSFYwJTS8vILfoBTQAQKBgQDpJ3R4EbP1RUIpXh/uB18gT1rU1Hcrvv+fKIXaViNQF9OjdwkJ1KHWUbxqIfoqut6zRhqwtC88goOJjS9rdlhZsHVstcFxhOffKImAmzXmxM2lMw4WUFt3c8FYxU+LEziniRcfjEUZejA9VUp9pUUxvWIE9Gd8KALLTR32JgYsEQKBgQChendgKf4zA6iZ2M4s/CV4f8vZ83aBToqQr3uF/aFqUvVyL8USRd6JG41LeDQTNM/xfoGSuHGMY4XOmWkWtuMGSAjW/6mJOH6jYFjeCH+pHwjeir9ei45Lwy3czabuWRwjaTvgYOD7pYBqK79jcN8jtXPgnO8xrN+xUBDBW8ZjAQKBgQDjuL+PDmtgIdcvJFm3WMfWfOtQeHw05AYzY5bo27z922fAfuD7Ew1GkOqgFrOKzJ37J3umHzcLuMXUsWshYKOGZk0qcpOP1qnKUoOKcw5AaPQaaDVYIgBUOWEc3QqF4a4yJDnLfGt5KNi47vckpSliHYEBKd1xbHreKmIbKqRYoQKBgAI8vCKs8kSqrE9VXaXp6Gr++kgOw3mPKQRQKhn1JaNfet8WIljadvbXVuHQzIfnl2n1Ir5xp8EWL+ho37fc2NBhdx3jdOndyoNg9lo9K+ef8nOC4Jviuxn5nk0M3F85BNbIwnedYACcjmbqLECoc67++JgIFJhPmNnQDitfpiQBAoGBANheyjSIA7UL/847jMwiqcn+wqEKh8V35YJzAIJH2+mN9dRMCCBYC0iHGh8/4YSQ2oQjifVMW6Ely8FVA/4fMzsSL/CTIoonUlW3GIRaKPl5ZfuhmcFfJckb7V5IcDdrqSvy6Ww56XdgEeR1jGFn9pkFB4nBQOlLW+B5fFxPexyJ-----END PRIVATE KEY-----";
const JAAS_APP_KEY_PROD =
  "vpaas-magic-cookie-a8b4ddef72a34e29a94228185fb02e12/c240b9";
const JAAS_APP_KEY_DEV =
  "vpaas-magic-cookie-a8b4ddef72a34e29a94228185fb02e12/c240b9";

// const CLOUD_FILES_PROD = "https://lmsfiles.istitutojanus.it";
const CLOUD_FILES_PROD = "https://lmsfilesdev.cloudandpartners.com";
const CLOUD_FILES_DEV = "https://lmsfilesdev.cloudandpartners.com";

// const IMAGES_PROD = "lmsfiles.istitutojanus.it";
const IMAGES_PROD = "lmsfilesdev.cloudandpartners.com";
const IMAGES_DEV = "lmsfilesdev.cloudandpartners.com";

// const LMS_PROD = "https://lmswebapi.istitutojanus.it";
const LMS_PROD = "https://lmswebapidev.cloudandpartners.com";
const LMS_DEV = "https://lmswebapidev.cloudandpartners.com";

// const FRONT_PROD = "https://lmsweb.istitutojanus.it";
const FRONT_PROD = "https://lmsweb.cloudandpartners.com";
const FRONT_DEV = "http://localhost:3000";

// const SERVER_PROD = "https://lmsserver.istitutojanus.it/school/api";
const SERVER_PROD = "https://lmswebapi.cloudandpartners.com/school/api";
const SERVER_DEV = "http://localhost:3002/school/api";

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
  "@fullcalendar/list",
  "@jitsi/react-sdk",
]);

module.exports = withTM({
  optimizeFonts: false,
  images: {
    domains: [isProd ? IMAGES_PROD : IMAGES_DEV],
  },
  env: {
    sitetitle: "JANUS - Istituto Superiore per la Formazione",
    component: "frontend",
    basepath: "/school",
    API_SERVER: isProd ? LMS_PROD : LMS_DEV,
    frontend: isProd ? FRONT_PROD : FRONT_DEV,
    server: isProd ? SERVER_PROD : SERVER_DEV,
    cloudfiles: isProd ? CLOUD_FILES_PROD : CLOUD_FILES_DEV,
    SECRET_COOKIE_PASSWORD: "t0Kb5wKyD1yaybCwhipeG4r7YmzGNa6c",
    MUI_LICENCE:
      "d1fbab155841cc4db5a63f2e70fee1bdTz01MjYyOSxFPTE2OTc2NDI4MTExNjAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=",
    version: "1.9.4",
    JAAS_ID: isProd ? JAAS_ID_PROD : JAAS_ID_DEV,
    JAAS_PRIVATE_KEY: isProd ? JAAS_PRIVATE_KEY_PROD : JAAS_PRIVATE_KEY_DEV,
    JAAS_APP_KEY: isProd ? JAAS_APP_KEY_PROD : JAAS_APP_KEY_DEV,
    TALK_JS_APP_ID: "teDO45y6",
    CHAT_TIMEOUT: 5000,
  },
  basePath: "",
  nextConfig,
  experimental: {
    outputStandalone: true,
  },
});
