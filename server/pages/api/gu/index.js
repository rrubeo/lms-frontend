const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../data/data_sidemenu";
import { cols } from "../../../data/gu/data_utenti";

import {
  getFunzioniForm,
  getRicercaPersone,
  deletePersona,
} from "../../../data/common";
import {} from "../../../data/gu/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_rows = await getRicercaPersone(userLogin.token);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const data = {
    title: "Gestione Utenti",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    config_label: "Inserisci nuovo utente",
    rows: db_rows,
    cols: cols,
    funzioni: db_funzioni,
  };
  return data;
}

async function deleteHandler(userLogin, deleteData) {
  let d1 = await deletePersona(userLogin.token, deleteData.key);
  console.log(d1);
  const res = { status: 200, message: "Utente disattivato in anagrafica" };
  return res;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("GESTIONE UTENTI RICERCA");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
    case "DELETE":
      const dataDel = await deleteHandler(userLogin, req.body);
      res.status(dataDel.status).json(dataDel);
      break;
  }
}
