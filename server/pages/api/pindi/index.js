const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../data/data_sidemenu";
import { stepperIndirizzo } from "../../../data/pbase/data_common";
import { cols } from "../../../data/pindi/data_indirizzo";

import {
  getIndirizzoIstituto,
  insertAnnoIndIstituto,
  getAnnoIndIstituto,
  deleteAnnoIndIstituto,
} from "../../../data/pindi/common";

import { getProgrammaBaseCombo } from "../../../data/pbase/common";

async function getHandler(userLogin, pid) {
  const db_indirizzo = await getIndirizzoIstituto(userLogin.token);
  const db_pbase = await getProgrammaBaseCombo(userLogin.token);
  const db_rows = await getAnnoIndIstituto(userLogin.token);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const data = {
    title: "Configurazione Programma Indirizzo",
    stepper: stepperIndirizzo,
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    indirizzo_label: "Indirizzo Istituto",
    indirizzo: db_indirizzo,
    programma_label: "Programma Base",
    programma: db_pbase,
    rows: db_rows,
    cols: cols,
    bread: [],
  };
  return data;
}

async function deleteHandler(userLogin, deleteData) {
  let d1 = await deleteAnnoIndIstituto(userLogin.token, deleteData.key);
  console.log(d1);
  const res = { status: 200, message: "Programma Indirizzo eliminato" };
  return res;
}

async function postHandler(userLogin, postData) {
  let poba = {
    aninFkInisId: postData.istituto.id,
    aninSysuser: userLogin.userID,
    aninFkPobaId: postData.programma.id,
  };
  console.log(poba);
  let p3 = await insertAnnoIndIstituto(userLogin.token, poba);

  let res = { status: 200, message: "OK" };
  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  }
  return res;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("PROGRAMMA INDIRIZZO");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
    case "POST":
      const dataPost = await postHandler(userLogin, req.body);
      res.status(dataPost.status).json(dataPost);
      break;
    case "DELETE":
      const dataDel = await deleteHandler(userLogin, req.body);
      res.status(dataDel.status).json(dataDel);
      break;
  }
}
