const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { cols_servizi } from "../../../../data/gstu/data_studenti";

import { getFunzioniForm } from "../../../../data/common";

import {
  getServizioCombo,
  getServizioSottoscritto,
  insertServizio,
  deleteServizio,
} from "../../../../data/gstu/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_servizio = await getServizioCombo(userLogin.token);
  const db_sottoscritto = await getServizioSottoscritto(userLogin.token, pid);

  const data = {
    title: "Servizi",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    servizio_label: "Servizi Aggiuntivi",
    servizio: db_servizio,
    sottoscritto_label: "Data Sottoscrizione",
    funzioni: db_funzioni,
    rows: db_sottoscritto,
    cols: cols_servizi,
  };
  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  console.log("************ RICEVUTO SERVIZIO");
  console.log(postData);

  let seso = {
    // sesoId: 8,
    sesoFkIstuId: pid,
    sesoFkServId: postData.servizio.id,
    sesoDataSottoscrizione: postData.sottoscritto,
    sesoFlagAttiva: 1,
    sesoSysuser: userLogin.userID,
  };

  console.log("************ POST SERVIZIO");
  console.log(seso);
  p3 = await insertServizio(userLogin.token, seso);

  console.log(p3);

  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    res.id = p3.istuId;
  }

  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("SERVIZI");
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
