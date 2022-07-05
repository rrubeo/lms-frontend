const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import {
  stepperIndirizzo,
  tornaIndietro,
} from "../../../../data/pbase/data_common";
import { rows, cols } from "../../../../data/pbase/data_lezione";

import {
  getFunzioniForm,
  getAnnoFrequenzaAggr,
  getClasseArgomentoCombo,
  getLezioneAggr,
  getClasseArgomentoBread,
  deleteLezioneAggr,
  insertLezioneAggr,
} from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_anno = await getAnnoFrequenzaAggr(userLogin.token, pid);
  const db_classe = await getClasseArgomentoCombo(userLogin.token, pid);
  const db_rows = await getLezioneAggr(userLogin.token, pid);
  const db_bread = await getClasseArgomentoBread(userLogin.token, pid);
  const data = {
    title: "Configurazione Programma Base Aggregato",
    stepper: stepperIndirizzo,
    login: false,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    anno_label: "Anno Frequenza",
    anno: db_anno,
    classe_label: "Classe Argomento",   
    lezione_label: "Lezione",    
    argomento_label: "Argomento",
    back_label: tornaIndietro,
    rows: db_rows,
    cols: cols,
    funzioni: db_funzioni,
    bread: db_bread,
  };
  return data;
}

async function deleteHandler(userLogin, deleteData) {
  console.log("deleteHandler");
  console.log(deleteData);
  let d1 = await deleteLezioneAggr(
    userLogin.token,
    deleteData.key,
    deleteData.pbaseId
  );
  // console.log(d1);
  const res = { status: 200, message: "Aggregato eliminato" };
  return res;
}

async function postHandler(userLogin, postData, response, pid) {
  let res = { status: 200, message: "" };
  for (let m of postData.lezione) {
    if (m != 0) {
      let poba = {
        lezaFkPobaId: parseInt(pid),
        lezaFkLeziId: m.id,
        lezaSysuser: userLogin.userID,
      };
      console.log(poba);
      let p3 = await insertLezioneAggr(userLogin.token, poba);
      console.log(p3);

      const msg =
        process.env.NODE_ENV === "production"
          ? "OK"
          : JSON.stringify(poba) + " RESULT:" + JSON.stringify(p3);

      res = { status: 200, message: msg };

      if (p3.status) {
        res.status = p3.status;
        res.message = p3.statusText;
        break;
      }
    }
  }

  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("AGGREGATO");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
    case "POST":
      const dataPost = await postHandler(userLogin, req.body, res, pid);
      res.status(dataPost.status).json(dataPost);
      break;
    case "DELETE":
      const dataDel = await deleteHandler(userLogin, req.body);
      res.status(dataDel.status).json(dataDel);
      break;
  }
}
