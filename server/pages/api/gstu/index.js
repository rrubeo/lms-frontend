const utils = require("../../../lib/utils");
import { sidemenu, navmenu, usermenu } from "../../../data/data_sidemenu";
import { rows, cols } from "../../../data/gstu/data_studenti";

export default async function handler(req, res) {
  await utils.cors(req, res);
  //   console.log(req.method);
  switch (req.method) {
    case "GET":
      const data = {
        title: "Gestione studenti",
        menu: sidemenu,
        navmenu: navmenu,
        usermenu: usermenu,
        config_label: "Inserisci nuovo studente",
        rows: rows,
        cols: cols,
      };
      res.status(200).json(data);
      break;
    default:
      // console.log(req.method);
      // console.log(req.headers);
      break;
  }
}
