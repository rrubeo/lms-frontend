const utils = require("../../../../lib/utils");
import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/pbase/data_common";
import { rows, cols } from "../../../../data/pbase/data_lezione";

import {
  getToken,
  getFunzioniForm,
  getLezione,
  getLezioneBread,
  deleteLezione,
  insertLezione,
} from "../../../../data/common";

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("LEZIONE");
  // console.log(req.method);
  // console.log(req.query);

  let { pid } = req.query;
  if (!pid) pid = 0;
  else pid = pid[0];
  console.log(pid);

  // let userLogin = {
  //   userID: "",
  //   token: "",
  // };

  // if (req.headers.token) {
  //   userLogin.userID = req.headers.userid;
  //   userLogin.token = req.headers.token;
  // }

  // console.log(userLogin);

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
    lezione_label: "Lezione",
    back_label: tornaIndietro,
    rows: [],
    cols: cols,
    bread: [],
  };

  switch (req.method) {
    case "GET":
      const db_rows = await getLezione(userLogin.token, pid);
      const db_bread = await getLezioneBread(userLogin.token, pid);

      data.rows = db_rows;
      data.bread = db_bread;
      res.status(200).json(data);
      break;
    case "POST":
      const postData = req.body;
      // console.log(postData);
      let poba = {
        leziDescr: postData.lezione,
        leziFlagAttiva: 1,
        leziSysuser: userLogin.userID,
        leziFkArgoId: pid,
        leziPathVideo: "asasdasd",
        leziPathDocumento: "asdasd",
      };
      // console.log(poba);
      let p3 = await insertLezione(userLogin.token, poba);
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
      let d1 = await deleteLezione(userLogin.token, deleteData.key);
      console.log(d1);
      res.status(200).json({ status: 200, message: "Lezione eliminata" });
      break;
    default:
      // console.log(req.method);
      // console.log(req.headers);
      break;
  }
}
