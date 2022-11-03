const utils = require("../../lib/utils");

import {
  GetIscrizioneStudente,
  GetLezioni,
  GetLezioniSeguite,
  GetDocentiAula,
  GetTutorAula,
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
  console.log("getIscrizioneStudente");
  // console.log(f);
  if (f.status) return [];
  const data = f[0];
  return data;
};

const getIscrizioneStudenteMulti = async (token, username) => {
  const f = await utils.getFetch(token, GetIscrizioneStudente(username));
  console.log("getIscrizioneStudenteMulti");
  // console.log(f);
  if (f.status) return [];
  const data = f.map((x) => {
    x.id = x.idIscrizione;
    x.text = x.iscrizione;
    return x;
  });
  console.log(data);
  return data;
};

const getLezioni = async (token, username, classeArgomento) => {
  const f = await utils.getFetch(token, GetLezioni(username, classeArgomento));
  console.log("getLezioni");
  // console.log(f);
  if (f.status) return [];
  const data = f;
  return data;
};

const getLezioniSeguite = async (token, username, idIscrizione, maxNumber) => {
  const f = await utils.getFetch(
    token,
    GetLezioniSeguite(username, idIscrizione, maxNumber)
  );
  console.log("getLezioniSeguite");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idLezione,
      name: x.lezione,
    };
  });
  return data;
};

const getDocentiAula = async (token, idRuolo, idIscrizione, username) => {
  const f = await utils.getFetch(
    token,
    GetDocentiAula(idRuolo, idIscrizione, username)
  );
  console.log("getDocentiAula");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x, index) => {
    return {
      id: x.userNameDocenteTutor,
      name: x.nomeDocenteTutor,
      surname: x.cognomeDocenteTutor,
      username: x.userNameDocenteTutor,
      subject: x.materia,
      roleId: x.idRuolo,
      imagePath: x.pathImmagineDocenteTutor,
      text: `${x.materia} - ${x.nomeDocenteTutor} ${x.cognomeDocenteTutor}`,
    };
  });
  return data;
};

const getTutorAula = async (token, idRuolo, idIscrizione, username) => {
  const f = await utils.getFetch(
    token,
    GetTutorAula(idRuolo, idIscrizione, username)
  );
  console.log("getTutorAula");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x, index) => {
    return {
      id: x.userNameDocenteTutor,
      name: x.nomeDocenteTutor,
      surname: x.cognomeDocenteTutor,
      username: x.userNameDocenteTutor,
      roleId: x.idRuolo,
      imagePath: x.pathImmagineDocenteTutor,
      text: `${x.nomeDocenteTutor} ${x.cognomeDocenteTutor}`,
    };
  });
  return data;
};

const getLezione = async (token, idLezione) => {
  const f = await utils.getFetch(token, GetLezione(idLezione));
  console.log("getLezione");
  // console.log(f);
  if (f.status) return [];
  const data = f;
  return data;
};

const getPDF = async (token, idContenuto) => {
  const f = await utils.getFetch(token, GetPDF(idContenuto));
  console.log("getPDF");
  // console.log(f);
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
  console.log("getDisponibilitaCalendario");
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
  console.log("getDisponibilitaCalendarioTutor");
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
  console.log("getStudenteDocente");
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
  console.log("getDisponibilitaCrediti");
  // console.log(f);
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
