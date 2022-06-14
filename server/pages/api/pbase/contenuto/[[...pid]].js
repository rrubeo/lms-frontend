const utils = require("../../../../lib/utils");
import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/pbase/data_common";
import { contenuto, rows, cols } from "../../../../data/pbase/data_contenuto";

import {
  getToken,
  getFunzioniForm,
  getTipoContenuto,
  getContenuto,
  getContenutoBread,
  deleteContenuto,
  insertContenuto,
} from "../../../../data/common";

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("CONTENUTO");
  // console.log(req.method);
  // console.log(req.query);

  let { pid } = req.query;
  if (!pid) pid = 0;
  else pid = pid[0];
  console.log(pid);

  const userLogin = await getToken("Romolo", "pass2");
  const db_tipo = await getTipoContenuto(userLogin.token);
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
    tipo_label: "Tipo Contenuto",
    tipo: db_tipo,
    nome_label: "Nome Contenuto",
    percorso_label: "Percorso File",
    durata_label: "Durata Minuti",
    back_label: tornaIndietro,
    rows: [],
    cols: cols,
    bread: [],
  };

  // console.log(req.method);
  switch (req.method) {
    case "GET":
      const db_rows = await getContenuto(userLogin.token, pid);
      const db_bread = await getContenutoBread(userLogin.token, pid);

      data.rows = db_rows;
      data.bread = db_bread;
      res.status(200).json(data);
      break;
    case "POST":
      const postData = req.body;
      // console.log(postData);
      let poba = {
        coleFlagAttiva: 1,
        coleSysuser: userLogin.userID,
        coleFkTicoId: postData.tipo.id,
        coleFkLeziId: pid,
        colePath: postData.percorso,
        coleNome: postData.nome,
        coleMinutiDurata: postData.durata,
      };
      // console.log(poba);
      let p3 = await insertContenuto(userLogin.token, poba);
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
      let d1 = await deleteContenuto(userLogin.token, deleteData.key);
      console.log(d1);
      res.status(200).json({ status: 200, message: "Contenuto eliminato" });
      break;
    default:
      // console.log(req.method);
      // console.log(req.headers);
      break;
  }
}
