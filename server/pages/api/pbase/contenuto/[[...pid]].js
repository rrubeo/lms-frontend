const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/pbase/data_common";
import { contenuto, rows, cols } from "../../../../data/pbase/data_contenuto";

import {
  getToken,
  getFunzioniForm,
  getTipoContenuto,
  getContenuto,
  getContenutoBread,
  deleteContenuto,
  insertContenuto,
  uploadContenuto,
} from "../../../../data/common";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};

async function getHandler(userLogin, pid) {
  const db_tipo = await getTipoContenuto(userLogin.token);
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_rows = await getContenuto(userLogin.token, pid);
  const db_bread = await getContenutoBread(userLogin.token, pid);
  const data = {
    title: "Configurazione Programma Base",
    stepper: stepper,
    login: false,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    tipo_label: "Tipo Contenuto",
    tipo: db_tipo,
    nome_label: "Nome Contenuto",
    percorso_label: "Percorso File",
    durata_label: "Durata Minuti",
    back_label: tornaIndietro,
    rows: db_rows,
    cols: cols,
    funzioni: db_funzioni,
    bread: db_bread,
  };
  return data;
}

async function deleteHandler(userLogin, deleteData) {
  let d1 = await deleteContenuto(userLogin.token, deleteData.key);
  console.log(d1);
  const res = { status: 200, message: "Contenuto eliminato" };
  return res;
}

async function postHandler(userLogin, postData, pid) {
  let poba = {
    coleFlagAttiva: 1,
    coleSysuser: userLogin.userID,
    coleFkTicoId: postData.tipo.id,
    coleFkLeziId: pid,
    colePath: postData.percorso,
    coleNome: postData.nome,
    coleMinutiDurata: postData.durata,
  };
  // console.log(poba);
  let p3 = await insertContenuto(userLogin.token, poba);
  console.log(p3);
  let res = { status: 200, message: "OK" };
  if (p3.status) {
    res.status = p3.status;
    res.message = p3.p3.statusText;
  } else {
    res.id = p3.coleId;
  }
  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("CONTENUTO");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  // console.log(req.method);
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
