import { fetchJson } from "./utils";

async function getAuthSession(req) {
  return req.session.user;
}

const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "jscred",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

const CLOUD_BASE_URL = "http://lmswebapidev.cloudandpartners.com";
const CLOUD_API_TOKEN = "api/User/authenticate";
const CLOUD_API_VALID_TOKEN = "api/User/ValidateToken";

const UserValidate = `${CLOUD_BASE_URL}/${CLOUD_API_VALID_TOKEN}`;
const UserAuthenticate = `${CLOUD_BASE_URL}/${CLOUD_API_TOKEN}`;

const defaultLogin = { isLoggedIn: false, login: "", token: "" };

const getToken = async (user, password) => {
  const credential = {
    utntUserName: user,
    utntPasswordHash: password,
  };

  const data = await fetchJson(UserAuthenticate, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credential),
  });
  // console.log(data);
  return data;
};

const validateToken = async (user, token) => {
  // console.log("validateToken");

  const credential = {
    userID: user,
    token: token,
  };
  // console.log(credential);

  const data = await fetch(UserValidate, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credential),
  });

  // const data = await fetchJson(UserValidate, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(credential),
  // });
  // console.log(data);
  return data;
};

module.exports = {
  getAuthSession,
  getToken,
  validateToken,
  sessionOptions,
  defaultLogin,
};
