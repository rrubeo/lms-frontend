const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/pbase/data_common";
import { rows, cols } from "../../../../data/pbase/data_lezione";

import {
  getFunzioniForm,
  getLezione,
  getLezioneBread,
  deleteLezione,
  insertLezione,
} from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_rows = await getLezione(userLogin.token, pid);
  const db_bread = await getLezioneBread(userLogin.token, pid);
  const data = {
    title: "Configurazione Programma Base",
    stepper: stepper,
    login: false,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    lezione_label: "Lezione",
    back_label: tornaIndietro,
    rows: db_rows,
    cols: cols,
    funzioni: db_funzioni,
    bread: db_bread,
  };
  return data;
}

async function deleteHandler(userLogin, deleteData) {
  let d1 = await deleteLezione(userLogin.token, deleteData.key);
  console.log(d1);
  const res = { status: 200, message: "Lezione eliminata" };
  return res;
}

async function postHandler(userLogin, postData, pid) {
  let poba = {
    leziDescr: postData.lezione,
    leziFlagAttiva: 1,
    leziSysuser: userLogin.userID,
    leziFkArgoId: pid,
    leziPathVideo: "asasdasd",
    leziPathDocumento: "asdasd",
  };
  console.log(poba);
  let p3 = await insertLezione(userLogin.token, poba);
  console.log(p3);
  let res = { status: 200, message: "OK" };
  if (p3.status) {
    res.status = p3.status;
    res.message = p3.p3.statusText;
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
      const dataPost = await postHandler(userLogin, req.body, pid);
      res.status(dataPost.status).json(dataPost);
      break;
    case "DELETE":
      const dataDel = await deleteHandler(userLogin, req.body);
      res.status(dataDel.status).json(dataDel);
      break;
  }
}
