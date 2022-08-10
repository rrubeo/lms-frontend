const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { rows, cols } from "../../../../data/ar/data_ruoli";

import { getFunzioniForm, getYesNoCombo } from "../../../../data/common";
import {
  getRuoliPersona,
  getUtente,
  getRuoliCombo,
  getValidaUserName,
  insertRuoloUtente,
  deleteRuoloUtente,
  insertUtente,
  deleteUtente,
  getUserName,
} from "../../../../data/ar/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_utente = await getUtente(userLogin.token, pid);
  const db_ruoli = await getRuoliCombo(userLogin.token);
  const db_rows = await getRuoliPersona(userLogin.token, pid);

  const data = {
    title: "Assegna Ruolo",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    userName_label: "Username",
    ruoli_label: "Ruoli",
    ruoli: db_ruoli,
    rows: db_rows,
    utente: db_utente,
    cols: cols,
    funzioni: db_funzioni,
  };

  return data;
}

async function postHandler(userLogin, postData, pid) {
  console.log(postData);
  let res = { status: 200, message: "OK" };
  let username = postData.username.trim();

  const validUser = await getValidaUserName(userLogin.token, username);

  if (validUser.length > 0) {
    username = validUser[0].utente;
    console.log("************ USER NAME ESISTENTE", username);
    const utnt_data = await getUserName(userLogin.token, username);
    console.log(utnt_data);
  } else {
    console.log("************ NUOVA USER NAME", username);

    const db_utente = await getUtente(userLogin.token, pid);
    if (db_utente.length > 0) {
      const oldUserName = db_utente[0].userName;
      console.log("************ ATTUALE DA GET_UTENTE", oldUserName);
      if (oldUserName) {
        console.log("************ VALIDA", oldUserName);
      } else {
        let utnt = {
          utntUserName: username,
          utntFkPersId: pid,
          utntFkStabId: 1,
          utntNickName: db_utente[0].nome,
          utntPathImmagine: "string",
          utntPasswordHash: db_utente[0].mail,
          utntFlagResetPassword: 0,
          utntSysuser: userLogin.userID,
          utntFlagAttiva: 1,
        };
        console.log(utnt);
        console.log("************ CREATO", username);
        let p3 = await insertUtente(userLogin.token, utnt);
        console.log(p3);
        if (p3.status) {
          res.status = p3.status;
          res.message = p3.statusText;
          return res;
        }
      }
    }
  }

  for (let m of postData.ruoli) {
    let poba = {
      ruutFkUtntUserName: username,
      ruutFkRuolId: m.id,
      // ruutDataAbilitazione: "2022-08-05T15:42:06.762Z",
      // ruutDataDisabilitazione: "2022-08-05T15:42:06.762Z",
      ruutSysuser: userLogin.userID,
      ruutFlagAttiva: 1,
    };
    // console.log(poba);
    let p3 = await insertRuoloUtente(userLogin.token, poba);
    console.log(p3);
    if (p3.status) {
      res.status = p3.status;
      res.message = p3.statusText;
      return res;
    }
  }
  return res;
}

async function deleteHandler(userLogin, deleteData) {
  console.log("deleteHandler");
  console.log(deleteData);
  let d1 = await deleteRuoloUtente(userLogin.token, deleteData.key);
  const res = { status: 200, message: "Ruolo disattivato" };
  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("ASSEGNA RUOLO");
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
