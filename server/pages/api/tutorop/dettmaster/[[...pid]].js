const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
import { getLogger } from "../../../../logging/log-util";
const logger = getLogger("tutorop-dettmaster");
import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import {
  cols_dettaglio,
  cols_dettaglio_mat,
} from "../../../../data/tutorop/data_tutorop";

import {
  getStudenteTutorDettaglio,
  getStudenteAvanzamentoMateria,
  getIscrizioneStudente,
} from "../../../../data/tutorop/common";
import { getFunzioniForm, getRuoloUtente } from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Tutor_Dettaglio_Master"
  );

  logger.debug(`GET [TUTOROP-DETTAGLIO MATERIE] IdIscrizione:[${pid}]`);

  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  // const db_rows = await getStudenteTutorDettaglio(userLogin.token, pid);

  const db_rows = await getStudenteAvanzamentoMateria(userLogin.token, pid);

  // logger.trace(db_rows1);

  const db_iscrizione = await getIscrizioneStudente(userLogin.token, pid);

  const studente =
    db_iscrizione.length > 0
      ? `${db_iscrizione[0].cognome}, ${db_iscrizione[0].nome} - ${db_iscrizione[0].annoFrequenza} ${db_iscrizione[0].indirizzoIstituto}`
      : `Studente non presente`;

  const data = {
    title: "Dettaglio Lezioni: " + studente,
    back_label: "Torna indietro",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_rows,
    cols: cols_dettaglio_mat,
    funzioni: db_funzioni,
  };
  return data;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  logger.info(`API-CALL [TUTOROP-DETTAGLIO MATERIE]`);
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
    `API-DATA [TUTOROP-DETTAGLIO MATERIE] USER:[${userLogin.userID}] PERSONA-ID:[${idPersona}] RUOLO:[${my_ruolo}]`
  );

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
