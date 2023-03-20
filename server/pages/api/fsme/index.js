const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");
import { getLogger } from "../../../logging/log-util";
const logger = getLogger("fsme");
import {
  navmenustudenti,
  usermenu,
  getSideUserMenu,
} from "../../../data/data_sidemenu";
import { getFunzioniForm, getPersonaByUserName } from "../../../data/common";
import {
  getIscrizioneStudenteMulti,
  getLezioni,
  getLezioniSeguite,
} from "../../../data/fs/common";

async function getHandler(userLogin, pid) {
  // userLogin.userID = "Cristiano.Iacovo";

  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_Studente_Home"
  );

  const db_persona = await getPersonaByUserName(
    userLogin.token,
    userLogin.userID
  );

  const iscrizione = await getIscrizioneStudenteMulti(
    userLogin.token,
    userLogin.userID
  );

  let profilo = { idIscrizione: 0 };
  if (iscrizione.length > 0) {
    profilo = iscrizione[0];
  }

  let materie = [
    {
      lezioniStudenteAnno: { descr: "Iscrizione" },
      lezioniStudenteMATERIA1: [],
    },
  ];

  const db_lezioni = await getLezioni(userLogin.token, userLogin.userID, 0);
  if (db_lezioni.length > 0) {
    // materie = db_lezioni[0];
    materie = db_lezioni;
  }

  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);

  const recentLessons = await getLezioniSeguite(
    userLogin.token,
    userLogin.userID,
    profilo.idIscrizione,
    0
  );

  const data = {
    title: "Home Studenti",
    label_corsi: "Corsi attivi",
    label_ultime: "Ultime lezioni viste",
    label_avanzamento: "Avanzamento Corso",
    menu: db_menu,
    navmenu: navmenustudenti,
    usermenu: usermenu,
    funzioni: db_funzioni,
    iscrizione: iscrizione,
    profilo: profilo,
    materie: materie,
    lezioniViste: recentLessons,
    persona: db_persona,
  };

  return data;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  logger.info(`API-CALL [STUDENTE]`);
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);
  logger.debug(
    `API-DATA [STUDENTE] USER:[${userLogin.userID}] USERNAME:[${pid}]`
  );

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
