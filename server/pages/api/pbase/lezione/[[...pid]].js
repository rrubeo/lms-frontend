const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/pbase/data_common";
import { cols } from "../../../../data/pbase/data_lezione";

import {
  getLezione,
  getLezioneBread,
  deleteLezione,
  insertLezione,
} from "../../../../data/pbase/common";

import { getFunzioniForm, moveRec } from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_rows = await getLezione(userLogin.token, pid);
  const db_bread = await getLezioneBread(userLogin.token, pid);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const data = {
    title: "Configurazione Programma Base",
    stepper: stepper,
    login: false,
    menu: db_menu,
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
  // console.log(d1);
  const res = { status: 200, message: "Lezione eliminata" };
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
      leziDescr: postData.lezione,
      leziSysuser: userLogin.userID,
      leziFkArgoId: pid,
      leziPathVideo: "asasdasd",
      leziPathDocumento: "asdasd",
    };
    console.log(poba);
    let p3 = await insertLezione(userLogin.token, poba);
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
