const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
import { getLogger } from "../../../../logging/log-util";
const logger = getLogger("fsme-aula");
import { navmenustudenti, usermenu } from "../../../../data/data_sidemenu";
import { getFunzioniForm, getRuoloUtente } from "../../../../data/common";

import {
  getIscrizioneStudenteMulti,
  getDocentiAula,
  getTutorAula,
  getDisponibilitaCrediti,
  getSideUserMenu,
} from "../../../../data/fs/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Studente_Aula"
  );

  const iscrizione = await getIscrizioneStudenteMulti(
    userLogin.token,
    userLogin.userID
  );

  const idIscrizione = iscrizione.length > 0 ? iscrizione[0].idIscrizione : -1;

  const crediti = await getDisponibilitaCrediti(
    userLogin.token,
    idIscrizione,
    1,
    1000000
  );

  const singleCrediti = crediti.length > 0 ? crediti[0] : {};

  const docenti = await getDocentiAula(userLogin.token, idIscrizione, 0, 0);
  const tutor = await getTutorAula(userLogin.token, idIscrizione, 0, 0);

  const data = {
    title: "Aula",
    back_label: "Torna indietro",
    label_docenti: "I miei insegnanti",
    label_tutor: "Il mio Tutor",
    label_avanzamento: "Avanzamento Corso",
    navmenu: navmenustudenti,
    usermenu: usermenu,
    iscrizione: iscrizione,
    docenti: docenti,
    tutor: tutor,
    crediti: singleCrediti,
    funzioni: db_funzioni,
  };
  return data;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  logger.info(`API-CALL [AULA]`);
  let pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  const db_ruolo = await getRuoloUtente(userLogin.token, userLogin.userID, 0);
  logger.trace(db_ruolo);

  const my_ruolo = db_ruolo.length > 0 ? db_ruolo[0].idRuolo : 0;

  if (pid == 0) {
    if (db_ruolo.length > 0) {
      pid = db_ruolo[0].idPersona;
    }
  }

  logger.debug(
    `API-DATA [AULA] USER:[${userLogin.userID}] PERSONA-ID:[${pid}] RUOLO:[${my_ruolo}]`
  );

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
