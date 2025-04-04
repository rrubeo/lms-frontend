const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");
import { getLogger } from "../../../logging/log-util";
const logger = getLogger("tutorop");
import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../data/data_sidemenu";
import { cols_studenti } from "../../../data/tutorop/data_tutorop";

import { getFunzioniForm, getRuoloUtente } from "../../../data/common";
import { getStudTutor } from "../../../data/tutorop/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Tutor_Studenti"
  );
  const db_rows = await getStudTutor(userLogin.token, 0, userLogin.userID);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);

  const data = {
    title: "I miei studenti",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_rows,
    cols: cols_studenti,
    funzioni: db_funzioni,
  };
  return data;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  logger.info(`API-CALL [STUDENTI TUTOR]`);

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
    `API-DATA [STUDENTI TUTOR] USER:[${userLogin.userID}] PERSONA-ID:[${idPersona}] RUOLO:[${my_ruolo}]`
  );

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
