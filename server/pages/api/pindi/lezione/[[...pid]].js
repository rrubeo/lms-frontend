const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import {
  stepperIndirizzo,
  tornaIndietro,
} from "../../../../data/pbase/data_common";
import { rows, cols, classe_select } from "../../../../data/pindi/data_lezione";

import {
  getFunzioniForm,
  getClasseArgomentoIndiCombo,
  getProgrammaIndi,
  getProgrammaIndiBread,
  insertProgrammaIndi,
  deleteProgrammaIndi,
} from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_classe = await getClasseArgomentoIndiCombo(userLogin.token, pid);
  const db_rows = await getProgrammaIndi(userLogin.token, pid);
  const db_bread = await getProgrammaIndiBread(userLogin.token, pid);
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
    rows: db_rows,
    cols: cols,
    funzioni: db_funzioni,
    bread: db_bread,
  };
  return data;
}

async function deleteHandler(userLogin, deleteData) {
  let d1 = await deleteProgrammaIndi(userLogin.token, deleteData.key);
  console.log(d1);
  const res = { status: 200, message: "Lezione eliminata" };
  return res;
}

async function postHandler(userLogin, postData, response, pid) {
  let res = { status: 200, message: "" };
  for (let m of postData.lezione) {
    if (m != 0) {
      let poba = {
        prinFkAninId: pid,
        prinSysuser: userLogin.userID,        
        prinFkLeziId: m.id,
      };
      console.log(poba);
      let p3 = await insertProgrammaIndi(userLogin.token, poba);

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
  console.log("LEZIONE");
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
