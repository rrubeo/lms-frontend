const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
import { getLogger } from "../../../../logging/log-util";
const logger = getLogger("fsme-richiesta");
import { navmenustudenti, usermenu } from "../../../../data/data_sidemenu";
import { getFunzioniForm, getRuoloUtente } from "../../../../data/common";

import {
  getIscrizioneStudenteMulti,
  getDisponibilitaCalendario,
  getStudenteDocente,
  insertAppuntamento,
  getDisponibilitaCalendarioTutor,
  getStudenteTutor,
} from "../../../../data/fs/common";

async function getHandler(userLogin, pid, userType, startDate) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Studente_Richiesta"
  );

  const iscrizione = await getIscrizioneStudenteMulti(
    userLogin.token,
    userLogin.userID
  );

  const idIscrizione = iscrizione.length > 0 ? iscrizione[0].idIscrizione : -1;

  let persona;
  let disponibilita;

  if (userType == "ctl_docenti") {
    persona = await getStudenteDocente(userLogin.token, idIscrizione, pid, 0);
    disponibilita = await getDisponibilitaCalendario(
      userLogin.token,
      pid,
      startDate,
      6,
      idIscrizione,
      0,
      0
    );
  } else {
    persona = await getStudenteTutor(userLogin.token, idIscrizione, pid, 0);
    disponibilita = await getDisponibilitaCalendarioTutor(
      userLogin.token,
      pid,
      startDate,
      6,
      idIscrizione,
      0,
      0
    );
  }

  const infoDocente =
    persona.length > 0 ? `${persona[0].nome} ${persona[0].cognome}` : "-";

  const data = {
    title:
      userType == "ctl_docenti"
        ? `Docente ${infoDocente}`
        : `Tutor ${infoDocente}`,
    back_label: "Torna indietro",
    label_avanzamento: "Avanzamento Corso",
    startDate: startDate,
    userType: userType,
    userNameFasce: pid,
    argomento_label: "Oggetto",
    navmenu: navmenustudenti,
    usermenu: usermenu,
    iscrizione: iscrizione,
    docente: persona,
    calendario: disponibilita,
    funzioni: db_funzioni,
  };
  return data;
}

async function postHandler(userLogin, postData, pid, userType) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  logger.debug("[RICEVUTO RICHIESTA APPUNTAMENTO]");
  logger.trace(postData);

  // console.log(userType);
  const appu = {
    appuDataInizioAppuntamento: postData.fascia.dataOraInizioAppuntamento,
    appuFkUtntRichiedente: postData.fascia.userNameStudente,
    appuFkUtntRichiesta: postData.fascia.usernameDocente,
    appuFkStapId: 1,
    appuFlagAttiva: 1,
    appuSysuser: userLogin.userID,
    appuDataRichiesta: new Date(),
    appuDataFineAppuntamento: postData.fascia.dataOraFineAppuntamento,
    appuTitolo: postData.oggetto,
    appuFkIstuId: postData.fascia.idIscrizioneStudente,
    appuCommento: "",
    appuFkTappId: userType == "ctl_docenti" ? 1 : 2,
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

export default async function handler(req, res) {
  await utils.cors(req, res);

  logger.info(`API-CALL [RICHIESTA APPUNTAMENTO]`);
  const pid = apic.getPid(req);
  const userName = apic.getParentPid(req, 0);
  const userType = apic.getParentPid(req, 1);
  const startDate = apic.getParentPid(req, 2);

  const userLogin = await apic.getLogin(req);

  const db_ruolo = await getRuoloUtente(userLogin.token, userLogin.userID, 0);
  logger.trace(db_ruolo);

  const my_ruolo = db_ruolo.length > 0 ? db_ruolo[0].idRuolo : 0;

  let idPersona = 0;
  if (db_ruolo.length > 0) {
    idPersona = db_ruolo[0].idPersona;
  }

  logger.debug(
    `API-DATA [RICHIESTA APPUNTAMENTO] USER:[${userLogin.userID}] PERSONA-ID:[${idPersona}] RUOLO:[${my_ruolo}] userName:[${userName}] userType:[${userType}]`
  );

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid, userType, startDate);
      res.status(200).json(dataGet);
      break;
    case "POST":
      const dataPost = await postHandler(userLogin, req.body, pid, userType);
      res.status(dataPost.status).json(dataPost);
      break;
  }
}
