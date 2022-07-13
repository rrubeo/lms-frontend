const commMain = require("../common");
const utils = require("../../lib/utils");

import {
  DoesDomandaEsercitazioneDats,
  EserEsercitazioneDats,
  EsleEsercitazioneLezioneRels,
  GetDomandaEsercitazione,
  GetEsercitazione,
  GetEsercitazioneLezione,
  GetLezioneConEsercitazione,
  GetElencoGruppoDomandexEsercitazione,
  GetLivelloDifficolta,
  GetGruppoDomande,
  GrudGruppoDomandeDats,
  GetTipologiaDomanda,
  RidoRispostaDomandaDats,
  GetRispostaDomanda,
  GetCheckEsercitazione,
} from "./config";

const getRicercaLezioni = async (token) => {
  const f = await utils.getFetch(token, GetLezioneConEsercitazione(0, 0, 0));

  console.log("getRicercaLezioni");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idLezione,
      col1: x.materia + "-" + x.anno,
      col2: x.classeArgomento,
      col3: x.argomento,
      col4: x.lezione,
    };
  });
  return data;
};

const getBreadView = async (token, IdLezione) => {
  const f = await utils.getFetch(
    token,
    GetLezioneConEsercitazione(IdLezione, 0, 0)
  );

  console.log("getBreadView");
  // console.log(f);
  if (f.status) return [];
  let data = [];
  if (f.length > 0) {
    data.push({ key: 1, text: f[0].materia + "-" + f[0].anno });
    data.push({ key: 2, text: f[0].classeArgomento });
    data.push({ key: 3, text: f[0].argomento });
    data.push({ key: 4, text: f[0].lezione });
  }
  return data;
};

const getBreadEsercita = async (token, IdLezione, IdEsercitazione) => {
  const f = await utils.getFetch(
    token,
    GetEsercitazioneLezione(IdLezione, IdEsercitazione, 0, 0)
  );

  console.log("getBreadEsercita");
  // console.log(f);
  if (f.status) return [];
  let data = [];
  if (f.length > 0) {
    data.push({ key: 1, text: f[0].materia + "-" + f[0].anno });
    data.push({ key: 2, text: f[0].classeArgomento });
    data.push({ key: 3, text: f[0].argomento });
    data.push({ key: 4, text: f[0].lezione });
    data.push({ key: 5, text: f[0].nomeEsercitazione });
  }
  // console.log(data);
  return data;
};

const getEsercitazioneLezione = async (token, IdLezione) => {
  const f = await utils.getFetch(
    token,
    GetEsercitazioneLezione(IdLezione, 0, 0, 0)
  );

  console.log("getEsercitazioneLezione");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idEsercitazione,
      col1: x.nomeEsercitazione,
      col2: x.verificaEsercitazione,
      col3: x.tempoLimite,
      col4: x.punteggio,
      col5: x.livelloDifficolta,
    };
  });
  return data;
};

const getEsercitazioneInfo = async (
  token,
  IdLezione,
  IdEsercitazione,
  IdClasseArgomento,
  IdArgomento
) => {
  const f = await utils.getFetch(
    token,
    GetEsercitazioneLezione(
      IdLezione,
      IdEsercitazione,
      IdClasseArgomento,
      IdArgomento
    )
  );
  let data = {};
  console.log("getEsercitazioneInfo");
  // console.log(f);
  if (f.status) return data;

  if (f.length > 0) {
    data = f[0];
  }
  // console.log(data);
  return data;
};

const getTipoEsercitazioneCombo = async (token) => {
  console.log("getTipoEsercitazioneCombo");
  // console.log(f);

  const data = [
    { label: "Seleziona", id: 0 },
    { label: "Esercitazione", id: 1 },
    { label: "Verifica", id: 2 },
  ];

  return data;
};

const getLivelloDiffCombo = async (token) => {
  const f = await utils.getFetch(token, GetLivelloDifficolta(0));

  console.log("getLivelloDiffCombo");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.descrLivelloDifficolta,
      id: x.idLivelloDifficolta,
    };
  });
  return data;
};

const insertEsercitazione = async (token, body) => {
  let res = await utils.postFetch(token, EserEsercitazioneDats, body);
  return res;
};

const insertEsercitazioneIntoLezione = async (token, body) => {
  let res = await utils.postFetch(token, EsleEsercitazioneLezioneRels, body);
  return res;
};

const deleteEsercitazione = async (token, id) => {
  return await commMain.deleteObjectURL(
    token,
    `${EserEsercitazioneDats}/${id}`
  );
};

const getGruppoDomande = async (token, IdEsercitazione) => {
  const f = await utils.getFetch(token, GetGruppoDomande(0, IdEsercitazione));

  console.log("getGruppoDomande");
  console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idGruppoDomande,
      col1: x.gruppoDomandeDesc,
      col2: x.nomeFile,
      col3: x.tipologiaFile,
    };
  });
  return data;
};

const insertGruppoDomande = async (token, body) => {
  let res = await utils.postFetch(token, GrudGruppoDomandeDats, body);
  return res;
};

const deleteGruppoDomande = async (token, id) => {
  return await commMain.deleteObjectURL(
    token,
    `${GrudGruppoDomandeDats}/${id}`
  );
};

const getDomande = async (
  token,
  IdDomanda,
  IdEsercitazione,
  IdGruppoDomande
) => {
  const f = await utils.getFetch(
    token,
    GetDomandaEsercitazione(IdDomanda, IdEsercitazione, IdGruppoDomande)
  );

  console.log("getDomande");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idDomandaEsercitazione,
      col1: x.numDomanda,
      col2: x.tipologiaDomanda,
      col3: x.testoDomanda,
      col4: x.punteggio,
      col5: x.nomeGruppoDomande,
    };
  });
  return data;
};

const insertDomanda = async (token, body) => {
  let res = await utils.postFetch(token, DoesDomandaEsercitazioneDats, body);
  return res;
};

const deleteDomanda = async (token, id) => {
  return await commMain.deleteObjectURL(
    token,
    `${DoesDomandaEsercitazioneDats}/${id}`
  );
};

const getTipoDomandaCombo = async (token) => {
  const f = await utils.getFetch(token, GetTipologiaDomanda(0));

  console.log("getTipoDomandaCombo");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.descrTipologiaDomanda,
      id: x.idTipologiaDomanda,
    };
  });
  return data;
};

const insertRisposta = async (token, body) => {
  let res = await utils.postFetch(token, RidoRispostaDomandaDats, body);
  return res;
};

const deleteRisposta = async (token, id) => {
  return await commMain.deleteObjectURL(
    token,
    `${RidoRispostaDomandaDats}/${id}`
  );
};

const getRisposte = async (
  token,
  IdDomanda,
  IdEsercitazione,
  IdGruppoDomande,
  IdRisposta
) => {
  const f = await utils.getFetch(
    token,
    GetRispostaDomanda(IdDomanda, IdEsercitazione, IdGruppoDomande, IdRisposta)
  );

  console.log("getRisposte");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idRisposta,
      col1: x.numeroRisposta,
      col2: x.testoRisposta,
      col3: x.rispostaCorretta == 0 ? "No" : "Si",
      col4: x.tipologiaDomanda,
    };
  });
  return data;
};

const getTipoRispostaCombo = async (token) => {
  console.log("getTipoRispostaCombo");
  // console.log(f);

  const data = [
    { label: "Seleziona", id: 0 },
    { label: "Si", id: 1 },
    { label: "No", id: 2 },
  ];

  return data;
};

const getEsercitazioneCheck = async (
  token,
  IdDomanda,
  IdEsercitazione,
  IdGruppoDomande,
  IdRisposta
) => {
  const f = await utils.getFetch(
    token,
    GetCheckEsercitazione(
      IdDomanda,
      IdEsercitazione,
      IdGruppoDomande,
      IdRisposta
    )
  );

  console.log("getEsercitazioneCheck");
  // console.log(f);
  if (f.status) return [];

  let data = {};
  for (let i = 0; i < f.length; i++) {
    const id = f[i].idDomandaEsercitazione;

    if (id in data) {
      let risposta = {
        nris: f[i].numeroRisposta,
        testo: f[i].testoRisposta,
        corretta: f[i].rispostaCorretta,
      };
      data[id].risposte.push(risposta);
    } else {
      data[id] = {
        ndom: f[i].numDomanda,
        testo: f[i].testoDomanda,
        tipo: f[i].tipologiaDomanda,
        punteggio: f[i].punteggio,
        livello: f[i].livelloDifficolta,
        limite: f[i].tempoLimite,
        risposte: [
          {
            nris: f[i].numeroRisposta,
            testo: f[i].testoRisposta,
            corretta: f[i].rispostaCorretta,
          },
        ],
      };
    }
  }
  // console.log(data);
  return data;
};

module.exports = {
  getRicercaLezioni,
  getEsercitazioneLezione,
  getTipoEsercitazioneCombo,
  getLivelloDiffCombo,
  insertEsercitazione,
  deleteEsercitazione,
  getBreadView,
  insertEsercitazioneIntoLezione,
  getBreadEsercita,
  getGruppoDomande,
  insertGruppoDomande,
  deleteGruppoDomande,
  getDomande,
  insertDomanda,
  deleteDomanda,
  getTipoDomandaCombo,
  insertRisposta,
  deleteRisposta,
  getRisposte,
  getTipoRispostaCombo,
  getEsercitazioneCheck,
  getEsercitazioneInfo,
};
