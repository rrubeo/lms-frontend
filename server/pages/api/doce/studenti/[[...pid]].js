const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
import { getLogger } from "../../../../logging/log-util";
const logger = getLogger("doce-studenti");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";

import {
  getFunzioniForm,
  getPersona,
  getRuoloUtente,
} from "../../../../data/common";
import { getStudenteDocente } from "../../../../data/doce/common";

const cols_studenti = [
  {
    field: "col1",
    headerName: "Materia",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
  },
  {
    field: "col2",
    headerName: "Anno Frequenza",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
  },
  { field: "col3", headerName: "Istituto", flex: 1, minWidth: 50 },
  {
    field: "col4",
    headerName: "Indirizzo",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
  },
  {
    field: "col5",
    headerName: "Anno Accademico",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
  },
  { field: "col6", headerName: "Studente", flex: 1, minWidth: 50 },
  {
    field: "col7",
    type: "number",
    align: "right",
    headerName: "Avanzamento Corso",
    flex: 1,
    minWidth: 50,
    maxWidth: 120,
  },
];

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Tutor_Studenti"
  );
  const db_rows = await getStudenteDocente(
    userLogin.token,
    0,
    userLogin.userID,
    0
  );
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);

  const data = {
    title: "I miei studenti",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_rows,
    cols: cols_studenti,
    funzioni: db_funzioni,
  };
  return data;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  logger.info(`API-CALL [STUDENTI DOCENTE]`);
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
    `API-DATA [STUDENTI DOCENTE] USER:[${userLogin.userID}] PERSONA-ID:[${pid}] RUOLO:[${my_ruolo}]`
  );

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
