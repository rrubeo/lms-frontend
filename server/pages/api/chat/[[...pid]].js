const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");
import { getLogger } from "../../../logging/log-util";
const logger = getLogger("chat");

import {
  navmenu,
  navmenustudenti,
  usermenu,
  getSideUserMenu,
} from "../../../data/data_sidemenu";

import {
  getFunzioniForm,
  getRuoloUtente,
  getAppuntamentiConfermati,
  getRubricaTalk,
  getRubricaJanus,
  getPersoneChat,
} from "../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Network"
  );
  const db_ruolo = await getRuoloUtente(userLogin.token, userLogin.userID, 0);
  const db_persone = await getPersoneChat(userLogin.token, pid);

  // const contatti_ruolo = db_ruolo[0].idRuolo != 6 ? 0 : 5;
  // const db_contatti2 = await getRubricaTalk(userLogin.token, 0, contatti_ruolo);

  const db_contatti = await getRubricaJanus(
    userLogin.token,
    0,
    userLogin.userID
  );

  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const data = {
    title: "CHAT",
    lb_rubrica: "CONTATTI",
    lb_conversa: "CONVERSAZIONI",
    menu: db_menu,
    navmenu: db_ruolo[0].idRuolo != 6 ? navmenu : navmenustudenti,
    usermenu: usermenu,
    funzioni: db_funzioni,
    contatti: db_contatti,
    personeChat: db_persone,
  };

  return data;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  logger.info(`API-CALL [CHAT]`);
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  const db_ruolo = await getRuoloUtente(userLogin.token, userLogin.userID, 0);
  logger.trace(db_ruolo);

  const my_ruolo = db_ruolo.length > 0 ? db_ruolo[0].idRuolo : 0;

  let idPersona = 0;
  if (db_ruolo.length > 0) {
    idPersona = db_ruolo[0].idPersona;
  }

  logger.debug(
    `API-DATA [CHAT] USER:[${userLogin.userID}] PERSONA-ID:[${idPersona}] RUOLO:[${my_ruolo}]`
  );

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, idPersona);
      res.status(200).json(dataGet);
      break;
  }
}
