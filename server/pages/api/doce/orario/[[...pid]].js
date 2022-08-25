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

const db_orario = {
  giorniSettimana: [
    {
      fasceOrarie: [
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
      ],
    },
    {
      fasceOrarie: [
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
      ],
    },
    {
      fasceOrarie: [
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
        { fascia: 0 },
      ],
    },
  ],
};

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_docente = await getPersona(userLogin.token, pid);

  const data = {
    title: "Piano Orario",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_orario,
    cols: cols,
    docente: db_docente,
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
