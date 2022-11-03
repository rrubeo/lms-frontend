const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { cols_lezioni } from "../../../../data/tutorop/data_tutorop";

import {
  getElencoAppuntamentiLezione,
  getIscrizioneStudente,
} from "../../../../data/tutorop/common";
import { getFunzioniForm } from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Tutor_Lezioni"
  );
  const db_rows = await getElencoAppuntamentiLezione(
    userLogin.token,
    0,
    "1900-01-01",
    "2100-12-31",
    pid,
    0,
    0,
    1
  );
  const db_iscrizione = await getIscrizioneStudente(userLogin.token, pid);
  const studente =
    db_iscrizione.length > 0
      ? `${db_iscrizione[0].cognome}, ${db_iscrizione[0].nome} - ${db_iscrizione[0].annoFrequenza} ${db_iscrizione[0].indirizzoIstituto}`
      : `Studente non presente`;

  const data = {
    title: "Lezioni: " + studente,
    back_label: "Torna indietro",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_rows,
    cols: cols_lezioni,
    funzioni: db_funzioni,
  };
  return data;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("LEZIONI STUDENTI TUTOR");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
