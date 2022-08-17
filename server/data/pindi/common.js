const commMain = require("../common");
const utils = require("../../lib/utils");

import {
  GetIndirizzoIstituto,
  GetAnnoIndirizzo,
  AninAnnoIndirizzoAnas,
  GetLezionePerClasseArgomento,
  GetPindiClasseArgomentoCombo,
  GetProgrammaIndirizzo,
  PrinProgrammaIndirizzoDats,
} from "./config";

const getIndirizzoIstituto = async (token) => {
  const f = await utils.getFetch(token, GetIndirizzoIstituto(0));

  console.log("getIndirizzoIstituto");
  console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.tipoIstituto + " " + x.indirizzoIstitutoDesc,
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
  return await commMain.deleteObjectURL(token, `${AninAnnoIndirizzoAnas}/${id}`);
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
const getClasseArgomentoIndiCombo = async (token, id) => {
  const f = await utils.getFetch(token, GetPindiClasseArgomentoCombo(id));

  console.log("getClasseArgomentoIndiCombo", id);
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return { label: x.classeArgomento, id: x.idClasseArgomento };
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
  return await commMain.deleteObjectURL(token, `${PrinProgrammaIndirizzoDats}/${id}`);
};

module.exports = {
  getIndirizzoIstituto,
  getAnnoIndIstituto,
  insertAnnoIndIstituto,
  deleteAnnoIndIstituto,
  getLezClasseArgomento,
  getLezClasseArgomentoId,
  getClasseArgomentoIndiCombo,
  getProgrammaIndi,
  getProgrammaIndiBread,
  insertProgrammaIndi,
  deleteProgrammaIndi,
};
