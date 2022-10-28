import {
  UserAuthenticate,
  GetFunzioniForm,
  GetIscrizioneStudente,
  GetLezioni,
  GetLezioniSeguite,
  GetDocentiAula,
  GetTutorAula,
  GetLezione,
  GetPDF,
  GetDisponibilitaCrediti,
  GetDisponibilitaCalendario 
} from "../../data/fs/config";

const utils = require("../../lib/utils");

const deleteObjectURL = async (token, url) => {
  const f = await utils.deleteFetch(token, url);
  console.log("ELIMINA!!");
  console.log("delete-" + url);
  // console.log(f);
  if (f.status) return [];
  return f;
};

const getIscrizioneStudente = async (token, username) => {
  const f = await utils.getFetch(token, GetIscrizioneStudente(username));
  console.log("getIscrizioneStudente");
  console.log(f);
  if (f.status) return [];
  const data = f[0];
  return data;
};

const getIscrizioneStudenteMulti = async (token, username) => {
  const f = await utils.getFetch(token, GetIscrizioneStudente(username));
  console.log("getIscrizioneStudente");
  console.log(f);
  if (f.status) return [];
  const data = f.map((x) => {
    x.id = x.idIscrizione;
    x.text = x.iscrizione;
    return x;
  });
  return data;
};

const getLezioni = async (token, username, classeArgomento) => {
  const f = await utils.getFetch(token, GetLezioni(username, classeArgomento));
  console.log("getLezioni");
  console.log(f);
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
  console.log(f);
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
  console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idMateria,
      name: x.nomeDocenteTutor,
      surname: x.cognomeDocenteTutor,
      username: x.userNameDocenteTutor,
      subject: x.materia,
      roleId: x.idRuolo,
      imagePath: x.pathImmagineDocenteTutor,
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
  console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idMateria,
      name: x.nomeDocenteTutor,
      surname: x.cognomeDocenteTutor,
      roleId: x.idRuolo,
      imagePath: x.pathImmagineDocenteTutor,
    };
  });
  return data;
};

const getLezione = async (token, idLezione) => {
  const f = await utils.getFetch(token, GetLezione(idLezione));
  console.log("getLezione");
  console.log(f);
  if (f.status) return [];
  const data = f;
  return data;
};

const getPDF = async (token, idContenuto) => {
  const f = await utils.getFetch(token, GetPDF(idContenuto));
  console.log("getPDF");
  console.log(f);
  if (f.status) return [];
  const data = f;
  return data;
};

const getDisponibilitaCrediti = async (token, idIscrizione, numMinimoMinuti, numMaxMinuti) => {
  const f = await utils.getFetch(
    token,
    GetDisponibilitaCrediti(idIscrizione, numMinimoMinuti, numMaxMinuti)
  );
  console.log("getDisponibilitaCrediti");
  console.log(f);
  if (f.status) return [];
  //TODO: verificare mapping
/*
  const data = f.map((x) => {
    return {
      id: x.idMateria,
      name: x.nomeDocenteTutor,
      surname: x.cognomeDocenteTutor,
      subject: x.materia,
      roleId: x.idRuolo,
      imagePath: x.pathImmagineDocenteTutor,
    };
  });
 */ 
  const data = f;
  return data;
};

const getDisponibilitaCalendario = async (token, usernameDocente, date, numeroGiorniCalendario, idIscrizione, idIscrizioneAppuntamento, idDocenteStudente) => {
  const f = await utils.getFetch(
    token,
    GetDisponibilitaCalendario(usernameDocente, date, numeroGiorniCalendario, idIscrizione, idIscrizioneAppuntamento, idDocenteStudente)
  );
  console.log("getDisponibilitaCalendario");
  console.log(f);
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
  getDisponibilitaCalendario
};
