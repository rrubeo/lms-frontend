const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
const moment = require("moment");
import { getLogger } from "../../../../logging/log-util";
const logger = getLogger("monitor-lezzap");
import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import {
  getElencoAppuntamenti,
  getIscrizioneStudente,
  getAnagraficaDocenti,
  insertAppuntamento,
  deleteAppuntamento,
  getIscrizioneStudenteData,
  getIscrizioneStudenteAttiva,
} from "../../../../data/moni/common";

import { getFunzioniForm, getRuoloUtente } from "../../../../data/common";
import { cols_mon_lezz_app } from "../../../../data/moni/data_moni";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Moni_Ricerca"
  );
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const cb_docenti = await getAnagraficaDocenti(userLogin.token, 0, 0);
  const cb_studenti = await getIscrizioneStudenteAttiva(
    userLogin.token,
    0,
    0,
    0
  );
  const db_rows = await getElencoAppuntamenti(
    userLogin.token,
    userLogin.userID,
    "1900-01-01",
    "2100-12-31",
    "0",
    "0",
    "0",
    "0"
  );

  const data = {
    title: "Programmazione Lezioni",
    timeLez_label: "Orario Lezione",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_rows,
    cols: cols_mon_lezz_app,
    funzioni: db_funzioni,
    cb_docenti: cb_docenti,
    cb_studenti: cb_studenti,
  };
  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  logger.debug("[RICEVUTO APPUNTAMENTO]");
  logger.trace(postData);

  const cb_studenti = await getIscrizioneStudenteData(
    userLogin.token,
    postData.studente.id
  );
  logger.trace(cb_studenti);

  // logger.info(postData.orario);
  // const Orario = moment(postData.orario);
  // logger.info(Orario.format());
  const OrarioFine = moment(postData.orario).add(1, "hour");
  // logger.info(OrarioFine.format());

  const appu = {
    appuDataInizioAppuntamento: postData.orario,
    appuFkUtntRichiedente: postData.studente.id,
    appuFkUtntRichiesta: postData.docente.id,
    appuFkStapId: 2,
    appuFlagAttiva: 1,
    appuSysuser: userLogin.userID,
    appuDataRichiesta: new Date(),
    appuDataFineAppuntamento: OrarioFine.format(),
    appuTitolo: postData.titolo,
    appuFkIstuId: cb_studenti[0].idIscrizione,
    appuCommento: "",
    appuFkTappId: 1,
    appuLink: "",
  };

  logger.debug("[POST APPUNTAMENTO]");
  logger.trace(appu);
  p3 = await insertAppuntamento(userLogin.token, appu);
  logger.debug(p3);

  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    process.env.NODE_ENV === "production"
      ? (res.message = "OK")
      : (res.message = p3.errDesc);
  }
  return res;
}

async function deleteHandler(userLogin, deleteData) {
  logger.info("[ELIMINA APPUNTAMENTO]");
  logger.info(deleteData);
  let d1 = await deleteAppuntamento(userLogin.token, deleteData.key);
  const res = { status: 200, message: "Appuntamento eliminato" };
  return res;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  logger.info(`API-CALL [MONITOR-LEZZAP]`);
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
    `API-DATA [MONITOR-LEZZAP] USER:[${userLogin.userID}] PERSONA-ID:[${idPersona}] RUOLO:[${my_ruolo}]`
  );

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
    case "POST":
      const dataPost = await postHandler(userLogin, req.body, pid);
      res.status(dataPost.status).json(dataPost);
      break;
    case "DELETE":
      const dataDel = await deleteHandler(userLogin, req.body);
      res.status(dataDel.status).json(dataDel);
      break;
  }
}
