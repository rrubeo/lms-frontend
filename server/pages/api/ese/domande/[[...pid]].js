const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/ese/data_common";
import { cols } from "../../../../data/ese/data_domande";

import { getFunzioniForm } from "../../../../data/common";
import {
  getBreadEsercita,
  insertDomanda,
  deleteDomanda,
  getTipoDomandaCombo,
  getGruppoDomandeCombo,
  getDomande,
} from "../../../../data/ese/common";

async function getHandler(
  userLogin,
  pid,
  pidLezione,
  pidGruppo,
  pidEsercitazione
) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_rows = await getDomande(
    userLogin.token,
    0,
    pidEsercitazione,
    pidGruppo
  );
  const db_bread = await getBreadEsercita(
    userLogin.token,
    pidLezione,
    pidEsercitazione
  );
  const db_tipo = await getTipoDomandaCombo(userLogin.token);
  const db_gruppo = await getGruppoDomandeCombo(
    userLogin.token,
    pidEsercitazione
  );

  const data = {
    title: "Esercitazioni - Domande",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_rows,
    cols: cols,
    domanda_label: "Testo Domanda",
    tipo_label: "Tipologia Domanda",
    tipo: db_tipo,
    gruppo_label: "Gruppo Domande",
    gruppo: db_gruppo,
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
  console.log("#################### deleteHandler #################");
  console.log(deleteData);
  let d1 = await deleteDomanda(userLogin.token, deleteData.key);
  const res = { status: 200, message: "Domanda eliminata" };
  return res;
}

async function postHandler(
  userLogin,
  postData,
  pid,
  pidGruppo,
  pidEsercitazione
) {
  console.log(postData);
  let poba = {
    doesId: postData.upid ? postData.upid : -1,
    doesSysuser: userLogin.userID,
    doesFkTidoId: postData.tipo.id,
    doesFkEserId: pidEsercitazione,
    doesTestoDomanda: postData.domanda,
    doesPercentualePunteggio: postData.punteggio,
    doesPathFile: "",
    doesNumeroDomanda: postData.numero,
    doesFkGrudId:
      pidGruppo == 0
        ? postData.gruppo.id == 0
          ? null
          : postData.gruppo.id
        : pidGruppo,
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
  let pidEsercitazione = 0;

  if (pid != 0) {
    pidLezione =
      req.query.pid.length > 2
        ? apic.getParentPid(req, 2)
        : apic.getParentPid(req, 1);
    pidGruppo = req.query.pid.length > 2 ? apic.getParentPid(req, 0) : 0;
    pidEsercitazione =
      req.query.pid.length > 2
        ? apic.getParentPid(req, 1)
        : apic.getParentPid(req, 0);
  }
  console.log("pidLezione", pidLezione);
  console.log("pidEsercitazione", pidEsercitazione);
  console.log("pidGruppo", pidGruppo);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(
        userLogin,
        pid,
        pidLezione,
        pidGruppo,
        pidEsercitazione
      );
      res.status(200).json(dataGet);
      break;
    case "POST":
      const dataPost = await postHandler(
        userLogin,
        req.body,
        pid,
        pidGruppo,
        pidEsercitazione
      );
      res.status(dataPost.status).json(dataPost);
      break;
    case "DELETE":
      const dataDel = await deleteHandler(userLogin, req.body);
      res.status(dataDel.status).json(dataDel);
      break;
  }
}
