const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import { cols } from "../../../../data/ar/data_ruoli";

import { getFunzioniForm } from "../../../../data/common";
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

  let db_utente = await getUtente(userLogin.token, pid);
  const db_ruoli = await getRuoliCombo(userLogin.token);
  const db_rows = await getRuoliPersona(userLogin.token, pid);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);

  if (!db_utente[0].attivo) {
    db_utente[0].provvisoria = db_utente[0].mail;
  }
  // console.log(db_utente);
  const data = {
    title: "Assegna Ruolo",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    back_label: "Torna indietro",
    userName_label: "Username",
    pwd_label: "Password Provvisoria",
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
  // console.log(postData);
  let res = { status: 200, message: "OK" };
  let p3 = {};
  let username = postData.username.trim();
  let provvisoria = postData.provvisoria.trim();

  const validUser = await getValidaUserName(userLogin.token, username);

  if (validUser.length > 0) {
    username = validUser[0].utente;
    console.log("************ USER NAME ESISTENTE", username);
    const utnt_data = await getUserName(userLogin.token, username);
    // console.log(utnt_data);
    if (!utnt_data.utntFlagAttiva) {
      console.log("************ NON ATTIVO", username);
      utnt_data.utntFlagAttiva = 1;
      utnt_data.utntPasswordHash = provvisoria;
      utnt_data.utntFlagResetPassword = 1;
      utnt_data.utntDataAbilitazione = new Date();
      console.log(utnt_data);
      p3 = await insertUtente(userLogin.token, utnt_data);
      console.log(p3);
      if (p3.status) {
        res.status = p3.status;
        res.message = p3.statusText;
        return res;
      }
    }
  } else {
    console.log("************ NUOVA USER NAME", username);

    if (provvisoria == "") {
      res.message = "Inserire una password provvisoria";
      return res;
    }

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
          utntPasswordHash: provvisoria,
          utntFlagResetPassword: 1,
          utntSysuser: userLogin.userID,
          utntFlagAttiva: 1,
          utntDataAbilitazione: new Date(),
        };
        console.log(utnt);
        console.log("************ CREATO", username);
        p3 = await insertUtente(userLogin.token, utnt);
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
  let res = { status: 500, message: "Seleziona Action" };
  console.log("deleteHandler");
  console.log(deleteData);

  switch (deleteData.action) {
    case "DISABLEUSER":
      let d2 = await deleteUtente(userLogin.token, deleteData.key);
      console.log(d2);
      res = { status: 200, message: "Utente disattivato" };
      break;
    case "DISABLEROLE":
      let d1 = await deleteRuoloUtente(userLogin.token, deleteData.key);
      console.log(d1);
      res = { status: 200, message: "Ruolo disattivato" };
      break;
  }

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
