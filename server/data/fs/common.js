import {
  UserAuthenticate,
  GetFunzioniForm,
  GetIscrizioneStudente,
  GetStudenteMaterie,
  GetLezioniSeguite,
  GetLezioniDaSeguire
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

  console.log("getIscrizione");
  if (f.status) return [];

  const data = f.map((x) => {
    console.log(x);
  });
  return data;
};


const getStudenteMaterie = async (token, username, idIscrizione) => {
  const f = await utils.getFetch(token, GetStudenteMaterie(username, idIscrizione));

  console.log("getStudenteMaterie");
  if (f.status) return [];

  const data = f.map((x) => {
    console.log(x)
  });
  return data;
};


const getLezioniSeguite = async (token, username, idIscrizione) => {
  const f = await utils.getFetch(token, GetLezioniSeguite(username, idIscrizione));

  console.log("getLezioniSeguite");
  if (f.status) return [];

  const data = f.map((x) => {
    console.log(x)
  });
  return data;
};


const getLezioniDaSeguire = async (token, idIscrizione) => {
  const f = await utils.getFetch(token, GetLezioniDaSeguire(idIscrizione));

  console.log("getLezioniDaSeguire");
  if (f.status) return [];

  const data = f.map((x) => {
    console.log(x);
  });
  return data;
};

module.exports = {
  getToken,
  getFunzioniForm,
  getIscrizioneStudente,
  getStudenteMaterie,
  getLezioniSeguite,
  getLezioniDaSeguire
};
