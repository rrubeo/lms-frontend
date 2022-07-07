const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../data/data_sidemenu";
import { cols, rows } from "../../../data/ese/data_ricerca";

import { getFunzioniForm } from "../../../data/common";

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
      // const db_rows = await getRiepilogoProgrammaBase(userLogin.token);
      const data = {
        title: "Ricerca Esercitazione",
        menu: sidemenu,
        navmenu: navmenu,
        usermenu: usermenu,        
        rows: rows,
        cols: cols,
        funzioni: db_funzioni,
      };
      res.status(200).json(data);
      break;
  }
}
