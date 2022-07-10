const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/ese/data_common";
import { rows, cols } from "../../../../data/ese/data_esercita";

import { getFunzioniForm } from "../../../../data/common";
import {
  getEsercitazioneLezione,
  getBreadEsercita,
  insertDomanda,
  deleteDomanda,
  getTipoDomandaCombo,
} from "../../../../data/ese/common";

async function getHandler(userLogin, pid, pidLezione) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_bread = await getBreadEsercita(userLogin.token, pidLezione, pid);
  const db_tipo = await getTipoDomandaCombo(userLogin.token);
  const data = {
    title: "Esercitazioni - Domande",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: rows,
    cols: cols,
    domanda_label: "Testo Domanda",
    tipo_label: "Tipologia Domanda",
    tipo: db_tipo,
    n_domanda_label: "Numero Domanda",
    pt_domanda_label: "Punteggio Domanda (%)",
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
  console.log(deleteData);
  let d1 = await deleteDomanda(userLogin.token, deleteData.key);
  // console.log(d1);
  const res = { status: 200, message: "Domanda eliminata" };
  return res;
}

async function postHandler(userLogin, postData, pid, pidGruppo) {
  console.log(postData);
  let poba = {
    doesSysuser: userLogin.userID,
    doesFkTidoId: postData.tipo.id,
    doesFkEserId: pid,
    doesTestoDomanda: postData.domanda,
    doesPercentualePunteggio: postData.punteggio,
    doesPathFile: "",
    doesNumeroDomanda: postData.numero,
    doesFkGrudId: pidGruppo == 0 ? null : pidGruppo,
    doesFkTifiId: 0,
  };
  console.log("########################################################");
  console.log(poba);
  let p3 = await insertDomanda(userLogin.token, poba);
  console.log(p3);

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

  console.log("DOMANDE");
  const pid = apic.getPid(req);

  let pidLezione = 0;
  let pidGruppo = 0;

  if (pid != 0) {
    pidLezione =
      req.query.length > 2
        ? apic.getParentPid(req, 2)
        : apic.getParentPid(req, 1);
    pidGruppo = req.query.length > 2 ? apic.getParentPid(req, 1) : 0;
  }
  console.log("pidLezione", pidLezione);
  console.log("pidGruppo", pidGruppo);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid, pidLezione);
      res.status(200).json(dataGet);
      break;
    case "POST":
      const dataPost = await postHandler(userLogin, req.body, pid, pidGruppo);
      res.status(dataPost.status).json(dataPost);
      break;
    case "DELETE":
      const dataDel = await deleteHandler(userLogin, req.body);
      res.status(dataDel.status).json(dataDel);
      break;
  }
}
