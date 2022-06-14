const utils = require("../../../../lib/utils");
import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/pbase/data_common";
import { rows, cols } from "../../../../data/pbase/data_classe";

import {
  getToken,
  getFunzioniForm,
  getClasseArgomento,
  getClasseArgomentoBread,
  deleteClasseArgomento,
  insertClasseArgomento,
} from "../../../../data/common";

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("CLASSE ARGOMENTO");
  // console.log(req.method);
  // console.log(req.query);

  let { pid } = req.query;
  if (!pid) pid = 0;
  else pid = pid[0];
  console.log(pid);

  const userLogin = await getToken("Romolo", "pass2");
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const data = {
    title: "Configurazione Programma Base",
    stepper: stepper,
    login: false,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    classe_label: "Classe Argomento",
    back_label: tornaIndietro,
    rows: [],
    cols: cols,
    bread: [],
  };
  // console.log(req.method);
  switch (req.method) {
    case "GET":
      const db_rows = await getClasseArgomento(userLogin.token, pid);
      const db_bread = await getClasseArgomentoBread(userLogin.token, pid);
      // console.log(db_bread);
      data.rows = db_rows;
      data.bread = db_bread;
      res.status(200).json(data);
      break;
    case "POST":
      const postData = req.body;
      // console.log(postData);
      let poba = {
        clarDescr: postData.classe,
        clarFlagAttiva: 1,
        clarSysuser: userLogin.userID,
        clarFkPobaId: pid,
      };      
      let p3 = await insertClasseArgomento(userLogin.token, poba);
      console.log(p3);
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
      let d1 = await deleteClasseArgomento(userLogin.token, deleteData.key);
      console.log(d1);
      res.status(200).json({ status: 200, message: "Classe Argomento eliminata" });
      break;
    default:
      // console.log(req.method);
      // console.log(req.headers);
      break;
  }
}
