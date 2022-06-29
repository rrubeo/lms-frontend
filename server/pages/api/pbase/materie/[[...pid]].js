const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/pbase/data_common";
import {
  anno_frequenza,
  materie,
  rows,
  cols,
} from "../../../../data/pbase/data_materie";

import {
  getFunzioniForm,
  getAnnoFrequenza,
  getMaterie,
  getProgrammaBase,
  getClasseArgomentoBread,
  insertProgrammaBase,
  deleteProgrammaBase,
} from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_annofreq = await getAnnoFrequenza(userLogin.token);
  const db_materie = await getMaterie(userLogin.token);
  const db_rows = await getProgrammaBase(userLogin.token, pid);
  const db_bread = await getClasseArgomentoBread(userLogin.token, pid);

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
    annofreq_label: "Anno Frequenza",
    annofreq: db_annofreq,
    materie_label: "Materie",
    materie: db_materie,
    back_label: tornaIndietro,
    rows: db_rows,
    cols: cols,
    funzioni: db_funzioni,
    bread: db_bread,
  };
  return data;
}

async function deleteHandler(userLogin, deleteData) {
  let d1 = await deleteProgrammaBase(userLogin.token, deleteData.key);
  console.log(d1);
  const res = { status: 200, message: "Materia eliminata" };
  return res;
}

async function postHandler(userLogin, postData, response) {
  for (let m of postData.materie) {
    let poba = {
      pobaFkMascId: m.id,
      pobaSysuser: userLogin.userID,     
      pobaFkAnfrId: postData.anno.id,
      pobaFlagAggregato: 1,
    };
    console.log(poba);
    let p3 = await insertProgrammaBase(userLogin.token, poba);
    console.log(p3);
    if (p3.status) {
      response
        .status(p3.status)
        .json({ status: p3.status, message: p3.statusText });
    }
  }
  const res = { status: 200, message: "OK" };
  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("MATERIE");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
    case "POST":
      const dataPost = await postHandler(userLogin, req.body, res);
      res.status(dataPost.status).json(dataPost);
      break;
    case "DELETE":
      const dataDel = await deleteHandler(userLogin, req.body);
      res.status(dataDel.status).json(dataDel);
      break;
  }
}
