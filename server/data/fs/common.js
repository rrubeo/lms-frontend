import {
  UserAuthenticate,
  GetFunzioniForm,
  GetIscrizioneStudente,
  GetLezioni,
  GetLezioniSeguite,
  GetDocentiAula,
  GetTutorAula,
  GetLezione
} from "../../data/fs/config";

const utils = require("../../lib/utils");

const getToken = async (user, password) => {
  const c = {
    utntUserName: user,
    utntPasswordHash: password,
  };

  const data = await utils.getToken(UserAuthenticate, c);
  // console.log(data);
  return data;
};


const getFunzioniForm = async (token, user, formName) => {
  const f = await utils.getFetch(token, GetFunzioniForm(user, formName));

  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idFunzione,
      funzione: x.funzione,
      form: x.form,
    };
  });
  return data;
};


const deleteObjectURL = async (token, url) => {
  const f = await utils.deleteFetch(token, url);
  console.log("delete-" + url);
  // console.log(f);
  if (f.status) return [];
  return f;
};


const getIscrizioneStudente = async (token, username) => {
  const f = await utils.getFetch(token, GetIscrizioneStudente(username));

  if (f.status) return [];
  const data = f[0];
  return data;
};


const getLezioni = async (token, username, classeArgomento) => {
  const f = await utils.getFetch(token, GetLezioni(username, classeArgomento));

  if (f.status) return [];
  const data = f;
  return data;
};


const getLezioniSeguite = async (token, username, idIscrizione, maxNumber) => {
  const f = await utils.getFetch(token, GetLezioniSeguite(username, idIscrizione, maxNumber));

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
  const f = await utils.getFetch(token, GetDocentiAula(idRuolo, idIscrizione, username));

  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idMateria,
      name: x.nomeDocenteTutor,
      surname: x.cognomeDocenteTutor,
      subject: x.materia,
      roleId: x.idRuolo,
      imagePath: x.pathImmagineDocenteTutor
    };
  });
  return data;
};


const getTutorAula = async (token, idRuolo, idIscrizione, username) => {
  const f = await utils.getFetch(token, GetTutorAula(idRuolo, idIscrizione, username));

  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idMateria,
      name: x.nomeDocenteTutor,
      surname: x.cognomeDocenteTutor,
      roleId: x.idRuolo,
      imagePath: x.pathImmagineDocenteTutor
    };
  });
  return data;
};

const getLezione = async (token, idLezione) => {
  const f = await utils.getFetch(token, GetLezione(idLezione));

  if (f.status) return [];
  const data = f;
  return data;
};


module.exports = {
  getToken,
  getFunzioniForm,
  getIscrizioneStudente,
  getLezioni,
  getLezioniSeguite,
  getDocentiAula,
  getTutorAula,
  getLezione
};
