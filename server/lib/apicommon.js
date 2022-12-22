import { getToken } from "../data/common";
import { getLogger } from "../logging/log-util";

const logger = getLogger("apicommon");

function getPid(request) {
  let { pid } = request.query;
  // logger.debug(request.query);
  logger.debug(pid ? `pid:[${pid}]` : "pid:[NON PRESENTE]");

  if (!pid) pid = 0;
  else pid = pid[0];

  // logger.debug(`OUT pid: [${pid}]`);
  return pid;
}

function getParentPid(request, pos) {
  let { pid } = request.query;
  // console.log("getParentPid ########");
  // console.log(pid);
  if (!pid) pid = 0;
  else pid = pid[pos];

  logger.debug(`getParentPid: [${pid}]`);
  return pid;
}

async function getLogin(request) {
  logger.debug("[getLogin]");
  let userLogin = {
    userID: "",
    token: "",
  };

  if (request.headers.token) {
    userLogin.userID = request.headers.userid;
    userLogin.token = request.headers.token;
  } else {
    userLogin = await getToken("Romolo", "pass2");
  }

  // console.log("getLogin", userLogin.userID);
  return userLogin;
}

module.exports = { getPid, getParentPid, getLogin };
