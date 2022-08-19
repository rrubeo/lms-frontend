const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import {
  sidemenu,
  navmenu,
  navmenustudenti,
  usermenu,
} from "../../../data/data_sidemenu";

import { getRuoloUtente } from "../../../data/common";

async function getHandler(userLogin, pid) {
  const db_ruolo = await getRuoloUtente(userLogin.token, userLogin.userID, 0);

  const data = {
    title: process.env.sitetitle,
    menu: sidemenu,
    navmenu: db_ruolo[0].idRuolo == 6 ? navmenustudenti : navmenu,
    usermenu: usermenu,
  };
  return data;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("MENU");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
    case "POST":
      //   const dataPost = await postHandler(userLogin, req.body, res, pid);
      //   res.status(dataPost.status).json(dataPost);
      break;
    case "DELETE":
      //   const dataDel = await deleteHandler(userLogin, req.body);
      //   res.status(dataDel.status).json(dataDel);
      break;
  }
}
