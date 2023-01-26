const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";

import { getFunzioniForm } from "../../../../data/common";

import {
  getStudenteDocente,
  insertDocente,
  deleteDocente,
  getMateriaScolasticaCombo,
} from "../../../../data/gstu/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_docenti = await getStudenteDocente(userLogin.token, pid, 0, 0);
  const db_materie = await getMateriaScolasticaCombo(userLogin.token);
  // const db_filtra = await getDocenteMateria(userLogin.token, 0);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const data = {
    title: "Docenti",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    funzioni: db_funzioni,
    materie_label: "Materia",
    materie: db_materie,
    docente_label: "Nominativo Docente",
    // docente: db_filtra,
    rows: db_docenti,
  };
  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  console.log("************ RICEVUTO DOCENTE");
  console.log(postData);

  let stdo = {
    stdoFkIstuId: pid,
    stdoFkDomaId: postData.nominativo.id,
    stdoFlagAttiva: 1,
    stdoSysuser: userLogin.userID,
  };

  console.log("************ POST DOCENTE");
  console.log(stdo);
  p3 = await insertDocente(userLogin.token, stdo);

  console.log(p3);

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
  let d1 = await deleteDocente(userLogin.token, deleteData.key);
  const res = { status: 200, message: "Assegnazione eliminata" };
  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("DOCENTE");
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
