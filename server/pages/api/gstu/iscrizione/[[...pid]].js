const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import {
  cols_servizi,
  cols_pagamenti,
  cols_tutor,
  cols_docenti,
  cols_piano,
} from "../../../../data/gstu/data_studenti";

import { getFunzioniForm } from "../../../../data/common";

import { getIdIscrizione } from "../../../../data/gstu/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_iscrizione = await getIdIscrizione(userLogin.token, pid);
  let title = "Iscrizione";
  // console.log(db_iscrizione);
  if (db_iscrizione.length > 0) {
    title =
      "Iscrizione " +
      db_iscrizione[0].annoFrequenza +
      " - " +
      db_iscrizione[0].nome +
      " " +
      db_iscrizione[0].cognome;
  }
  const data = {
    title: title,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    back_label: "Torna indietro",
    tab4_label: "Piano Studi Personalizzato",
    tab5_label: "Servizi Sottoscritti",
    tab7_label: "Pagamenti",
    tab8_label: "Tutor",
    tab9_label: "Docenti",
    iscrizione: db_iscrizione,
    funzioni: db_funzioni,
    cols_pagamenti: cols_pagamenti,
    cols_servizi: cols_servizi,
    cols_tutor: cols_tutor,
    cols_docenti: cols_docenti,
    cols_piano: cols_piano,
  };
  return data;
}

async function postHandler(userLogin, postData, pid) {
  console.log(postData);
  let res = { status: 200, message: "OK" };
  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("ISCRIZIONI STUDENTE");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
    case "POST":
      const dataPost = await postHandler(userLogin, req.body, pid);
      res.status(dataPost.status).json(dataPost);
      break;
  }
}
