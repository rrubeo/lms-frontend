const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../data/data_sidemenu";

import { getFunzioniForm } from "../../../data/common";
import { getAppuntamento } from "../../../data/videocall/common";



async function getHandler(userLogin, roomId) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID
  );
  const appuntamento = await getAppuntamento(userLogin.token,roomId);
  const data = {
    title: "VideoCall",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    appuntamento: appuntamento,
    funzioni: db_funzioni,
  };
  return data;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("GESTIONE VIDEOCALL");
  console.log(req.query);
  // const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  
  
  const roomId = req.query.roomId;
  
  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, roomId);
      res.status(200).json(dataGet);
      break;
  }
}
