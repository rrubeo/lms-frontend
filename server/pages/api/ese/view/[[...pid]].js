const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/ese/data_common";
import { rows, cols } from "../../../../data/ese/data_view";

import { getFunzioniForm } from "../../../../data/common";
import {
  getEsercitazioneLezione,
  getTipoEsercitazioneCombo,
  getLivelloDiffCombo,
  insertEsercitazione,
  deleteEsercitazione,
  getBreadView,
  insertEsercitazioneIntoLezione,
} from "../../../../data/ese/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_rows = await getEsercitazioneLezione(userLogin.token, pid);
  const db_tipo = await getTipoEsercitazioneCombo(userLogin.token);
  const db_livello = await getLivelloDiffCombo(userLogin.token);
  const db_bread = await getBreadView(userLogin.token, pid);
  const data = {
    title: "Esercitazioni/Verifiche",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_rows,
    cols: cols,
    tipo_label: "Tipo Esercitazione",
    tipo: db_tipo,
    livello_label: "Livello Difficoltà",
    livello: db_livello,
    nome_label: "Nome Esercitazione",
    limite_label: "Limite Temporale (minuti)",
    punteggio_label: "Punteggio Minimo (%)",
    back_label: tornaIndietro,
    stepper: stepper,
    funzioni: db_funzioni,
    bread: db_bread,
  };
  return data;
}

async function deleteHandler(userLogin, deleteData) {
  console.log("deleteHandler");
  console.log(deleteData);
  let d1 = await deleteEsercitazione(userLogin.token, deleteData.key);
  const res = { status: 200, message: "Esercitazione eliminata" };
  return res;
}

async function postHandler(userLogin, postData, pid) {
  console.log(postData);
  let poba = {
    eserId: postData.upid ? postData.upid : -1,
    eserNome: postData.nome,
    eserMinutiTempoLimite: postData.limite,
    eserSysuser: userLogin.userID,
    eserFkLiveId: postData.livello.id,
    eserPunteggio: postData.punteggio,
    eserFlagVerifica: postData.tipo.id == 2 ? 1 : 0,
  };
  console.log("########################################################");
  console.log(poba);
  let p3 = await insertEsercitazione(userLogin.token, poba);
  console.log(p3);

  let res = { status: 200, message: "OK" };
  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    res.id = p3.eserId;

    let esle = {
      esleFkLeziId: pid,
      esleFkEserId: p3.eserId,
      esleSysuser: userLogin.userID,
    };
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log(esle);
    let p4 = await insertEsercitazioneIntoLezione(userLogin.token, esle);
    console.log(p4);
    if (p4.status) {
      res.status = p4.status;
      res.message = p4.statusText;
    } else {
      res.id = p4.esleId;
    }
  }
  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("ESERCITAZIONE VIEW");
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
