import {
  UserAuthenticate,
  GetFunzioniForm,
  GetPaeseCombo,
  GetRegioneCombo,
  GetProvinciaCombo,
  GetComuneCombo,
  GetToponimoCombo,
  GetAnagraficaPersone,
  PersPersonaDats,
  GetRuoloUtente,
} from "../data/config";

const utils = require("../lib/utils");

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

  console.log("getFunzioniForm");
  // console.log(f);
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
  console.log("************ DELETE", url);
  // console.log(f);
  if (f.status) return [];
  return f;
};

const getNullGeo = async () => {
  console.log("getNullGeo");
  const data = [
    { label: "Seleziona", id: 0 },
    { label: "Non Disponibile", id: -1 },
  ];

  return data;
};

const getPaese = async (token) => {
  const f = await utils.getFetch(token, GetPaeseCombo(0));

  console.log("getPaese");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.paese,
      id: x.idPaese,
    };
  });
  return data;
};

const getRegione = async (token, IdRegione) => {
  const f = await utils.getFetch(token, GetRegioneCombo(IdRegione));

  console.log("getRegione");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.regione,
      id: x.idRegione,
    };
  });
  return data;
};

const getProvincia = async (token, IdRegione, IdProvincia) => {
  const f = await utils.getFetch(
    token,
    GetProvinciaCombo(IdRegione, IdProvincia)
  );

  console.log("getProvincia");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.provincia,
      id: x.idProvincia,
    };
  });
  return data;
};

const getComune = async (token, IdProvincia) => {
  const f = await utils.getFetch(token, GetComuneCombo(IdProvincia));

  console.log("getComune");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.comuneDen,
      id: x.idComune,
    };
  });
  return data;
};

const getToponimo = async (token) => {
  const f = await utils.getFetch(token, GetToponimoCombo);

  console.log("getToponimo");
  if (f.status) return [];

  const data = f.map((x, i) => {
    return {
      label: x.idToponimo,
      id: i,
    };
  });

  return data;
};

const getRicercaPersone = async (token) => {
  const f = await utils.getFetch(token, GetAnagraficaPersone(0));

  console.log("getRicercaPersone");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idPersona,
      col1: x.codiceFiscale,
      col2: x.nome + " " + x.cognome,
      col3: x.dataNascita,
      col4: x.paeseNascita + " " + x.comuneNascita,
      col5: x.attivo,
    };
  });
  return data;
};

const getPersona = async (token, idPersona) => {
  const f = await utils.getFetch(token, `${PersPersonaDats}/${idPersona}`);
  console.log("getPersona");
  if (f.status) return [];
  const c = await utils.getFetch(token, GetAnagraficaPersone(idPersona));
  // console.log(c);
  f.idRegioneNascita = c[0].idRegioneNascita;
  f.idProvinciaNascita = c[0].idProvinciaNascita;
  f.idRegioneResidenza = c[0].idRegioneResidenza;
  f.idProvinciaResidenza = c[0].idProvinciaResidenza;
  f.idRegioneDomicilio = c[0].idRegioneDomicilio;
  f.idProvinciaDomicilio = c[0].idProvinciaDomicilio;
  // console.log(f);
  return f;
};

const insertPersona = async (token, body) => {
  let res = await utils.postFetch(token, PersPersonaDats, body);
  return res;
};

const deletePersona = async (token, id) => {
  return await deleteObjectURL(token, `${PersPersonaDats}/${id}`);
};

const getYesNoCombo = async (token) => {
  console.log("getYesNoCombo");
  // console.log(f);

  const data = [
    { label: "Seleziona", id: 0 },
    { label: "Si", id: 1 },
    { label: "No", id: 2 },
  ];

  return data;
};

const getRuoloUtente = async (token, IdUtenteUserName, IdRuoloUtente) => {
  const f = await utils.getFetch(
    token,
    GetRuoloUtente(IdUtenteUserName, IdRuoloUtente)
  );

  console.log("getRuoloUtente");
  // console.log(f);
  if (f.status) return [];

  return f;
};

module.exports = {
  getToken,
  getFunzioniForm,
  deleteObjectURL,
  getNullGeo,
  getPaese,
  getRegione,
  getProvincia,
  getComune,
  getToponimo,
  getRicercaPersone,
  getPersona,
  insertPersona,
  deletePersona,
  getYesNoCombo,
  getRuoloUtente,
};
