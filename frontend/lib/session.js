import { fetchJson, fetchWithUser, getPageName, getPageIds } from "./utils";
import { getLogger } from "../logging/log-util";

const logger = getLogger("session");

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
  isStudent: 0,
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
  // console.log(credential);
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

const getFallback = async (req, res, query) => {
  let fallback = {
    authenticated: false,
    userInfo: defaultLogin,
  };
  // console.dir("V0");
  const authSession = await getAuthSession(req);
  // console.dir(authSession);

  if (!authSession) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        fallback: fallback,
      },
    };
  }
  // console.dir("V1");
  if (authSession.isStudent == 1) {
    res.setHeader("location", `${process.env.frontend}/401`);
    res.statusCode = 302;
    res.end();
    return {
      props: {
        fallback: fallback,
      },
    };
  }
  // console.dir("V2");
  fallback.pageName = getPageName(query);
  fallback.authenticated = true;
  fallback.userInfo = authSession;
  fallback.subIndex = getPageIds(query);
  fallback.pageQuery = query;
  // console.dir(fallback);

  logger.trace(`pageName: [${fallback.pageName}]`);
  logger.info(`pageQuery: ${JSON.stringify(fallback.pageQuery)}`);
  logger.trace(`subIndex: ${JSON.stringify(fallback.subIndex)}`);

  return fallback;
};

module.exports = {
  getAuthSession,
  getRoles,
  getToken,
  validateToken,
  sessionOptions,
  defaultLogin,
  getFallback,
};
