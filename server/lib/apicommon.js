import { getToken } from "../data/common";

function getPid(request) {
  let { pid } = request.query;
  console.log("getPid ########");
  console.log(pid);
  if (!pid) pid = 0;
  else pid = pid[0];
  console.log("getPid", pid);
  return pid;
}

function getParentPid(request, pos) {
  let { pid } = request.query;
  console.log("getParentPid ########");
  console.log(pid);
  if (!pid) pid = 0;
  else pid = pid[pos];
  console.log("getParentPid", pid);
  return pid;
}

async function getLogin(request) {
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

  console.log("getLogin", userLogin.userID);
  return userLogin;
}

module.exports = { getPid, getParentPid, getLogin };
