const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { navmenustudenti, usermenu } from "../../../../data/data_sidemenu";
import { getFunzioniForm } from "../../../../data/common";

import {
  getIscrizioneStudenteMulti,
  getDocentiAula,
  getTutorAula,
  getDisponibilitaCrediti,
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

  const idIscrizione = iscrizione.length == 1 ? iscrizione[0].idIscrizione : 0;

  const crediti = await getDisponibilitaCrediti(
    userLogin.token,
    idIscrizione,
    1,
    1000000
  );

  const singleCrediti = crediti.length > 0 ? crediti[0] : {};

  const docenti = await getDocentiAula(
    userLogin.token,
    6,
    idIscrizione,
    userLogin.userID
  );
  const tutor = await getTutorAula(
    userLogin.token,
    4,
    idIscrizione,
    userLogin.userID
  );

  const data = {
    title: "Aula",
    back_label: "Torna indietro",
    label_docenti: "I miei insegnanti",
    label_tutor: "Il mio Tutor",
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

  console.log("AULA");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
