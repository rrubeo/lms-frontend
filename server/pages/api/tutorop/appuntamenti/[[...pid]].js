const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import { cols_appuntamenti } from "../../../../data/tutorop/data_tutorop";

import {
  getElencoAppuntamenti,
  getIscrizioneStudente,
} from "../../../../data/tutorop/common";
import { getFunzioniForm } from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Tutor_Appuntamenti"
  );
  const db_rows = await getElencoAppuntamenti(
    userLogin.token,
    userLogin.userID,
    "1900-01-01",
    "2100-12-31",
    pid,
    0,
    0,
    2
  );
  const db_iscrizione = await getIscrizioneStudente(userLogin.token, pid);
  const studente =
    db_iscrizione.length > 0
      ? `${db_iscrizione[0].cognome}, ${db_iscrizione[0].nome} - ${db_iscrizione[0].annoFrequenza} ${db_iscrizione[0].indirizzoIstituto}`
      : `Studente non presente`;

  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);

  const data = {
    title: "Appuntamenti: " + studente,
    back_label: "Torna indietro",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_rows,
    cols: cols_appuntamenti,
    funzioni: db_funzioni,
  };
  return data;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("APPUNTAMENTI STUDENTI TUTOR");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
