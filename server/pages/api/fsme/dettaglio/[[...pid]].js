const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
import { getLogger } from "../../../../logging/log-util";
const logger = getLogger("fsme-dettaglio");
import {
  navmenu,
  navmenustudenti,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";

import {
  getFunzioniForm,
  getPersona,
  getRuoloUtente,
} from "../../../../data/common";

import {
  getLezioni,
  getLezione,
  getPDF,
  getIscrizioneStudenteMulti,
} from "../../../../data/fs/common";

async function getHandler(userLogin, classeArgomento, idLezione) {
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);

  const db_lezioni_studente = await getLezioni(
    userLogin.token,
    userLogin.userID,
    classeArgomento
  );

  let arrayLezioni = [];
  if (db_lezioni_studente.length > 0) {
    arrayLezioni =
      db_lezioni_studente[0].lezioniStudenteMATERIA1[0]
        .lezioniStudenteCLASSE1[0].lezioniStudenteLezione1;
  }

  const db_lezione_contenuto = await getLezione(userLogin.token, idLezione);

  const docPdf = await getPDF(userLogin.token, db_lezione_contenuto[0].idPdf);
  // const docPdf = await getPDF(userLogin.token, 1558);

  const selezione = arrayLezioni.findIndex(
    (item) => item.idLezione == idLezione
  );

  let lezioneSelected = {};
  if (selezione != -1) {
    lezioneSelected = arrayLezioni[selezione];
  }

  const iscrizione = await getIscrizioneStudenteMulti(
    userLogin.token,
    userLogin.userID
  );

  let profilo = { idIscrizione: 0 };
  if (iscrizione.length > 0) {
    profilo = iscrizione[0];
  }

  const data = {
    title: "Configurazione dettaglio",
    navmenu: navmenustudenti,
    usermenu: usermenu,
    label_avanzamento: "Completato",
    lezioniStudente: db_lezioni_studente,
    lezioneContenuto: db_lezione_contenuto[0],
    docPdf: docPdf,
    lezioneSelected: lezioneSelected,
    index: selezione,
    profilo: profilo,
  };

  // data.lezioneContenuto.idVideo = 0;

  return data;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  logger.info(`API-CALL [DETTAGLIO LEZIONE]`);
  let pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  const db_ruolo = await getRuoloUtente(userLogin.token, userLogin.userID, 0);
  logger.trace(db_ruolo);

  const my_ruolo = db_ruolo.length > 0 ? db_ruolo[0].idRuolo : 0;

  let idPersona = 0;
  if (db_ruolo.length > 0) {
    idPersona = db_ruolo[0].idPersona;
  }

  const classeId = apic.getParentPid(req, 0);
  const lessonId = apic.getParentPid(req, 1);

  logger.debug(
    `API-DATA [DETTAGLIO LEZIONE] USER:[${userLogin.userID}] PERSONA-ID:[${idPersona}] RUOLO:[${my_ruolo}] CLASSE:[${classeId}] LEZIONE:[${lessonId}]`
  );

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, classeId, lessonId);
      res.status(200).json(dataGet);
      break;
  }
}
