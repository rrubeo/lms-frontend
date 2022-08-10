const commMain = require("../common");
const utils = require("../../lib/utils");

import {
  GetAnagraficaStudente,
  GetIscrizioneStudentexIdPersona,
  GetTipoIstitutoIndirizzoCombo,
  GetAnnoAccademicoCombo,
  GetTipoStudenteCombo,
  IstuIscrizioneStudenteDats,
} from "./config";

const getRicercaStudenti = async (token) => {
  const f = await utils.getFetch(token, GetAnagraficaStudente(0));

  console.log("getRicercaStudenti");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idPersona,
      col1: x.codiceFiscale,
      col2: x.nome + " " + x.cognome,
      col3: x.dataNascita,
      col4: x.paeseNascita + " " + x.comuneNascita,
    };
  });
  return data;
};

const getStudente = async (token, idPersona) => {
  const f = await utils.getFetch(token, GetAnagraficaStudente(idPersona));

  console.log("getStudente");
  // console.log(f);
  if (f.status) return [];

  return f[0];
};

const getIscrizioniPersona = async (token, idPersona) => {
  const f = await utils.getFetch(
    token,
    GetIscrizioneStudentexIdPersona(0, idPersona)
  );

  console.log("getIscrizioniPersona");
  console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idIscrizione,
      col1: x.indirizzoIstituto,
      col2: x.annoFrequenza,
      col3: x.annoAccademico,
      col4: x.dataAttivazioneIscrizione,
    };
  });
  return data;
};

const getIstitutoIndirizzoCombo = async (token) => {
  const f = await utils.getFetch(token, GetTipoIstitutoIndirizzoCombo(0));

  console.log("getIstitutoIndirizzoCombo");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return { label: x.indirizzoIstituto, id: x.idIndirizzoIstituto };
  });
  return data;
};

const getAnnoAccademicoCombo = async (token) => {
  const f = await utils.getFetch(token, GetAnnoAccademicoCombo);

  console.log("getAnnoAccademicoCombo");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return { label: x.descAnnoAccademico, id: x.idAnnoAccademico };
  });

  return data;
};

const getTipoStudenteCombo = async (token) => {
  const f = await utils.getFetch(token, GetTipoStudenteCombo);

  console.log("getTipoStudenteCombo");
  // console.log(f);
  if (f.status) return [];

  // const arr1 = [{ label: "Seleziona", id: 0 }];

  const data = f.map((x) => {
    return { label: x.descrizioneTipoStudente, id: x.idTipoStudente };
  });

  // const data = arr1.concat(arr2);

  return data;
};

const insertIscrizione = async (token, body) => {
  let res = await utils.postFetch(token, IstuIscrizioneStudenteDats, body);
  return res;
};

const deleteIscrizione = async (token, id) => {
  return await deleteObjectURL(token, `${IstuIscrizioneStudenteDats}/${id}`);
};

module.exports = {
  getRicercaStudenti,
  getStudente,
  getIscrizioniPersona,
  getIstitutoIndirizzoCombo,
  getTipoStudenteCombo,
  getAnnoAccademicoCombo,
  insertIscrizione,
  deleteIscrizione,
};
