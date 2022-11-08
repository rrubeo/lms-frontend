const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../data/data_sidemenu";
import { cols } from "../../../data/ar/data_utenti";

import { getFunzioniForm } from "../../../data/common";
import { getRicercaUtenti } from "../../../data/ar/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_rows = await getRicercaUtenti(userLogin.token);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);

  const data = {
    title: "Assegnazione Ruoli",
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

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("RICERCA");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
