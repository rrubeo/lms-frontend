const utils = require("../../../lib/utils");
import { sidemenu, navmenu, usermenu } from "../../../data/data_sidemenu";
import {
  stepperIndirizzo,
  tornaIndietro,
} from "../../../data/pbase/data_common";
import {
  indirizzo_istituto,
  programma_base,
  rows,
  cols,
} from "../../../data/pindi/data_indirizzo";

import {
  getToken,
  getFunzioniForm,
  getIndirizzoIstituto,
  getProgrammaBaseCombo,
  insertAnnoIndIstituto,
  getAnnoIndIstituto,
  deleteAnnoIndIstituto,
} from "../../../data/common";

export default async function handler(req, res) {
  await utils.cors(req, res);
  //   console.log(req.method);
  console.log("PROGRAMMA INDIRIZZO");

  const userLogin = await getToken("Romolo", "pass2");

  const db_indirizzo = await getIndirizzoIstituto(userLogin.token);
  const db_pbase = await getProgrammaBaseCombo(userLogin.token);
  const data = {
    title: "Configurazione Programma Indirizzo",
    stepper: stepperIndirizzo,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    indirizzo_label: "Indirizzo Istituto",
    indirizzo: db_indirizzo,
    programma_label: "Programma Base",
    programma: db_pbase,
    rows: [],
    cols: cols,
    bread: [],
  };

  switch (req.method) {
    case "GET":
      const db_rows = await getAnnoIndIstituto(userLogin.token);
      data.rows = db_rows;
      // data.rows = rows;
      res.status(200).json(data);
      break;
    case "POST":
      const postData = req.body;
      console.log(postData);
      let poba = {
        aninFkInisId: postData.istituto.id,
        aninSysuser: userLogin.userID,
        aninFlagAttiva: 1,
        aninFkPobaId: postData.programma.id,
      };
      console.log(poba);
      let p3 = await insertAnnoIndIstituto(userLogin.token, poba);
      // console.log(p3);
      if (p3.status) {
        res
          .status(p3.status)
          .json({ status: p3.status, message: p3.statusText });
      } else {
        res.status(200).json({ status: 200, message: "OK" });
      }
      break;
    case "DELETE":
      const deleteData = req.body;
      console.log(deleteData);
      let d1 = await deleteAnnoIndIstituto(userLogin.token, deleteData.key);
      console.log(d1);
      res.status(200).json({ status: 200, message: "Programma Indirizzo eliminato" });
      break;
    default:
      // console.log(req.method);
      // console.log(req.headers);
      break;
  }
}
