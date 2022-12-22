const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
import { getLogger } from "../../../../logging/log-util";
const logger = getLogger("conversation");

import {
  getFunzioniForm,
  getRuoloUtente,
  getAppuntamentiConfermati,
  getRubricaTalk,
  getRubricaJanus,
  getPersoneChat,
  getElencoChat,
  insChatMessage,
} from "../../../../data/common";

async function getHandler(userLogin, idPersona, pid) {
  const db_chat = await getElencoChat(userLogin.token, idPersona, pid);

  const data = {
    chat: db_chat,
  };

  return data;
}

async function postHandler(userLogin, postData, idPersona, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  logger.debug("[RICEVUTO MESSAGGIO]");
  logger.trace(postData);

  const msgchat = {
    chatFkPersIdMittente: postData.chatFkPersIdMittente,
    chatFkPersIdDestinatario: postData.chatFkPersIdDestinatario,
    chatDataInvio: postData.chatDataInvio,
    chatTesto: postData.chatTesto,
    chatDataLettura: null,
  };

  logger.debug("[POST MESSAGGIO]");
  logger.trace(msgchat);
  p3 = await insChatMessage(userLogin.token, msgchat);
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

  logger.info(`API-CALL [CONVERSATION]`);
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
    `API-DATA [CONVERSATION] USER:[${userLogin.userID}] PERSONA-ID:[${idPersona}] RUOLO:[${my_ruolo}]`
  );

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, idPersona, pid);
      res.status(200).json(dataGet);
      break;
    case "POST":
      const dataPost = await postHandler(userLogin, req.body, idPersona, pid);
      res.status(dataPost.status).json(dataPost);
      break;
  }
}
