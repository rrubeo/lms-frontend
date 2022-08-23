const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../data/data_sidemenu";
import { cols } from "../../../data/doce/data_docenti";

import { getFunzioniForm } from "../../../data/common";
import { getAnagraficaDocenti } from "../../../data/doce/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_rows = await getAnagraficaDocenti(userLogin.token, 0, 0);
  const data = {
    title: "Gestione Docenti",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_rows,
    cols: cols,
    funzioni: db_funzioni,
  };
  return data;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("GESTIONE DOCENTI");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
