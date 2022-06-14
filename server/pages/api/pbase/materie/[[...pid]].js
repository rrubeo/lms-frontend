const utils = require("../../../../lib/utils");
import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/pbase/data_common";
import {
  anno_frequenza,
  materie,
  rows,
  cols,
} from "../../../../data/pbase/data_materie";

import { PobaProgrammaBaseAnas } from "../../../../data/config";

import {
  getToken,
  getFunzioniForm,
  getAnnoFrequenza,
  getMaterie,
  getProgrammaBase,
  getClasseArgomentoBread,
  insertProgrammaBase,
  deleteProgrammaBase,
} from "../../../../data/common";

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("MATERIE");
  // console.log(req.method);
  // console.log(req.query);

  let { pid } = req.query;
  if (!pid) pid = 0;
  else pid = pid[0];
  console.log(pid);

  const userLogin = await getToken("Romolo", "pass2");

  // let userLogin = {
  //   userID: "",
  //   token: "",
  // };

  // if (req.headers.token) {
  //   userLogin.userID = req.headers.userid;
  //   userLogin.token = req.headers.token;
  // }

  // console.log(userLogin);

  const db_annofreq = await getAnnoFrequenza(userLogin.token);
  const db_materie = await getMaterie(userLogin.token);
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
    annofreq_label: "Anno Frequenza",
    annofreq: db_annofreq,
    materie_label: "Materie",
    materie: db_materie,
    back_label: tornaIndietro,
    rows: [],
    cols: cols,
    funzioni: db_funzioni,
    bread: [],
  };

  // console.log(req.method);
  switch (req.method) {
    case "GET":
      const db_rows = await getProgrammaBase(userLogin.token, pid);
      const db_bread = await getClasseArgomentoBread(userLogin.token, pid);

      data.rows = db_rows;
      data.bread = db_bread;
      res.status(200).json(data);
      break;
    case "POST":
      const postData = req.body;
      for (let m of postData.materie) {
        let poba = {
          pobaFkMascId: m.id,
          pobaSysuser: userLogin.userID,
          pobaFlagAttiva: 1,
          pobaFkAnfrId: postData.anno.id,
        };
        // console.log(poba);
        let p3 = await insertProgrammaBase(userLogin.token, poba);
        // console.log(p3);
        if (p3.status) {
          res
            .status(p3.status)
            .json({ status: p3.status, message: p3.statusText });
        }
      }
      res.status(200).json({ status: 200, message: "OK" });
      break;
    case "DELETE":
      const deleteData = req.body;
      // console.log(deleteData);
      let d1 = await deleteProgrammaBase(userLogin.token, deleteData.key);
      console.log(d1);
      res.status(200).json({ status: 200, message: "Materia eliminata" });
      break;
    default:
      // console.log(req.method);
      // console.log(req.headers);
      break;
  }
}
