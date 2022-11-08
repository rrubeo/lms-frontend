const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/ese/data_common";
import { cols } from "../../../../data/ese/data_esercita";

import { getFunzioniForm } from "../../../../data/common";
import {
  getBreadEsercita,
  getGruppoDomande,
  deleteGruppoDomande,
  insertGruppoDomande,
} from "../../../../data/ese/common";

async function getHandler(userLogin, pid, pidLezione) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_rows = await getGruppoDomande(userLogin.token, pid);
  const db_bread = await getBreadEsercita(userLogin.token, pidLezione, pid);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const data = {
    title: "Esercitazioni - Gruppo Domande",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_rows,
    cols: cols,
    tipo_label: "Tipo Esercitazione",
    tipo: [],
    livello_label: "Livello Difficoltà",
    livello: [],
    testo_gruppo_label: "Testo Gruppo",
    nome_gruppo_label: "Nome Gruppo Domande",
    punteggio_label: "Punteggio Minimo",
    back_label: tornaIndietro,
    stepper: stepper,
    funzioni: db_funzioni,
    bread: db_bread,
  };
  return data;
}

async function deleteHandler(userLogin, deleteData) {
  console.log("deleteHandler");
  // console.log(deleteData);
  let d1 = await deleteGruppoDomande(userLogin.token, deleteData.key);
  const res = { status: 200, message: "Gruppo eliminato" };
  return res;
}

async function postHandler(userLogin, postData, pid) {
  // console.log(postData);
  let poba = {
    grudId: postData.upid ? postData.upid : -1,
    grudNome: postData.nomeGruppo,
    grudSysuser: userLogin.userID,
    grudPathFile: "",
    grudTesto: postData.testoGruppo,
    grudFkTifiId: 0,
    grudFkEserId: pid,
  };
  // console.log("########################################################");
  // console.log(poba);
  let p3 = await insertGruppoDomande(userLogin.token, poba);
  // console.log(p3);

  let res = { status: 200, message: "OK" };
  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    res.id = p3.eserId;
  }

  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("ESERCITAZIONE GRUPPI");
  const pid = apic.getPid(req);
  const pidLezione = apic.getParentPid(req, 1);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid, pidLezione);
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
