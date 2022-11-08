const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import { cols_dettaglio } from "../../../../data/tutorop/data_tutorop";

import {
  getStudenteTutorDettaglio,
  getIscrizioneStudente,
} from "../../../../data/tutorop/common";
import { getFunzioniForm } from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Tutor_Dettaglio"
  );
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const db_rows = await getStudenteTutorDettaglio(userLogin.token, pid);
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
    cols: cols_dettaglio,
    funzioni: db_funzioni,
  };
  return data;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("DETTAGLIO LEZIONI TUTOR");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
