const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../data/data_sidemenu";
import { rows } from "../../../data/pbase/data_materie";

import { getRiepilogoProgrammaBase } from "../../../data/pbase/common";
import { getFunzioniForm } from "../../../data/common";

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("RICERCA");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  const cols = [
    {
      field: "col1",
      headerName: "Anno Frequenza",
      flex: 1,
      minWidth: 110,
      maxWidth: 110,
    },
    {
      field: "col2",
      headerName: "Materia",
      flex: 1,
      minWidth: 110,
      maxWidth: 110,
    },
    { field: "col3", headerName: "Classe Argomento", flex: 1, minWidth: 50 },
    { field: "col4", headerName: "Argomento", flex: 1, minWidth: 50 },
    { field: "col5", headerName: "Lezione", flex: 1, minWidth: 50 },
    { field: "col6", headerName: "Contenuto", flex: 1, minWidth: 50 },
    { field: "col7", headerName: "Tipo", flex: 1, minWidth: 50, maxWidth: 120 },
    {
      field: "col8",
      headerName: "Durata",
      flex: 1,
      minWidth: 50,
      maxWidth: 90,
      type: "number",
      align: "right",
    },
    {
      field: "col9",
      headerName: "Agg.",
      flex: 1,
      minWidth: 70,
      maxWidth: 70,
    },
  ];

  switch (req.method) {
    case "GET":
      const db_funzioni = await getFunzioniForm(
        userLogin.token,
        userLogin.userID,
        "FRM_ProgBase_Ricerca"
      );
      const db_rows = await getRiepilogoProgrammaBase(userLogin.token);
      const data = {
        title: "Ricerca Esercitazione",
        menu: sidemenu,
        navmenu: navmenu,
        usermenu: usermenu,
        config_label: "Configurazione Programma Base",
        rows: db_rows,
        cols: cols,
        funzioni: db_funzioni,
      };
      res.status(200).json(data);
      break;
  }
}
