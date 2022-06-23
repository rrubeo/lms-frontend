import {
  UserAuthenticate,
  AnfrAnnoFrequenzaAnas,
  MascMateriaScolasticaAnas,
  GetProgrammaBase,
  GetProgrammaBaseCombo,
  GetClasseArgomento,
  GetBreadClasseArgomento,
  GetClasseArgomentoCombo,
  GetArgomento,
  GetBreadArgomento,
  GetLezione,
  GetBreadLezione,
  GetContenuto,
  GetFunzioniForm,
  PobaProgrammaBaseAnas,
  ClarClasseArgomentoAnas,
  ArgoArgomentoMateriaDats,
  LeziLezioneDats,
  ColeContenutoLezioneDats,
  ColeContenutoLezioneDatsUpload,
  TicoTipoContenutoTyps,
  TicoTipoContenutoCombo,
  GetRiepilogoProgrammaBase,
  GetIndirizzoIstituto,
  GetAnnoIndirizzo,
  AninAnnoIndirizzoAnas,
  GetLezionePerClasseArgomento,
  GetProgrammaIndirizzo,
  PrinProgrammaIndirizzoDats,
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
  console.log("delete-" + url);
  // console.log(f);
  if (f.status) return [];
  return f;
};

//Programma Base
const getAnnoFrequenza = async (token) => {
  const f = await utils.getFetch(token, AnfrAnnoFrequenzaAnas);

  console.log("getAnnoFrequenza");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return { label: x.anfrDescr, id: x.anfrId };
  });
  return data;
};
const getMaterie = async (token) => {
  const f = await utils.getFetch(token, MascMateriaScolasticaAnas);

  console.log("getMaterie");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return { label: x.mascDescr, id: x.mascId };
  });
  return data;
};
const getRiepilogoProgrammaBase = async (token) => {
  const f = await utils.getFetch(token, GetRiepilogoProgrammaBase);

  console.log("getRiepilogoProgrammaBase");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x, index) => {
    return {
      id: x.idProgrammaBase + "_" + index,
      col1: x.annoFrequenza,
      col2: x.materia,
      col3: x.classeArgomento,
      col4: x.argomento,
      col5: x.lezioneDescr,
      col6: x.nomeContenuto,
      col7: x.tipoContenuto,
      col8: x.durataMinuti,
    };
  });
  return data;
};
const getProgrammaBase = async (token, id) => {
  const f = await utils.getFetch(token, GetProgrammaBase(id));

  console.log("getProgrammaBase");
  console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idProgrammaBase,
      col1: x.annoFrequenza,
      col2: x.materia,
    };
  });
  return data;
};
const getProgrammaBaseCombo = async (token) => {
  const f = await utils.getFetch(token, GetProgrammaBaseCombo(0));

  console.log("getProgrammaBaseCombo");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.materia + "-" + x.annoFrequenza,
      id: x.idProgrammaBase,
    };
  });
  return data;
};
const insertProgrammaBase = async (token, body) => {
  let res = await utils.postFetch(token, PobaProgrammaBaseAnas, body);
  return res;
};
const deleteProgrammaBase = async (token, id) => {
  return await deleteObjectURL(token, `${PobaProgrammaBaseAnas}/${id}`);
};

const getClasseArgomentoCombo = async (token) => {
  const f = await utils.getFetch(token, GetClasseArgomentoCombo(0));

  console.log("getClasseArgomentoCombo");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return { label: x.classeArgomento, id: x.idClasseArgomento };
  });
  return data;
};
const insertClasseArgomento = async (token, body) => {
  //PobaProgrammaBaseAnas
  let res = await utils.postFetch(token, ClarClasseArgomentoAnas, body);
  return res;
};
const deleteClasseArgomento = async (token, id) => {
  return await deleteObjectURL(token, `${ClarClasseArgomentoAnas}/${id}`);
};
const getClasseArgomentoBread = async (token, id) => {
  const f = await utils.getFetch(token, GetProgrammaBase(id));

  console.log("getClasseArgomentoBread");
  // console.log(f);
  if (f.status) return [];
  let data = [];
  if (f.length == 1) {
    data.push({ key: 1, text: f[0].materia });
    data.push({ key: 2, text: f[0].annoFrequenza });
  }
  return data;
};

const getClasseArgomento = async (token, id) => {
  const f = await utils.getFetch(token, GetClasseArgomento(id));

  console.log("getClasseArgomento");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idClasseArgomento,
      col1: x.annoFrequenza + "-" + x.materia,
      col2: x.classeArgomento,
    };
  });
  return data;
};

const getArgomento = async (token, id) => {
  const f = await utils.getFetch(token, GetArgomento(id));

  console.log("getArgomento");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idArgomento,
      col1: x.annoFrequenza + "-" + x.materia,
      col2: x.classeArgomento,
      col3: x.argomento,
    };
  });
  return data;
};
const getArgomentoBread = async (token, id) => {
  const f = await utils.getFetch(token, GetBreadClasseArgomento(id));

  console.log("getArgomentoBread");
  // console.log(f);
  if (f.status) return [];
  let data = [];
  if (f.length == 1) {
    data.push({ key: 1, text: f[0].materia });
    data.push({ key: 2, text: f[0].annoFrequenza });
    data.push({ key: 3, text: f[0].classeArgomento });
  }
  return data;
};
const insertArgomento = async (token, body) => {
  let res = await utils.postFetch(token, ArgoArgomentoMateriaDats, body);
  return res;
};
const deleteArgomento = async (token, id) => {
  return await deleteObjectURL(token, `${ArgoArgomentoMateriaDats}/${id}`);
};

const getLezione = async (token, id) => {
  const f = await utils.getFetch(token, GetLezione(id));
  console.log("getLezione");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idLezione,
      col1: x.lezioneDesc,
      col2: x.materia + "-" + x.annoFrequenza,
      col3: x.classeArgomento,
      col4: x.argomento,
    };
  });
  return data;
};
const getLezioneBread = async (token, id) => {
  const f = await utils.getFetch(token, GetBreadArgomento(id));

  console.log("getLezioneBread");
  // console.log(f);
  if (f.status) return [];
  let data = [];
  if (f.length == 1) {
    data.push({ key: 1, text: f[0].materia });
    data.push({ key: 2, text: f[0].annoFrequenza });
    data.push({ key: 3, text: f[0].classeArgomento });
    data.push({ key: 4, text: f[0].argomento });
  }
  return data;
};
const insertLezione = async (token, body) => {
  let res = await utils.postFetch(token, LeziLezioneDats, body);
  return res;
};
const deleteLezione = async (token, id) => {
  return await deleteObjectURL(token, `${LeziLezioneDats}/${id}`);
};

const getContenuto = async (token, id) => {
  const f = await utils.getFetch(token, GetContenuto(id));

  console.log("getContenuto");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idContenutoLezione,
      col1: x.lezione,
      col2: x.nomeContenuto,
      col3: x.tipoContenuto,
      col4: x.durataMinuti,
      col5: x.contenutoPercorso,
    };
  });
  return data;
};
const getContenutoBread = async (token, id) => {
  const f = await utils.getFetch(token, GetBreadLezione(id));

  console.log("getContenutoBread");
  // console.log(f);
  if (f.status) return [];
  let data = [];
  if (f.length == 1) {
    data.push({ key: 1, text: f[0].materia });
    data.push({ key: 2, text: f[0].annoFrequenza });
    data.push({ key: 3, text: f[0].classeArgomento });
    data.push({ key: 4, text: f[0].argomento });
    data.push({ key: 5, text: f[0].lezioneDesc });
  }
  // console.log(data);
  return data;
};
const insertContenuto = async (token, body) => {
  let res = await utils.postFetch(token, ColeContenutoLezioneDats, body);
  return res;
};
const uploadContenuto = async (token, id, body) => {
  console.log("Upload contenuto id:", id);
  return await utils.postFile(
    token,
    `${ColeContenutoLezioneDatsUpload}/${id}`,
    body
  );
};
const deleteContenuto = async (token, id) => {
  return await deleteObjectURL(token, `${ColeContenutoLezioneDats}/${id}`);
};

const getTipoContenuto = async (token) => {
  const f = await utils.getFetch(token, TicoTipoContenutoCombo);

  console.log("getTipoContenuto");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idTipoContenuto,
      label: x.descrizione,
    };
  });
  return data;
};

const getIndirizzoIstituto = async (token) => {
  const f = await utils.getFetch(token, GetIndirizzoIstituto(0));

  console.log("getIndirizzoIstituto");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.tipoIstituto + "-" + x.indirizzoIstitutoDesc,
      id: x.idIndirizzoIstituto,
    };
  });
  return data;
};
const getAnnoIndIstituto = async (token) => {
  const f = await utils.getFetch(token, GetAnnoIndirizzo(0));

  console.log("getAnnoIndIstituto");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idAnnoIndirizzoIstituto,
      col1: x.tipoIstituto + "-" + x.indirizzoIstituto,
      col2: x.materia + "-" + x.anno,
    };
  });
  return data;
};
const insertAnnoIndIstituto = async (token, body) => {
  let res = await utils.postFetch(token, AninAnnoIndirizzoAnas, body);
  return res;
};
const deleteAnnoIndIstituto = async (token, id) => {
  return await deleteObjectURL(token, `${AninAnnoIndirizzoAnas}/${id}`);
};

const getLezClasseArgomento = async (token) => {
  const f = await utils.getFetch(token, GetLezionePerClasseArgomento(0));

  console.log("getLezClasseArgomento");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.classeArgomento + "-" + x.argomento + "-" + x.lezioneDesc,
      id: x.idLezione,
    };
  });
  return data;
};
const getLezClasseArgomentoId = async (token, id) => {
  const f = await utils.getFetch(token, GetLezionePerClasseArgomento(id));

  console.log("getLezClasseArgomentoId");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.classeArgomento + "-" + x.argomento + "-" + x.lezioneDesc,
      id: x.idLezione,
    };
  });
  return data;
};

const getProgrammaIndi = async (token, id) => {
  const f = await utils.getFetch(token, GetProgrammaIndirizzo(id));

  console.log("getProgrammaIndi");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idProgrammaIndirizzo,
      col1: x.classeArgomento,
      col2: x.argomento,
      col3: x.lezione,
    };
  });
  return data;
};
const getProgrammaIndiBread = async (token, id) => {
  const f = await utils.getFetch(token, GetAnnoIndirizzo(id));

  console.log("getProgrammaIndiBread");
  // console.log(f);
  if (f.status) return [];
  let data = [];
  if (f.length == 1) {
    data.push({ key: 1, text: f[0].tipoIstituto });
    data.push({ key: 2, text: f[0].indirizzoIstituto });
    data.push({ key: 3, text: f[0].materia });
    data.push({ key: 4, text: f[0].anno });
  }
  // console.log(data);
  return data;
};
const insertProgrammaIndi = async (token, body) => {
  let res = await utils.postFetch(token, PrinProgrammaIndirizzoDats, body);
  return res;
};
const deleteProgrammaIndi = async (token, id) => {
  return await deleteObjectURL(token, `${PrinProgrammaIndirizzoDats}/${id}`);
};
// const f3 = await utils.fetcher(
//   GetMenuNonStudenti("CARLACONFIGURATORE.FRACCI")
// );
// console.log(f3);

module.exports = {
  getIndirizzoIstituto,
  getToken,
  getFunzioniForm,
  getAnnoFrequenza,
  getMaterie,
  getProgrammaBase,
  getProgrammaBaseCombo,
  getClasseArgomento,
  getClasseArgomentoBread,
  getClasseArgomentoCombo,
  getArgomento,
  getArgomentoBread,
  getLezione,
  getLezioneBread,
  getContenuto,
  getContenutoBread,
  getTipoContenuto,
  getRiepilogoProgrammaBase,
  insertProgrammaBase,
  insertClasseArgomento,
  insertArgomento,
  insertLezione,
  insertContenuto,
  uploadContenuto,
  deleteProgrammaBase,
  deleteClasseArgomento,
  deleteArgomento,
  deleteLezione,
  deleteContenuto,
  getAnnoIndIstituto,
  insertAnnoIndIstituto,
  deleteAnnoIndIstituto,
  getLezClasseArgomento,
  getLezClasseArgomentoId,
  getProgrammaIndi,
  getProgrammaIndiBread,
  insertProgrammaIndi,
  deleteProgrammaIndi,
};
