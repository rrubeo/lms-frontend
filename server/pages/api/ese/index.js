const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../data/data_sidemenu";
import { cols } from "../../../data/ese/data_ricerca";

import { getFunzioniForm } from "../../../data/common";
import { getRicercaLezioni } from "../../../data/ese/common";

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("RICERCA");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const db_funzioni = await getFunzioniForm(
        userLogin.token,
        userLogin.userID,
        "FRM_ProgBase_Ricerca"
      );
      const db_rows = await getRicercaLezioni(userLogin.token);
      const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
      const data = {
        title: "Ricerca Esercitazione",
        menu: db_menu,
        navmenu: navmenu,
        usermenu: usermenu,
        rows: db_rows,
        cols: cols,
        funzioni: db_funzioni,
      };
      res.status(200).json(data);
      break;
  }
}
