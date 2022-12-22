const utils = require("../../lib/utils");
import { getLogger } from "../../logging/log-util";
const logger = getLogger("fs");
import {
  GetIscrizioneStudente,
  GetLezioni,
  GetLezioniSeguite,
  GetLezione,
  GetPDF,
  GetDisponibilitaCrediti,
  GetDisponibilitaCalendario,
  GetStudenteDocente,
  GetStudTutor,
  AppuAppuntamentiDats,
  GetDisponibilitaCalendarioTutor,
} from "../../data/fs/config";

const getIscrizioneStudente = async (token, username) => {
  const f = await utils.getFetch(token, GetIscrizioneStudente(username));
  logger.debug("[getIscrizioneStudente]");
  logger.trace(f);
  if (f.status) return [];
  const data = f[0];
  return data;
};

const getIscrizioneStudenteMulti = async (token, username) => {
  const f = await utils.getFetch(token, GetIscrizioneStudente(username));
  logger.debug("[getIscrizioneStudenteMulti]");
  logger.trace(f);
  if (f.status) return [];
  const data = f.map((x) => {
    x.id = x.idIscrizione;
    x.text = x.iscrizione;
    return x;
  });
  // logger.debug(data);
  return data;
};

const getLezioni = async (token, username, classeArgomento) => {
  const f = await utils.getFetch(token, GetLezioni(username, classeArgomento));
  logger.debug("[getLezioni]");
  // logger.trace(f);
  if (f.status) return [];
  const data = f;
  return data;
};

const getLezioniSeguite = async (token, username, idIscrizione, maxNumber) => {
  const f = await utils.getFetch(
    token,
    GetLezioniSeguite(username, idIscrizione, maxNumber)
  );
  logger.debug("[getLezioniSeguite]");
  logger.trace(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idLezione,
      name: x.lezione,
      text: x.lezione,
    };
  });
  return data;
};

const getDocentiAula = async (
  token,
  IdIscrizione,
  UserNameDocente,
  IdPersona
) => {
  const f = await utils.getFetch(
    token,
    GetStudenteDocente(IdIscrizione, UserNameDocente, IdPersona)
  );
  logger.debug("[getDocentiAula]");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x, index) => {
    return {
      id: x.userNameDocente,
      name: x.nomeDocente,
      surname: x.cognomeDocente,
      username: x.userNameDocente,
      subject: x.materia,
      imagePath: x.pathImmagineDocenteTutor,
      text: `${x.materia} - ${x.nomeDocente} ${x.cognomeDocente}`,
    };
  });
  return data;
};

const getTutorAula = async (token, idRuolo, idIscrizione, username) => {
  const f = await utils.getFetch(
    token,
    GetStudTutor(idRuolo, idIscrizione, username)
  );
  logger.debug("[getTutorAula]");
  logger.trace(f);
  if (f.status) return [];

  const data = f.map((x, index) => {
    return {
      id: x.userNameTutor,
      name: x.nomeTutor,
      surname: x.cognomeTutor,
      username: x.userNameTutor,
      imagePath: x.pathImmagineDocenteTutor,
      text: `${x.nomeTutor} ${x.cognomeTutor}`,
    };
  });
  return data;
};

const getLezione = async (token, idLezione) => {
  const f = await utils.getFetch(token, GetLezione(idLezione));
  logger.debug("[getLezione]");
  logger.trace(f);
  if (f.status) return [];
  const data = f;
  return data;
};

const getPDF = async (token, idContenuto) => {
  const f = await utils.getFetch(token, GetPDF(idContenuto));
  logger.debug("[getPDF]");
  logger.trace(f);
  if (f.status) return [];
  const data = f;
  return data;
};

const getDisponibilitaCalendario = async (
  token,
  usernameDocente,
  date,
  numeroGiorniCalendario,
  idIscrizione,
  idIscrizioneAppuntamento,
  idDocenteStudente
) => {
  const f = await utils.getFetch(
    token,
    GetDisponibilitaCalendario(
      usernameDocente,
      date,
      numeroGiorniCalendario,
      idIscrizione,
      idIscrizioneAppuntamento,
      idDocenteStudente
    )
  );
  logger.debug("[getDisponibilitaCalendario]");
  // console.log(f);
  if (f.status) return [];
  //TODO: verificare mapping
  /*
  const data = f.map((x) => {
    return {
      id: x.idMateria,
      name: x.nomeDocenteTutor,
      surname: x.cognomeDocenteTutor,
      roleId: x.idRuolo,
      imagePath: x.pathImmagineDocenteTutor,
    };
  });
*/
  const data = f;

  return data;
};

const getDisponibilitaCalendarioTutor = async (
  token,
  usernameDocente,
  date,
  numeroGiorniCalendario,
  idIscrizione,
  idIscrizioneAppuntamento,
  idDocenteStudente
) => {
  const f = await utils.getFetch(
    token,
    GetDisponibilitaCalendarioTutor(
      usernameDocente,
      date,
      numeroGiorniCalendario,
      idIscrizione,
      idIscrizioneAppuntamento,
      idDocenteStudente
    )
  );
  logger.debug("[getDisponibilitaCalendarioTutor]");
  if (f.status) return [];
  return f;
};

const getStudenteDocente = async (
  token,
  IdIscrizione,
  UserNameDocente,
  IdPersona
) => {
  const f = await utils.getFetch(
    token,
    GetStudenteDocente(IdIscrizione, UserNameDocente, IdPersona)
  );
  logger.debug("[getStudenteDocente]");
  // console.log(f);
  if (f.status) return [];
  const data = f;
  return data;
};

const getDisponibilitaCrediti = async (
  token,
  IdIscrizione,
  NumMinimoMinuti,
  NumMaxMinuti
) => {
  const f = await utils.getFetch(
    token,
    GetDisponibilitaCrediti(IdIscrizione, NumMinimoMinuti, NumMaxMinuti)
  );
  logger.debug("[getDisponibilitaCrediti]");
  logger.trace(f);
  if (f.status) return [];
  return f;
};

const getStudenteTutor = async (
  token,
  IdIscrizioneStudente,
  UserNameTutor,
  IdRuoloUtente
) => {
  const f = await utils.getFetch(
    token,
    GetStudTutor(IdIscrizioneStudente, UserNameTutor, IdRuoloUtente)
  );
  console.log("getStudenteTutor");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x, index) => {
    return {
      nome: x.nomeTutor,
      cognome: x.cognomeTutor,
    };
  });

  return data;
};

const insertAppuntamento = async (token, body) => {
  let res = await utils.postFetch(token, AppuAppuntamentiDats, body);
  return res;
};

module.exports = {
  getIscrizioneStudente,
  getLezioni,
  getLezioniSeguite,
  getDocentiAula,
  getTutorAula,
  getLezione,
  getPDF,
  getIscrizioneStudenteMulti,
  getDisponibilitaCrediti,
  getDisponibilitaCalendario,
  getDisponibilitaCalendarioTutor,
  getStudenteDocente,
  getStudenteTutor,
  insertAppuntamento,
};
