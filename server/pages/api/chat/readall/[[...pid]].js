const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
import { getLogger } from "../../../../logging/log-util";
const logger = getLogger("chat-readall");

import {
  getFunzioniForm,
  getRuoloUtente,
  getAppuntamentiConfermati,
  getRubricaTalk,
  getRubricaJanus,
  getPersoneChat,
  getElencoChat,
  insChatMessage,
  insLetturaMessage,
} from "../../../../data/common";

async function postHandler(userLogin, postData, idPersona, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  logger.debug("[RICEVUTO NOTIFICA LETTURA]");
  logger.trace(postData);

  const db_chat = await getElencoChat(
    userLogin.token,
    postData.IdM.id,
    postData.IdD.id
  );

  // logger.debug(db_chat);
  // logger.debug(m);

  p3 = await insLetturaMessage(
    userLogin.token,
    postData.IdM.id,
    postData.IdD.id
  );
  logger.debug(
    `[LETTURA MESSAGGIO] DESTINATARIO:[${postData.IdD.id}] MITTENTE:[${postData.IdM.id}]`
  );
  logger.debug(p3);

  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    res.message = "Send";
  }
  return res;
}

export default async function handler(req, res) {
  await utils.cors(req, res);

  logger.info(`API-CALL [READALL]`);
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
    `API-DATA [READALL] USER:[${userLogin.userID}] PERSONA-ID:[${idPersona}] RUOLO:[${my_ruolo}]`
  );

  switch (req.method) {
    case "POST":
      const dataPost = await postHandler(userLogin, req.body, idPersona, pid);
      res.status(dataPost.status).json(dataPost);
      break;
  }
}
