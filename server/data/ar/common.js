const commMain = require("../common");
const utils = require("../../lib/utils");

import {
  GetUtente,
  GetRuoloPersona,
  GetValidaUserName,
  GetRuolo,
  RuutRuoloUtenteDats,
  UtntUtenteDats,
} from "./config";

const getRicercaUtenti = async (token) => {
  const f = await utils.getFetch(token, GetUtente(0));

  console.log("getRicercaUtenti");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idPersona,
      col1: x.userName,
      col2: x.codiceFiscale,
      col3: x.nome + " " + x.cognome,
      col4: x.mail,
      col5: x.attivo === 1 ? "Si" : "No",
    };
  });
  return data;
};

const getValidaUserName = async (token, UserName) => {
  const f = await utils.getFetch(token, GetValidaUserName(UserName));

  console.log("getValidaUserName");
  // console.log(f);
  if (f.status) return [];
  return f;
};

const getUtente = async (token, IdPersona) => {
  const f = await utils.getFetch(token, GetUtente(IdPersona));

  console.log("getUtente");
  console.log(f);
  if (f.status) return [];

  if (!f[0].userName) {
    f[0].userName = "";
  }

  return f;
};

const getRuoliPersona = async (token, IdPersona) => {
  const f = await utils.getFetch(token, GetRuoloPersona(IdPersona, 0, 0));

  console.log("getRuoloPersona");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idRuoloUtente,
      col1: x.ruolo,
      col2: x.ruoloAttivo === 1 ? "Si" : "No",
    };
  });
  return data;
};

const getRuoliCombo = async (token) => {
  const f = await utils.getFetch(token, GetRuolo);

  console.log("getRuoloCombo");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return { label: x.ruoloDesc, id: x.idRuolo };
  });
  return data;
};

const insertRuoloUtente = async (token, body) => {
  let res = await utils.postFetch(token, RuutRuoloUtenteDats, body);
  return res;
};

const deleteRuoloUtente = async (token, id) => {
  return await commMain.deleteObjectURL(token, `${RuutRuoloUtenteDats}/${id}`);
};

const insertUtente = async (token, body) => {
  let res = await utils.postFetch(token, UtntUtenteDats, body);
  return res;
};

const deleteUtente = async (token, id) => {
  return await commMain.deleteObjectURL(token, `${UtntUtenteDats}/${id}`);
};

const getUserName = async (token, UserName) => {
  const f = await utils.getFetch(token, `${UtntUtenteDats}/${UserName}`);

  console.log("getUserName");
  console.log(f);
  if (f.status) return [];
  return f;
};

module.exports = {
  getRicercaUtenti,
  getRuoliPersona,
  getValidaUserName,
  getUtente,
  getRuoliCombo,
  insertRuoloUtente,
  deleteRuoloUtente,
  insertUtente,
  deleteUtente,
  getUserName,
};
