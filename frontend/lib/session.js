import { fetchJson, fetchWithUser } from "./utils";

async function getAuthSession(req) {
  return req.session.user;
}
//secure: process.env.NODE_ENV === "production",
const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "jscred",
  cookieOptions: {
    sameSite: "lax",
    maxAge: undefined,
    secure: false,
  },
};

const CLOUD_BASE_URL = process.env.API_SERVER;
const CLOUD_API_TOKEN = "api/User/authenticate";
const CLOUD_API_VALID_TOKEN = "api/User/ValidateToken";
const CLOUD_API_ROLES = "api/Tables/GetRuoloUtente";

const UserValidate = `${CLOUD_BASE_URL}/${CLOUD_API_VALID_TOKEN}`;
const UserAuthenticate = `${CLOUD_BASE_URL}/${CLOUD_API_TOKEN}`;
const UserRole = `${CLOUD_BASE_URL}/${CLOUD_API_ROLES}`;

const defaultLogin = {
  isLoggedIn: false,
  login: "",
  token: "",
  role: "",
  idRole: 0,
  isStudent: false,
};

const getRoles = async (userInfo) => {
  const roles = await fetchWithUser(
    `${UserRole}/${userInfo.login}/0`,
    userInfo
  );
  return roles;
};

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
  getRoles,
  getToken,
  validateToken,
  sessionOptions,
  defaultLogin,
};
