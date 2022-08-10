const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../data/data_sidemenu";
import { rows, cols } from "../../../data/ar/data_utenti";

import { getFunzioniForm } from "../../../data/common";
import { getRicercaUtenti } from "../../../data/ar/common";

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
      const db_rows = await getRicercaUtenti(userLogin.token);
      const data = {
        title: "Assegnazione Ruoli",
        menu: sidemenu,
        navmenu: navmenu,
        usermenu: usermenu,
        config_label: "Inserisci nuovo utente",
        rows: db_rows,
        cols: cols,
        funzioni: db_funzioni,
      };
      res.status(200).json(data);
      break;
  }
}
