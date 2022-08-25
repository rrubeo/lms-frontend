const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { cols_materie } from "../../../../data/doce/data_docenti";

import { getFunzioniForm } from "../../../../data/common";
import {
  getAnagraficaDocenti,
  getDocenteMateria,
  insertDocenteMateria,
  deleteDocenteMateria,
  getMateriaScolasticaCombo,
} from "../../../../data/doce/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_docente = await getAnagraficaDocenti(userLogin.token, pid, 0);
  const db_rows = await getDocenteMateria(userLogin.token, pid);
  const db_materie = await getMateriaScolasticaCombo(userLogin.token);
  const data = {
    title: "Materie",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    back_label: "Torna indietro",
    rows: db_rows,
    cols: cols_materie,
    docente: db_docente,
    materie_label: "Materie",
    materie: db_materie,
    funzioni: db_funzioni,
  };
  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  console.log("************ RICEVUTA MATERIA");
  console.log(postData);

  for (let m of postData.materie) {
    let doma = {
      domaSysuser: userLogin.userID,
      domaFlagAttiva: 1,
      persId: pid,
      domaFkMascId: m.id,
    };

    console.log("************ POST MATERIA");
    console.log(doma);
    p3 = await insertDocenteMateria(userLogin.token, doma);

    console.log(p3);

    if (p3.status) {
      res.status = p3.status;
      res.message = p3.statusText;
    } else {
      res.id = p3.istuId;
    }
  }

  return res;
}

async function deleteHandler(userLogin, deleteData) {
  // console.log("deleteHandler");
  // console.log(deleteData);
  let d1 = await deleteDocenteMateria(userLogin.token, deleteData.key);
  // console.log(d1);
  const res = { status: 200, message: "Materia eliminata" };
  return res;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("MATERIE DOCENTI");
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
