const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { cols } from "../../../../data/doce/data_docenti";

import { getAnagraficaDocenti } from "../../../../data/doce/common";
import {
  getFunzioniForm,
  getToponimo,
  insertPersona,
  getPersona,
} from "../../../../data/common";

const db_orario = [
  {
    GISE_ID: 1,
    1: 1,
    2: 0,
    3: 0,
    4: 1,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 1,
    10: 0,
    11: 0,
    12: 0,
  },
  {
    GISE_ID: 2,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  },
  {
    GISE_ID: 3,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  },
  {
    GISE_ID: 4,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  },
  {
    GISE_ID: 5,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  },
  {
    GISE_ID: 6,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  },
  {
    GISE_ID: 7,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  },
];

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_persona = await getPersona(userLogin.token, pid);

  const data = {
    title: `Piano Orario ${db_persona.persNome} ${db_persona.persCognome}`,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    back_label: "Torna indietro",
    rows: db_orario,
    cols: cols,
    docente: db_persona,
    funzioni: db_funzioni,
  };
  return data;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("GESTIONE DOCENTI");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
