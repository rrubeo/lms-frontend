const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";

import { getFunzioniForm } from "../../../../data/common";

import {
  getTutorCombo,
  insertTutor,
  deleteTutor,
  getStudenteTutor,
} from "../../../../data/gstu/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_tutor = await getTutorCombo(userLogin.token);
  const db_rows = await getStudenteTutor(userLogin.token, pid);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const data = {
    title: "Tutor",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    funzioni: db_funzioni,
    tutor_label: "Nominativo Tutor",
    tutor: db_tutor,
    rows: db_rows,
  };
  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  console.log("************ RICEVUTO TUTOR");
  console.log(postData);

  let stut = {
    stutFlagAttiva: 1,
    stutSysuser: userLogin.userID,
    stutFkIstuId: pid,
    stutFkRuutId: postData.tutor.id,
  };

  console.log("************ POST TUTOR");
  console.log(stut);
  p3 = await insertTutor(userLogin.token, stut);

  console.log(p3);

  if (p3.err == 1) {
    res.status = 200;
    res.message = p3.errDesc;
    return res;
  }

  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    res.id = p3.istuId;
  }

  return res;
}

async function deleteHandler(userLogin, deleteData) {
  console.log("deleteHandler");
  console.log(deleteData);
  let d1 = await deleteTutor(userLogin.token, deleteData.key);
  const res = { status: 200, message: "Assegnazione eliminata" };
  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("TUTOR");
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
