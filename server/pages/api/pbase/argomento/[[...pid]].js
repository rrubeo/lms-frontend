const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/pbase/data_common";
import { rows, cols } from "../../../../data/pbase/data_argomento";

import {
  getArgomento,
  getArgomentoBread,
  deleteArgomento,
  insertArgomento,
} from "../../../../data/pbase/common";

import { getFunzioniForm, moveRec } from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_rows = await getArgomento(userLogin.token, pid);
  const db_bread = await getArgomentoBread(userLogin.token, pid);
  const data = {
    title: "Configurazione Programma Base",
    stepper: stepper,
    login: false,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
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
  let d1 = await deleteArgomento(userLogin.token, deleteData.key);
  console.log(d1);
  const res = { status: 200, message: "Argomento eliminato" };
  return res;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200 };
  let p3 = {};
  if (postData.hasOwnProperty("gd")) {
    p3 = await moveRec(
      userLogin.token,
      postData.row.id,
      postData.gd,
      postData.action
    );
    console.log(p3);

    const msg =
      process.env.NODE_ENV === "production"
        ? "OK"
        : JSON.stringify(postData) + " RESULT:" + JSON.stringify(p3);

    res.message = msg;
  } else {
    let poba = {
      argoDescr: postData.argomento,
      argoSysuser: userLogin.userID,
      argoFkClarId: pid,
    };
    let p3 = await insertArgomento(userLogin.token, poba);
    console.log(p3);

    const msg =
      process.env.NODE_ENV === "production"
        ? "OK"
        : JSON.stringify(poba) + " RESULT:" + JSON.stringify(p3);

    res.message = msg;
  }

  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  }
  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("ARGOMENTO");
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
