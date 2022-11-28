const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
import { getLogger } from "../../../../logging/log-util";
const logger = getLogger("doce-orario");
import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import { cols } from "../../../../data/doce/data_docenti";

import {
  getDisponibilitaOrarie,
  setDisponibilitaOrarie,
} from "../../../../data/doce/common";
import {
  getFunzioniForm,
  getPersona,
  getRuoloUtente,
} from "../../../../data/common";

async function getHandler(userLogin, pid, my_ruolo) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_persona = await getPersona(userLogin.token, pid);
  const db_orario = await getDisponibilitaOrarie(userLogin.token, pid);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const data = {
    title: `Piano Orario ${db_persona.persNome} ${db_persona.persCognome}`,
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    back_label: "Torna indietro",
    back_visible: my_ruolo == 5 ? false : true,
    rows: db_orario,
    cols: cols,
    docente: db_persona,
    funzioni: db_funzioni,
  };
  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  logger.debug("[RICEVUTO PIANO ORARIO]");
  logger.trace(postData);
  let gise = 1;
  let newPiano = [];
  for (let m of postData.orario) {
    let newGise = {
      gisE_ID: gise,
      faor: [],
    };

    let newOra = 1;
    let newFaor = {};
    for (let ora of m) {
      // console.log(ora);
      newFaor["v" + newOra] = ora ? 1 : 0;
      newOra++;
    }
    // console.log(newFaor);
    newGise.faor.push(newFaor);
    newPiano.push(newGise);
    gise++;
  }

  logger.debug("[POST PIANO ORARIO]");
  logger.trace(newPiano);
  p3 = await setDisponibilitaOrarie(userLogin.token, pid, newPiano);
  logger.debug(p3);

  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    process.env.NODE_ENV === "production"
      ? (res.message = "OK")
      : (res.message = p3.errDesc);
  }

  return res;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  logger.info(`API-CALL [GESTIONE ORARIO DOCENTI]`);
  let pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);
  const db_ruolo = await getRuoloUtente(userLogin.token, userLogin.userID, 0);
  logger.trace(db_ruolo);

  const my_ruolo = db_ruolo.length > 0 ? db_ruolo[0].idRuolo : 0;

  if (pid == 0) {
    if (db_ruolo.length > 0) {
      pid = db_ruolo[0].idPersona;
    }
  }

  logger.debug(
    `API-DATA [GESTIONE ORARIO DOCENTI] USER:[${userLogin.userID}] PERSONA-ID:[${pid}] RUOLO:[${my_ruolo}]`
  );

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid, my_ruolo);
      res.status(200).json(dataGet);
      break;
    case "POST":
      const dataPost = await postHandler(userLogin, req.body, pid);
      res.status(dataPost.status).json(dataPost);
      break;
  }
}
