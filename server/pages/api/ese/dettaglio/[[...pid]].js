const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import { tornaIndietro } from "../../../../data/ese/data_common";
import { rows, cols } from "../../../../data/ese/data_dettaglio";

import { getFunzioniForm } from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const data = {
    title: "Gestione Esercitazione",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    back_label: tornaIndietro,
    rows: rows,
    cols: cols,
    funzioni: db_funzioni,
  };

  return data;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("ESERCITAZIONE DETTAGLIO");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
