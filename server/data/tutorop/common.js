const commMain = require("../common");
const utils = require("../../lib/utils");

import {
  GetStudTutor,
  GetElencoAppuntamenti,
  GetStudenteTutorDettaglio,
  GetIscrizioneStudentexIdPersona,
} from "./config";

const getStudTutor = async (token, IdIscrizioneStudente, UserNameTutor) => {
  const f = await utils.getFetch(
    token,
    GetStudTutor(IdIscrizioneStudente, UserNameTutor)
  );

  console.log("getStudTutor");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idIscrizione,
      col1: x.annoFrequenza,
      col2: x.istituto,
      col3: x.indirizzo,
      col4: x.annoAccademico,
      col5: x.cognomeStudente + " " + x.nomeStudente,
      col6: x.percAvanzamentoTotale,
    };
  });
  return data;
};

const getElencoAppuntamenti = async (
  token,
  UserName,
  DataInizio,
  DataFine,
  IdIscrizione,
  IdStatoAppuntamento,
  IdAppuntamento,
  IdTipoAppuntamento
) => {
  const f = await utils.getFetch(
    token,
    GetElencoAppuntamenti(
      UserName,
      DataInizio,
      DataFine,
      IdIscrizione,
      IdStatoAppuntamento,
      IdAppuntamento,
      IdTipoAppuntamento
    )
  );

  console.log("getElencoAppuntamenti");
  // console.log(f);
  if (f.status) return [];

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const options1 = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const data = f.map((x) => {
    const dataEvento = new Date(x.inizioAppuntamento);
    return {
      id: x.idAppuntamento,
      col1: dataEvento.toLocaleDateString("it-IT", options)
        ? new Date(x.inizioAppuntamento).toLocaleDateString("it-IT", options)
        : "",
      col2: x.inizioAppuntamento
        ? new Date(x.inizioAppuntamento).toLocaleTimeString("it-IT", options1)
        : "",
      col3: x.fineAppuntamento
        ? new Date(x.fineAppuntamento).toLocaleTimeString("it-IT", options1)
        : "",
      col4: x.statoAppuntamento,
      col5: x.oggetto,
      col6: x.commento,
    };
  });
  return data;
};

const getElencoAppuntamentiLezione = async (
  token,
  UserName,
  DataInizio,
  DataFine,
  IdIscrizione,
  IdStatoAppuntamento,
  IdAppuntamento,
  IdTipoAppuntamento
) => {
  const f = await utils.getFetch(
    token,
    GetElencoAppuntamenti(
      UserName,
      DataInizio,
      DataFine,
      IdIscrizione,
      IdStatoAppuntamento,
      IdAppuntamento,
      IdTipoAppuntamento
    )
  );

  console.log("getElencoAppuntamentiLezione");
  // console.log(f);
  if (f.status) return [];

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const options1 = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const data = f.map((x) => {
    const dataEvento = new Date(x.inizioAppuntamento);

    return {
      id: x.idAppuntamento,
      col1: x.nominativoAltro,
      col2: dataEvento.toLocaleDateString("it-IT", options)
        ? new Date(x.inizioAppuntamento).toLocaleDateString("it-IT", options)
        : "",
      col3: x.inizioAppuntamento
        ? new Date(x.inizioAppuntamento).toLocaleTimeString("it-IT", options1)
        : "",
      col4: x.fineAppuntamento
        ? new Date(x.fineAppuntamento).toLocaleTimeString("it-IT", options1)
        : "",
      col5: x.statoAppuntamento,
      col6: x.oggetto,
      col7: x.commento,
    };
  });
  return data;
};

const getStudenteTutorDettaglio = async (token, IdIscrizioneStudente) => {
  const f = await utils.getFetch(
    token,
    GetStudenteTutorDettaglio(IdIscrizioneStudente)
  );

  console.log("getStudenteTutorDettaglio");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x, index) => {
    return {
      id: index,
      col1: x.materia,
      col2: x.percAvanzamentoMateria,
      col3: x.classeArgomento,
      col4: x.lezione,
      col5: x.lezioneCompletata,
    };
  });
  return data;
};

const getIscrizioneStudente = async (token, IdIscrizioneStudente) => {
  const f = await utils.getFetch(
    token,
    GetIscrizioneStudentexIdPersona(0, 0, 0, 0, IdIscrizioneStudente)
  );

  console.log("getIscrizioneStudente");
  // console.log(f);
  if (f.status) return [];
  return f;
};

module.exports = {
  getStudTutor,
  getStudenteTutorDettaglio,
  getIscrizioneStudente,
  getElencoAppuntamenti,
  getElencoAppuntamentiLezione,
};
