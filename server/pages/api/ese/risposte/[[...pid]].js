const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/ese/data_common";
import { cols } from "../../../../data/ese/data_risposte";

import { getFunzioniForm } from "../../../../data/common";
import {
  getBreadEsercita,
  insertRisposta,
  deleteRisposta,
  getRisposte,
  getTipoRispostaCombo,
  getDomande,
} from "../../../../data/ese/common";

async function getHandler(
  userLogin,
  pid,
  pidEsercitazione,
  pidGruppo,
  pidLezione
) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const db_rows = await getRisposte(userLogin.token, pid, 0, 0, 0);
  const db_tipo = await getTipoRispostaCombo(userLogin.token);
  const db_domanda = await getDomande(
    userLogin.token,
    pid,
    pidEsercitazione,
    pidGruppo
  );
  const db_bread = await getBreadEsercita(
    userLogin.token,
    pidLezione,
    pidEsercitazione
  );

  const data = {
    title: "Esercitazioni - Risposte",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_rows,
    cols: cols,
    n_domanda_label: "Numero Risposta",
    tipo_label: "Risposta Corretta",
    tipo: db_tipo,
    domanda_label: "Domanda",
    domanda: db_domanda,
    testo_gruppo_label: "Testo Risposta",
    back_label: tornaIndietro,
    stepper: stepper,
    funzioni: db_funzioni,
    bread: db_bread,
  };
  return data;
}

async function deleteHandler(userLogin, deleteData) {
  // console.log("#################### deleteHandler #################");
  // console.log(deleteData);
  let d1 = await deleteRisposta(userLogin.token, deleteData.key);
  console.log(d1);
  const res = { status: 200, message: "Risposta eliminata" };
  return res;
}

async function postHandler(userLogin, postData, pid) {
  console.log(postData);
  let poba = {
    ridoId: postData.upid ? postData.upid : -1,
    ridoFkDoesId: pid,
    ridoSysuser: userLogin.userID,
    ridoTestoRisposta: postData.risposta,
    ridoFlagRispostaCorretta: postData.tipo.id == 1 ? 1 : 0,
    ridoNumeroRisposta: postData.numero,
  };
  // console.log("########################################################");
  // console.log(poba);
  let p3 = await insertRisposta(userLogin.token, poba);
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

  console.log("RISPOSTE");
  const pid = apic.getPid(req);

  let pidLezione = 0;
  let pidGruppo = 0;
  let pidEsercitazione = 0;
  let pidDomanda = 0;

  if (pid != 0) {
    pidLezione =
      req.query.pid.length > 3
        ? apic.getParentPid(req, 3)
        : apic.getParentPid(req, 2);
    pidGruppo = req.query.pid.length > 3 ? apic.getParentPid(req, 1) : 0;
    pidEsercitazione =
      req.query.pid.length > 3
        ? apic.getParentPid(req, 2)
        : apic.getParentPid(req, 1);
    pidDomanda = apic.getParentPid(req, 0);
  }
  console.log("pidLezione", pidLezione);
  console.log("pidEsercitazione", pidEsercitazione);
  console.log("pidGruppo", pidGruppo);
  console.log("pidDomanda", pidDomanda);

  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(
        userLogin,
        pid,
        pidEsercitazione,
        pidGruppo,
        pidLezione
      );
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
