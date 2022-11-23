const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  getNotificaDaAppuntamento,
  letturaNotifica,
} from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_filtra = await getNotificaDaAppuntamento(
    userLogin.token,
    userLogin.userID
  );
  return db_filtra;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  console.log("************ LETTURA NOTIFICA");
  console.log(postData);

  let notifi = {
    notiId: postData.id,
  };

  console.log("************ POST NOTIFICA");
  console.log(notifi);
  p3 = await letturaNotifica(userLogin.token, notifi);

  console.log(p3);
  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    res.id = p3.istuId;
  }

  return res;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("NOTIFICHE");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
    case "POST":
      const dataPost = await postHandler(userLogin, req.body, pid);
      res.status(dataPost.status).json(dataPost);
      break;
  }
}
