const commMain = require("../common");
const utils = require("../../lib/utils");

import {
  GetAnagraficaStudente,
  GetIscrizioneStudentexIdPersona,
  GetTipoIstitutoIndirizzoCombo,
  GetAnnoIndirizzo,
  GetAnnoAccademicoCombo,
  GetTipoStudenteCombo,
  IstuIscrizioneStudenteDats,
  FpagFrequenzaPagamentoTyps,
  GetServizio,
  GetServizioSottoscritto,
  GetPagamentoStudente,
  SesoServizioSottoscrittoDats,
  PastPagamentoStudenteDats,
  StutStudenteTutorRels,
  StdoStudenteDocenteRels,
  GetRuoloUtente,
  GetStudenteTutor,
  GetStudenteDocente,
  GetMateriaScolasticaCombo,
  GetDocenteMateria,
  GetProgrammaBaseNoAggrCombo,
  GetClasseArgomentoXProgrammaBaseCombo,
  GetArgomentoXClasseArgomento,
  GetLezione,
  GetPianoStudiIndividuale,
  PistPianoStudiIndividualeDats,
} from "./config";

const getRicercaStudenti = async (token) => {
  const f = await utils.getFetch(token, GetAnagraficaStudente(0));

  console.log("getRicercaStudenti");
  // console.log(f);
  if (f.status) return [];

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const data = f.map((x) => {
    return {
      id: x.idPersona,
      col1: x.codiceFiscale,
      col2: x.nome + " " + x.cognome,
      col3: x.dataNascita
        ? new Date(x.dataNascita).toLocaleDateString("it-IT", options)
        : "",
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
    GetIscrizioneStudentexIdPersona(0, idPersona, 0, 0, 0)
  );

  console.log("getIscrizioniPersona");
  // console.log(f);
  if (f.status) return [];

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const data = f.map((x) => {
    return {
      id: x.idIscrizione,
      col1: x.annoFrequenza,
      col2: x.indirizzoIstituto,
      col3: x.annoAccademico,
      col4: x.dataIscrizione
        ? new Date(x.dataIscrizione).toLocaleDateString("it-IT", options)
        : "",
      col5: x.tipoStudente,
      col6: x.dataAttivazioneIscrizione
        ? new Date(x.dataAttivazioneIscrizione).toLocaleDateString(
            "it-IT",
            options
          )
        : "",
      col7: x.dataDisattivazioneIscrizione
        ? new Date(x.dataDisattivazioneIscrizione).toLocaleDateString(
            "it-IT",
            options
          )
        : "",
      col8: x.numeroCreditiBonus ? x.numeroCreditiBonus : 0,
      col9: x.importoTotale ? x.importoTotale : 0,
    };
  });
  return data;
};

const getIscrizione = async (
  token,
  idPersona,
  IdAnnoFrequenza,
  IdIndirizzoIstituto
) => {
  const f = await utils.getFetch(
    token,
    GetIscrizioneStudentexIdPersona(
      0,
      idPersona,
      IdAnnoFrequenza,
      IdIndirizzoIstituto,
      0
    )
  );

  console.log("getIscrizione");
  // console.log(f);
  if (f.status) return [];
  return f;
};

const getIdIscrizione = async (token, IdIscrizione) => {
  const f = await utils.getFetch(
    token,
    GetIscrizioneStudentexIdPersona(0, 0, 0, 0, IdIscrizione)
  );

  console.log("getIdIscrizione");
  // console.log(f);
  if (f.status) return [];
  return f;
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
  return await commMain.deleteObjectURL(
    token,
    `${IstuIscrizioneStudenteDats}/${id}`
  );
};

const getFrequenzaPagamentoCombo = async (token) => {
  const f = await utils.getFetch(token, FpagFrequenzaPagamentoTyps);

  console.log("getFrequenzaPagamentoCombo");
  console.log(f);
  if (f.status) return [];

  const arr1 = [{ label: "Seleziona", id: 0 }];

  const arr2 = f.map((x) => {
    return { label: x.fpagDescr, id: x.fpagId };
  });

  const data = arr1.concat(arr2);

  return data;
};

const getServizioCombo = async (token) => {
  const f = await utils.getFetch(token, GetServizio);

  console.log("getServizioCombo");
  // console.log(f);
  if (f.status) return [];

  const arr1 = [{ label: "Seleziona", id: 0 }];

  const arr2 = f.map((x) => {
    return { label: x.descrizioneServizio, id: x.idServizio };
  });

  const data = arr1.concat(arr2);

  return data;
};

const getServizioSottoscritto = async (token, IdIscrizioneStudente) => {
  const f = await utils.getFetch(
    token,
    GetServizioSottoscritto(IdIscrizioneStudente, 0)
  );

  console.log("getServizioSottoscritto");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idServizioSottoscritto,
      col1: x.servizio,
      col2: x.dataSottoscrizione,
    };
  });
  return data;
};

const getPagamentoStudente = async (token, IdIscrizioneStudente) => {
  const f = await utils.getFetch(
    token,
    GetPagamentoStudente(IdIscrizioneStudente)
  );

  console.log("getPagamentoStudente");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idPagamentoStudente,
      col1: x.importoPagato,
      col2: x.dataPagamento,
    };
  });
  return data;
};

const insertServizio = async (token, body) => {
  let res = await utils.postFetch(token, SesoServizioSottoscrittoDats, body);
  return res;
};

const deleteServizio = async (token, id) => {
  return await commMain.deleteObjectURL(
    token,
    `${SesoServizioSottoscrittoDats}/${id}`
  );
};

const insertPagamento = async (token, body) => {
  let res = await utils.postFetch(token, PastPagamentoStudenteDats, body);
  return res;
};

const deletePagamento = async (token, id) => {
  return await commMain.deleteObjectURL(
    token,
    `${PastPagamentoStudenteDats}/${id}`
  );
};

const insertTutor = async (token, body) => {
  let res = await utils.postFetch(token, StutStudenteTutorRels, body);
  return res;
};

const deleteTutor = async (token, id) => {
  return await commMain.deleteObjectURL(
    token,
    `${StutStudenteTutorRels}/${id}`
  );
};

const insertDocente = async (token, body) => {
  let res = await utils.postFetch(token, StdoStudenteDocenteRels, body);
  return res;
};

const deleteDocente = async (token, id) => {
  return await commMain.deleteObjectURL(
    token,
    `${StdoStudenteDocenteRels}/${id}`
  );
};

const getTutorCombo = async (token) => {
  const f = await utils.getFetch(token, GetRuoloUtente(0, 4));

  console.log("getTutorCombo");
  // console.log(f);
  if (f.status) return [];

  const arr1 = [{ label: "Seleziona", id: 0 }];

  const arr2 = f.map((x) => {
    return { label: x.cognome + " " + x.nome, id: x.idRuoloUtente };
  });

  const data = arr1.concat(arr2);

  return data;
};

const getMateriaScolasticaCombo = async (token) => {
  const f = await utils.getFetch(token, GetMateriaScolasticaCombo);

  console.log("getMateriaScolasticaCombo");

  if (f.status) return [];

  const data = f.map((x) => {
    return { label: x.materia, id: x.idMateria };
  });

  return data;
};

const getDocenteMateria = async (token, IdMateriaScolastica) => {
  const f = await utils.getFetch(
    token,
    GetDocenteMateria(0, IdMateriaScolastica)
  );

  console.log("getDocenteMateria");
  console.log(f);
  if (f.status) return [];

  const arr1 = [{ label: "Seleziona", id: 0 }];

  const arr2 = f.map((x) => {
    return { label: x.nome + " " + x.cognome, id: x.idDocenteMateria };
  });

  const data = arr1.concat(arr2);

  return data;
};

const getStudenteTutor = async (token, IdIscrizioneStudente) => {
  const f = await utils.getFetch(
    token,
    GetStudenteTutor(IdIscrizioneStudente, 0)
  );

  console.log("getStudenteTutor");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idStudenteTutor,
      col1: x.cognome,
      col2: x.nome,
    };
  });
  return data;
};

const getStudenteDocente = async (token, IdIscrizioneStudente) => {
  const f = await utils.getFetch(
    token,
    GetStudenteDocente(IdIscrizioneStudente, 0)
  );

  console.log("getStudenteDocente");
  console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idStudenteDocente,
      col1: x.materia,
      col2: x.cognome,
      col3: x.nome,
    };
  });
  return data;
};

const getProgrammaBaseNoAggrCombo = async (token, idProgrammaBase) => {
  const f = await utils.getFetch(
    token,
    GetProgrammaBaseNoAggrCombo(idProgrammaBase)
  );

  console.log("getProgrammaBaseNoAggrCombo");
  // console.log(f);
  if (f.status) return [];

  // const arr1 = [{ label: "Seleziona", id: 0 }];

  const data = f.map((x) => {
    return {
      label: (x.annoFrequenza + " " + x.materia).trim(),
      id: x.idProgrammaBase,
    };
  });

  // const data = arr1.concat(arr2);

  return data;
};

const getClasseArgomentoXProgrammaBaseCombo = async (
  token,
  idProgrammaBase
) => {
  const f = await utils.getFetch(
    token,
    GetClasseArgomentoXProgrammaBaseCombo(idProgrammaBase)
  );
  console.log("getClasseArgomentoXProgrammaBaseCombo");
  // console.log(f);
  if (f.status) return [];
  const arr1 = [{ label: "Seleziona", id: 0 }];
  const arr2 = f.map((x) => {
    return { label: x.classeArgomento.trim(), id: x.idClasseArgomento };
  });
  const data = arr1.concat(arr2);
  return data;
};

const getArgomentoXClasseArgomento = async (token, idClasseArgomento) => {
  const f = await utils.getFetch(
    token,
    GetArgomentoXClasseArgomento(idClasseArgomento)
  );
  console.log("getArgomentoXClasseArgomento");
  // console.log(f);
  if (f.status) return [];
  const arr1 = [{ label: "Seleziona", id: 0 }];
  const arr2 = f.map((x) => {
    return { label: x.argomento.trim(), id: x.idArgomento };
  });
  const data = arr1.concat(arr2);
  return data;
};

const getLezione = async (token, IdArgomento) => {
  const f = await utils.getFetch(token, GetLezione(IdArgomento, 0));
  console.log("getLezione");
  // console.log(f);
  if (f.status) return [];
  // const arr1 = [{ label: "Seleziona", id: 0 }];
  const data = f.map((x) => {
    return { label: x.lezioneDesc.trim(), id: x.idLezione };
  });
  // const data = arr1.concat(arr2);
  return data;
};

const getPianoStudiIndividuale = async (token, IdIscrizioneStudente) => {
  const f = await utils.getFetch(
    token,
    GetPianoStudiIndividuale(IdIscrizioneStudente, 0)
  );

  console.log("getPianoStudiIndividuale");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idPianoStudiIndividuale,
      col1: (x.annoFrequenza + " " + x.materia).trim(),
      col2: x.classeArgomento,
      col3: x.argomento,
      col4: x.lezione,
    };
  });
  return data;
};

const insertPianoStudi = async (token, body) => {
  let res = await utils.postFetch(token, PistPianoStudiIndividualeDats, body);
  return res;
};

const deletePianoStudi = async (token, id) => {
  return await commMain.deleteObjectURL(
    token,
    `${PistPianoStudiIndividualeDats}/${id}`
  );
};

module.exports = {
  getRicercaStudenti,
  getStudente,
  getIscrizioniPersona,
  getIstitutoIndirizzoCombo,
  getTipoStudenteCombo,
  getAnnoAccademicoCombo,
  getIscrizione,
  getIdIscrizione,
  insertIscrizione,
  deleteIscrizione,
  getFrequenzaPagamentoCombo,
  getServizioCombo,
  getServizioSottoscritto,
  getPagamentoStudente,
  insertServizio,
  deleteServizio,
  insertPagamento,
  deletePagamento,
  insertTutor,
  deleteTutor,
  insertDocente,
  deleteDocente,
  getTutorCombo,
  getStudenteTutor,
  getStudenteDocente,
  getMateriaScolasticaCombo,
  getDocenteMateria,
  getProgrammaBaseNoAggrCombo,
  getClasseArgomentoXProgrammaBaseCombo,
  getArgomentoXClasseArgomento,
  getLezione,
  getPianoStudiIndividuale,
  insertPianoStudi,
  deletePianoStudi,
};
