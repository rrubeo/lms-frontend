const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../data/data_sidemenu";
import { cols } from "../../../data/gstu/data_studenti";

import { getFunzioniForm } from "../../../data/common";
import { getRicercaStudenti } from "../../../data/gstu/common";

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
      const db_rows = await getRicercaStudenti(userLogin.token);
      const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
      const data = {
        title: "Gestione Studenti",
        menu: db_menu,
        navmenu: navmenu,
        usermenu: usermenu,
        config_label: "Inserisci nuovo studente",
        rows: db_rows,
        cols: cols,
        funzioni: db_funzioni,
      };
      res.status(200).json(data);
      break;
  }
}
