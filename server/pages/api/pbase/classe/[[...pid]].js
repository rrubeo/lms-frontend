const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/pbase/data_common";
import { cols } from "../../../../data/pbase/data_classe";

import {
  getClasseArgomentoBread,
  getClasseArgomento,
  deleteClasseArgomento,
  insertClasseArgomento,
} from "../../../../data/pbase/common";

import { getFunzioniForm, moveRec } from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_rows = await getClasseArgomento(userLogin.token, pid);
  const db_bread = await getClasseArgomentoBread(userLogin.token, pid);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const data = {
    title: "Configurazione Programma Base",
    stepper: stepper,
    login: false,
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    classe_label: "Classe Argomento",
    back_label: tornaIndietro,
    rows: db_rows,
    cols: cols,
    funzioni: db_funzioni,
    bread: db_bread,
  };
  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200 };
  let p3 = {};
  // console.log(postData);

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
      clarDescr: postData.classe,
      clarSysuser: userLogin.userID,
      clarFkPobaId: pid,
    };

    p3 = await insertClasseArgomento(userLogin.token, poba);
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

async function deleteHandler(userLogin, deleteData) {
  let d1 = await deleteClasseArgomento(userLogin.token, deleteData.key);
  console.log(d1);
  const res = { status: 200, message: "Classe Argomento eliminata" };
  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("CLASSE ARGOMENTO");
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
