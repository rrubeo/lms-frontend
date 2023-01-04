const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
import { getLogger } from "../../../../logging/log-util";
const logger = getLogger("doce-materie");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import { cols_materie } from "../../../../data/doce/data_docenti";

import {
  getFunzioniForm,
  getPersona,
  getRuoloUtente,
} from "../../../../data/common";
import {
  getDocenteMateria,
  insertDocenteMateria,
  deleteDocenteMateria,
  getMateriaScolasticaCombo,
} from "../../../../data/doce/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_persona = await getPersona(userLogin.token, pid);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const db_rows = await getDocenteMateria(userLogin.token, pid);
  const db_materie = await getMateriaScolasticaCombo(userLogin.token);
  const data = {
    title: `Docente ${db_persona.persNome} ${db_persona.persCognome}`,
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    back_label: "Torna indietro",
    rows: db_rows,
    cols: cols_materie,
    docente: db_persona,
    materie_label: "Materie",
    materie: db_materie,
    funzioni: db_funzioni,
  };
  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  logger.debug("[RICEVUTA MATERIA]");
  logger.trace(postData);

  for (let m of postData.materie) {
    let doma = {
      domaSysuser: userLogin.userID,
      domaFlagAttiva: 1,
      persId: pid,
      domaFkMascId: m.id,
    };

    logger.debug("[POST MATERIA]");
    logger.trace(doma);
    p3 = await insertDocenteMateria(userLogin.token, doma);
    logger.debug(p3);

    if (p3.status) {
      res.status = p3.status;
      res.message = p3.statusText;
    } else {
      res.id = p3.istuId;
    }
  }

  return res;
}

async function deleteHandler(userLogin, deleteData) {
  // console.log("deleteHandler");
  // console.log(deleteData);
  let d1 = await deleteDocenteMateria(userLogin.token, deleteData.key);
  // console.log(d1);
  const res = { status: 200, message: "Materia eliminata" };
  return res;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  logger.info(`API-CALL [MATERIE DOCENTI]`);
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
    `API-DATA [MATERIE DOCENTI] USER:[${userLogin.userID}] PERSONA-ID:[${pid}] RUOLO:[${my_ruolo}]`
  );

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
