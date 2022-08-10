const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";

import {
  getFunzioniForm,
  getPaese,
  getRegione,
  getProvincia,
  getComune,
  getToponimo,
  insertPersona,
  getPersona,
} from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const data = {
    title: "Icrizione",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    tab4_label: "Piano Studi Personalizzato",
    tab5_label: "Servizi Sottoscritti",
    tab6_label: "Rate",
    tab7_label: "Pagamenti",
    tab8_label: "Tutor",
    tab9_label: "Docenti",
    funzioni: db_funzioni,
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
