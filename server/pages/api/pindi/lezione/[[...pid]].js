const utils = require("../../../../lib/utils");
import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import {
  stepperIndirizzo,
  tornaIndietro,
} from "../../../../data/pbase/data_common";
import { rows, cols, classe_select } from "../../../../data/pindi/data_lezione";

import {
  getToken,
  getFunzioniForm,
  getClasseArgomentoCombo,  
  getProgrammaIndi,
  getProgrammaIndiBread,
  insertProgrammaIndi,
  deleteProgrammaIndi,
} from "../../../../data/common";

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);
  console.log("LEZIONE"); 
  let id = 0;

  let { pid } = req.query;
  console.log(pid);
  if (pid) {
    id = pid[0];  
  }
  console.log(id);
  

  const userLogin = await getToken("Romolo", "pass2");
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_classe = await getClasseArgomentoCombo(userLogin.token);  
  const data = {
    title: "Configurazione Programma Indirizzo",
    stepper: stepperIndirizzo,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    classe_label: "Classe Argomento",
    classe: db_classe,
    lezione_label: "Lezione",
    lezione: [],
    back_label: tornaIndietro,
    rows: [],
    cols: cols,
    bread: [],
  };
  switch (req.method) {
    case "GET":
      const db_rows = await getProgrammaIndi(userLogin.token, id);
      const db_bread = await getProgrammaIndiBread(userLogin.token, pid);

      data.rows = db_rows;
      data.bread = db_bread;
      res.status(200).json(data);
      break;
    case "POST":
      const postData = req.body;
      console.log(postData);

      for (let m of postData.lezione) {
        if (m != 0) {
          let poba = {
            prinFkAninId: id,
            prinSysuser: userLogin.userID,
            prinFlagAttiva: 1,
            prinFkLeziId: m.id,
          };
          console.log(poba);
          let p3 = await insertProgrammaIndi(userLogin.token, poba);
          if (p3.status) {
            res
              .status(p3.status)
              .json({ status: p3.status, message: p3.statusText });
          }
        }
      }
      res.status(200).json({ status: 200, message: "OK" });
      break;
    case "DELETE":
      const deleteData = req.body;
      console.log(deleteData);
      let d1 = await deleteProgrammaIndi(userLogin.token, deleteData.key);
      console.log(d1);
      res.status(200).json({ status: 200, message: "Lezione eliminata" });
      break;
    default:
      // console.log(req.method);
      // console.log(req.headers);
      break;
  }
}
