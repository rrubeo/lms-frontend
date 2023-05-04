/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const isProd = process.env.NODE_ENV === "production";

const JAAS_ID_PROD = "vpaas-magic-cookie-44fbc9e9908645ffaed5aeaedf80632f";
const JAAS_ID_DEV = "vpaas-magic-cookie-44fbc9e9908645ffaed5aeaedf80632f";
const JAAS_PRIVATE_KEY_PROD =
  "-----BEGIN PRIVATE KEY-----MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCQ71/SaMh/UXVQ1+5OsTb3DXRSa1YABDt7TC2r9xUVL77W5SsT/i+gcuR2OqUbjaImro3ijpuhuSIAZ9Qs7sZGWTdwDmZFnSu2fX4/j9TVawr2geBIYbPSe2OxLWq5aEIYD3uxsArO4DWOst5Fk1DgBvR3+t5Xoty20m2OtISSkpONyA6YoMFAncNGD0vlp5xAP/x4vVv1ozuYnS8Fl6JsBlrzCob9ilVKLjLED/DIe2b3OEYn4iRHR1H4XzaFJvBI+5YfoIrPnLvbCUQQa1F3j6OrHcuBgv72nq8ppTAE5CdywicIugmON37CE22xrif9Lp6w0RLcQkAdIozRjievAgMBAAECggEBAIhIDZoT3TOarO1vnS1xhXWYuSAmvZ8WW7f8UZW5p6FcW95FbtRF1xLP9fMWAdp+u1IUIGZAIidXpZksCF6XxuivS2maoKAkwc2/As9Rt5dWJ+DTDsoA1M2+KGeZhRkB5+Qn6u+R0Rfly3Z6ynYxp4KAB7ApvJg7E7707v+Yzm/i6I7nqk2BDJxAM59bSSoVQKVYQEtFDwuv7Jk0oOxkQ28SjaCt4NclxItukkbK0JMBfW0K6FSVP6zqO4eZbC5mBpyDH3H/3qgutjvwLbkD5Qd9rHKSarLjiWzdjtcMulKE3GTe4tE9m1RH77CFaTdeF6Gja6AyM3PFbJ7SSo02usECgYEAz2b0YVGgQRXft4m+Zh+zfO+vxD4wbiC+9rZyaIyF4M4saFg22/WoE0mGuLueMRh6wjACJFOVCFFBYyi8YdzAl/I12/JOXZuovVFaANJIULH3DiHpbawu4+rXnIULgV16IKltKXb6GCoDbtwflxOH5wRRxa9AyRDIY+o9C0HEFnMCgYEAsuVSdXTRREHz6xoStwYzfOPrFzaByTzzdKtCftENCa/W1mA4l8R9z1dII2/HwrAG9M+vR8BN9KLuRL7/oxLfKZGFxNtnC2/q9hXfFEdE8V7b7sSIGAUxSrwe0/HjKA9n+HSa+3Ecx3nKscc5KCdXaSclCvmHsuN3mT+QJ+6iHtUCgYEApIpATMjuQ1RwNPLxe6Ggyvh40E6qK2SNO7uIzorVV4EZ1/pMI3sjyZFmcT5fhQGvuklOGbW5oWydXGaf9V+l56X/tqvoIflxCCj3J3msZ2CY6LxcrWaRmL3iKkme1BXt4uWnNeMvDGagbJ3z7e5PviY+HYAo/Jr079eQcFLPlyMCgYB9cLOrTKhYVm600emBkMWVszNraXsEIssLafMMfYXI3xWj6ICGWu9k7ezVfFH0P/4At4hOpZeEDKNKbStPq7Hzsei8qqPMr0NwHtH3pCnBniRVflV3klyH7PUo5JnFw1fCLfFmkl/9t3bbxbhcYYm3YA1nbqUqWLnKKXnppjjjqQKBgEBw+26nYKAxD9zbFVK10lyO013Jl+Ytf0WjW3U7Dnc6fmbg92cAukCKPMl2eUFQs2gIQTpunR/1i6zYM9SpANPCD/QX0G/GRy5K5aS8fSc4sD/C4nwCqceFOE5YWnZLZOVx9x8tEmRS0mOYYGN8nCCM5ImemNRnt6PsnR8Y2Uem-----END PRIVATE KEY-----";
const JAAS_PRIVATE_KEY_DEV =
  "-----BEGIN PRIVATE KEY-----MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCQ71/SaMh/UXVQ1+5OsTb3DXRSa1YABDt7TC2r9xUVL77W5SsT/i+gcuR2OqUbjaImro3ijpuhuSIAZ9Qs7sZGWTdwDmZFnSu2fX4/j9TVawr2geBIYbPSe2OxLWq5aEIYD3uxsArO4DWOst5Fk1DgBvR3+t5Xoty20m2OtISSkpONyA6YoMFAncNGD0vlp5xAP/x4vVv1ozuYnS8Fl6JsBlrzCob9ilVKLjLED/DIe2b3OEYn4iRHR1H4XzaFJvBI+5YfoIrPnLvbCUQQa1F3j6OrHcuBgv72nq8ppTAE5CdywicIugmON37CE22xrif9Lp6w0RLcQkAdIozRjievAgMBAAECggEBAIhIDZoT3TOarO1vnS1xhXWYuSAmvZ8WW7f8UZW5p6FcW95FbtRF1xLP9fMWAdp+u1IUIGZAIidXpZksCF6XxuivS2maoKAkwc2/As9Rt5dWJ+DTDsoA1M2+KGeZhRkB5+Qn6u+R0Rfly3Z6ynYxp4KAB7ApvJg7E7707v+Yzm/i6I7nqk2BDJxAM59bSSoVQKVYQEtFDwuv7Jk0oOxkQ28SjaCt4NclxItukkbK0JMBfW0K6FSVP6zqO4eZbC5mBpyDH3H/3qgutjvwLbkD5Qd9rHKSarLjiWzdjtcMulKE3GTe4tE9m1RH77CFaTdeF6Gja6AyM3PFbJ7SSo02usECgYEAz2b0YVGgQRXft4m+Zh+zfO+vxD4wbiC+9rZyaIyF4M4saFg22/WoE0mGuLueMRh6wjACJFOVCFFBYyi8YdzAl/I12/JOXZuovVFaANJIULH3DiHpbawu4+rXnIULgV16IKltKXb6GCoDbtwflxOH5wRRxa9AyRDIY+o9C0HEFnMCgYEAsuVSdXTRREHz6xoStwYzfOPrFzaByTzzdKtCftENCa/W1mA4l8R9z1dII2/HwrAG9M+vR8BN9KLuRL7/oxLfKZGFxNtnC2/q9hXfFEdE8V7b7sSIGAUxSrwe0/HjKA9n+HSa+3Ecx3nKscc5KCdXaSclCvmHsuN3mT+QJ+6iHtUCgYEApIpATMjuQ1RwNPLxe6Ggyvh40E6qK2SNO7uIzorVV4EZ1/pMI3sjyZFmcT5fhQGvuklOGbW5oWydXGaf9V+l56X/tqvoIflxCCj3J3msZ2CY6LxcrWaRmL3iKkme1BXt4uWnNeMvDGagbJ3z7e5PviY+HYAo/Jr079eQcFLPlyMCgYB9cLOrTKhYVm600emBkMWVszNraXsEIssLafMMfYXI3xWj6ICGWu9k7ezVfFH0P/4At4hOpZeEDKNKbStPq7Hzsei8qqPMr0NwHtH3pCnBniRVflV3klyH7PUo5JnFw1fCLfFmkl/9t3bbxbhcYYm3YA1nbqUqWLnKKXnppjjjqQKBgEBw+26nYKAxD9zbFVK10lyO013Jl+Ytf0WjW3U7Dnc6fmbg92cAukCKPMl2eUFQs2gIQTpunR/1i6zYM9SpANPCD/QX0G/GRy5K5aS8fSc4sD/C4nwCqceFOE5YWnZLZOVx9x8tEmRS0mOYYGN8nCCM5ImemNRnt6PsnR8Y2Uem-----END PRIVATE KEY-----";
const JAAS_APP_KEY_PROD =
  "vpaas-magic-cookie-44fbc9e9908645ffaed5aeaedf80632f/06e08a";
const JAAS_APP_KEY_DEV =
  "vpaas-magic-cookie-44fbc9e9908645ffaed5aeaedf80632f/06e08a";

const CLOUD_FILES_PROD = "https://lmsfiles.istitutojanus.it";
// const CLOUD_FILES_PROD = "https://lmsfilesdev.cloudandpartners.com";
const CLOUD_FILES_DEV = "https://lmsfilesdev.cloudandpartners.com";

const IMAGES_PROD = "lmsfiles.istitutojanus.it";
// const IMAGES_PROD = "lmsfilesdev.cloudandpartners.com";
const IMAGES_DEV = "lmsfilesdev.cloudandpartners.com";

const LMS_PROD = "https://lmswebapi.istitutojanus.it";
// const LMS_PROD = "https://lmswebapidev.cloudandpartners.com";
const LMS_DEV = "https://lmswebapidev.cloudandpartners.com";

const FRONT_PROD = "https://lmsweb.istitutojanus.it";
// const FRONT_PROD = "https://lmsweb.cloudandpartners.com";
const FRONT_DEV = "http://localhost:3000";

const SERVER_PROD = "https://lmsserver.istitutojanus.it/school/api";
// const SERVER_PROD = "https://lmswebapi.cloudandpartners.com/school/api";
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
    version: "1.10.2",
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
