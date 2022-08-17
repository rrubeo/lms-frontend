const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { cols_pagamenti } from "../../../../data/gstu/data_studenti";

import { getFunzioniForm } from "../../../../data/common";

import {
  getPagamentoStudente,
  insertPagamento,
  deletePagamento,
} from "../../../../data/gstu/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_pagamenti = await getPagamentoStudente(userLogin.token, pid);

  const data = {
    title: "Pagamenti",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    funzioni: db_funzioni,
    importo_label: "Importo Pagato",
    pagato_label: "Data Pagamento",
    cols: cols_pagamenti,
    rows: db_pagamenti,
  };
  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  console.log("************ RICEVUTO PAGAMENTO");
  console.log(postData);

  let past = {
    // pastId: 0,
    pastFkIstuId: pid,
    pastDataPagamento: postData.pagamento,
    pastImportoPagato: postData.importo,
    pastDataScadenza: null,
    pastImportoRata: null,
    pastSysuser: userLogin.userID,
    pastFlagAttiva: 1,
    pastFkMopaId: null,
  };

  console.log("************ POST PAGAMENTO");
  console.log(past);
  p3 = await insertPagamento(userLogin.token, past);

  console.log(p3);

  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    res.id = p3.istuId;
  }

  return res;
}
export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("PAGAMENTI");
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
  }
}
