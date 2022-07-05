const commMain = require("../common");
const utils = require("../../lib/utils");

import {
  AnfrAnnoFrequenzaAnas,
  GetAnnoAggregatoCombo,
  MascMateriaScolasticaAnas,
  GetRiepilogoProgrammaBase,
  GetProgrammaBase,
  GetProgrammaBaseCombo,
  PobaProgrammaBaseAnas,
  GetClasseArgomentoCombo,
  GetClasseArgomentoComboAggr,
  ClarClasseArgomentoAnas,
  GetClasseArgomento,
  GetArgomento,
  GetBreadClasseArgomento,
  ArgoArgomentoMateriaDats,
  GetLezione,
  GetLezioneAggr,
  GetBreadArgomento,
  LeziLezioneDats,
  LezaLezioneAggrDats,
  GetContenuto,
  GetBreadLezione,
  ColeContenutoLezioneDats,
  ColeContenutoLezioneDatsUpload,
  TicoTipoContenutoCombo,
} from "./config";
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
const getAnnoFrequenzaAggr = async (token, id) => {
  const f = await utils.getFetch(token, GetAnnoAggregatoCombo(id));

  console.log("getAnnoFrequenzaAggr");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return { label: x.anno, id: x.idAnnoPgmConcatenato };
  });
  // console.log(data);
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
      col9: x.flagProgrammaAggregato ? "*" : "",
    };
  });
  return data;
};
const getProgrammaBase = async (token, id) => {
  const f = await utils.getFetch(token, GetProgrammaBase(id));

  console.log("getProgrammaBase");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idProgrammaBase,
      col1: x.annoFrequenza,
      col2: x.materia,
      col3: x.flagAggregato ? "*" : "",
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
  return await commMain.deleteObjectURL(
    token,
    `${PobaProgrammaBaseAnas}/${id}`
  );
};
const getClasseArgomentoCombo = async (token, id) => {
  const f = await utils.getFetch(token, GetClasseArgomentoCombo(id));

  console.log("getClasseArgomentoCombo", id);
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return { label: x.classeArgomento, id: x.idClasseArgomento };
  });
  return data;
};
const getClasseArgomentoComboAggr = async (token, id) => {
  const f = await utils.getFetch(token, GetClasseArgomentoComboAggr(id));

  console.log("getClasseArgomentoComboAggr", id);
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return { label: x.classeArgomento, id: x.idClasseArgomento };
  });
  return data;
};
const insertClasseArgomento = async (token, body) => {
  let res = await utils.postFetch(token, ClarClasseArgomentoAnas, body);
  return res;
};
const deleteClasseArgomento = async (token, id) => {
  return await commMain.deleteObjectURL(
    token,
    `${ClarClasseArgomentoAnas}/${id}`
  );
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
  return await commMain.deleteObjectURL(
    token,
    `${ArgoArgomentoMateriaDats}/${id}`
  );
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
const getLezioneAggr = async (token, id) => {
  const f = await utils.getFetch(token, GetLezioneAggr(id));
  console.log("getLezioneAggr");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idLezione,
      col1: x.lezioneDescr,
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
const insertLezioneAggr = async (token, body) => {
  let res = await utils.postFetch(token, LezaLezioneAggrDats, body);
  return res;
};
const deleteLezione = async (token, id) => {
  return await commMain.deleteObjectURL(token, `${LeziLezioneDats}/${id}`);
};
const deleteLezioneAggr = async (token, id, pbaseid) => {
  return await commMain.deleteObjectURL(
    token,
    `${LezaLezioneAggrDats}/${pbaseid}/${id}`
  );
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
  return await commMain.deleteObjectURL(
    token,
    `${ColeContenutoLezioneDats}/${id}`
  );
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

module.exports = {
  getAnnoFrequenza,
  getAnnoFrequenzaAggr,
  getMaterie,
  getRiepilogoProgrammaBase,
  getProgrammaBase,
  getProgrammaBaseCombo,
  insertProgrammaBase,
  deleteProgrammaBase,
  getClasseArgomentoCombo,
  getClasseArgomentoComboAggr,
  insertClasseArgomento,
  deleteClasseArgomento,
  getClasseArgomentoBread,
  getClasseArgomento,
  getArgomento,
  getArgomentoBread,
  insertArgomento,
  deleteArgomento,
  getLezione,
  getLezioneAggr,
  getLezioneBread,
  insertLezione,
  insertLezioneAggr,
  deleteLezione,
  deleteLezioneAggr,
  getContenuto,
  getContenutoBread,
  insertContenuto,
  uploadContenuto,
  deleteContenuto,
  getTipoContenuto,
};
