const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { getFunzioniForm } from "../../../../data/common";

import {
  insertPianoStudi,
  deletePianoStudi,
  getProgrammaBaseNoAggrCombo,
  getPianoStudiIndividuale,
} from "../../../../data/gstu/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_pbase = await getProgrammaBaseNoAggrCombo(userLogin.token, 0);
  const db_piano = await getPianoStudiIndividuale(userLogin.token, pid);

  const data = {
    title: "Piano Studi",
    pbase_label: "Programma Base",
    pbase: db_pbase,
    classe_label: "Classe Argomento",
    argomento_label: "Argomento",
    lezione_label: "Lezioni",
    funzioni: db_funzioni,
    rows: db_piano,
  };
  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  console.log("************ RICEVUTO PIANO STUDI");
  console.log(postData);

  for (let m of postData.lezioni) {
    let pist = {
      pistFkIstuId: pid,
      pistFkLeziId: m.id,
      pistSysuser: userLogin.userID,
      pistFlagAttiva: 1,
    };
    console.log("************ POST PIANO STUDI");
    console.log(pist);
    p3 = await insertPianoStudi(userLogin.token, pist);
    console.log(p3);

    if (p3.status) {
      res.status = p3.status;
      res.message = p3.statusText;
    } else {
      res.id = p3.istuId;
      return res;
    }
  }
  return res;
}

async function deleteHandler(userLogin, deleteData) {
  console.log("deleteHandler");
  console.log(deleteData);
  let d1 = await deletePianoStudi(userLogin.token, deleteData.key);
  const res = { status: 200, message: "Lezione eliminata" };
  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("SERVIZI");
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
