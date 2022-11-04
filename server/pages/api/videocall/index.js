const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import {
  sidemenu,
  navmenu,
  usermenu,
  navmenustudenti,
} from "../../../data/data_sidemenu";

import { getFunzioniForm, getRuoloUtente } from "../../../data/common";
import { getAppuntamento } from "../../../data/videocall/common";

async function getHandler(userLogin, roomId) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Tutor_Studenti"
  );
  const db_ruolo = await getRuoloUtente(userLogin.token, userLogin.userID, 0);
  const appuntamento = await getAppuntamento(userLogin.token, roomId);
  const data = {
    title: "VideoCall",
    menu: sidemenu,
    navmenu: db_ruolo[0].idRuolo != 6 ? navmenu : navmenustudenti,
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
