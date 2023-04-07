const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
import { getLogger } from "../../../../logging/log-util";
const logger = getLogger("monitor-notify");
import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import {
  getListIscrizioneStudente,
  insertNotifica,
  getGridIscrizioneStudente,
} from "../../../../data/moni/common";

import { getFunzioniForm, getRuoloUtente } from "../../../../data/common";

const colsgd = [
  {
    field: "col1",
    headerName: "Nome",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col2",
    headerName: "Cognome",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col17",
    headerName: "Tipo Studente",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col3",
    headerName: "Iscrizione",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col4",
    headerName: "Note",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col5",
    headerName: "CF",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col6",
    type: "date",
    headerName: "Data N.",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col7",
    headerName: "N Res.",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col8",
    headerName: "RG Res.",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col9",
    headerName: "PV Res.",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col10",
    headerName: "COM Res.",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col11",
    headerName: "IND. Res.",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col12",
    headerName: "N Dom.",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col13",
    headerName: "RG Dom.",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col14",
    headerName: "PV Dom.",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col15",
    headerName: "COM Dom.",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col16",
    headerName: "IND. Dom.",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
];

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Moni_Notify"
  );
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);

  const db_studenti = await getListIscrizioneStudente(userLogin.token, 0, 0, 0);
  const db_studentigd = await getGridIscrizioneStudente(
    userLogin.token,
    0,
    0,
    0
  );
  const data = {
    title: "Invio Notifiche",
    studenti_label: "Studenti",
    notifica_label: "Notifica",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    studenti: db_studenti,
    funzioni: db_funzioni,
    rows: db_studentigd,
    cols: colsgd,
  };
  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  logger.debug("[RICEVUTO NOTIFICA]");
  logger.trace(postData);

  for (let m of postData.notifyList) {
    const noti = {
      notiFkUtntMittente: userLogin.userID,
      notiFkUtntDestinatario: m,
      notiDataLettura: null,
      notiFkTinoTiponotifica: 3,
      notiTesto: postData.notifica,
      notiAppuFkStapIdNew: 2,
      notiAppuFkStapIdOld: 2,
    };

    logger.debug("[POST NOTIFICA]");
    logger.trace(noti);
    p3 = await insertNotifica(userLogin.token, noti);
    logger.debug(p3);

    if (p3.status) {
      res.status = p3.status;
      res.message = p3.statusText;
      return res;
    }
  }

  res.message = `Invio a ${postData.notifyList.length} studenti`;

  return res;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  logger.info(`API-CALL [MONITOR-NOTIFY]`);
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  const db_ruolo = await getRuoloUtente(userLogin.token, userLogin.userID, 0);
  logger.trace(db_ruolo);

  const my_ruolo = db_ruolo.length > 0 ? db_ruolo[0].idRuolo : 0;

  let idPersona = 0;
  if (db_ruolo.length > 0) {
    idPersona = db_ruolo[0].idPersona;
  }

  logger.debug(
    `API-DATA [MONITOR-NOTIFY] USER:[${userLogin.userID}] PERSONA-ID:[${idPersona}] RUOLO:[${my_ruolo}]`
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
  }
}
