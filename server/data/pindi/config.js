const cfgMain = require("../config");

const CLOUD_API_TBL_PINDI = "api/Tables/GetIndirizzoIstituto";
const CLOUD_API_TBL_LIST_ANNO_IST = "api/Tables/GetAnnoIndirizzoIstituto";
const CLOUD_API_TBL_LIST_ANNO_IND = "api/Tables/GetAnnoIndirizzo";
const CLOUD_API_TBL_PINDI_CLAS_ARG_COMBO =
  "api/Tables/GetClasseArgomentoXProgrammaIndirizzoCombo";
const CLOUD_API_TBL_LIST_PINDI = "api/Tables/GetProgrammaIndirizzo";
const CLOUD_API_TBL_LIST_LEZ_CLAS_ARG =
  "api/Tables/GetLezionePerClasseArgomento";
const CLOUD_API_PINDI = "api/PrinProgrammaIndirizzoDats";
const CLOUD_API_IND_IST = "api/AninAnnoIndirizzoAnas";
const CLOUD_API_TBL_LEZ_PINDI = "api/Tables/GetLezionePerProgrammaIndirizzo";

function GetLezionePerProgrammaIndirizzo(IdClasseArgomento, IdAnnoIndirizzo) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LEZ_PINDI}/${IdClasseArgomento}/${IdAnnoIndirizzo}`;
}
function GetIndirizzoIstituto(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_PINDI}/${id}`;
}
function GetPindiClasseArgomentoCombo(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_PINDI_CLAS_ARG_COMBO}/${id}`;
}
function GetAnnoIndirizzoIstituto(IdIndirizzoIstituto, IdProgrammaBase) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_ANNO_IST}/${IdIndirizzoIstituto}/${IdProgrammaBase}`;
}
function GetAnnoIndirizzo(idAnnoIndirizzoIstituto) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_ANNO_IND}/${idAnnoIndirizzoIstituto}`;
}
function GetLezionePerClasseArgomento(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_LEZ_CLAS_ARG}/${id}`;
}
function GetProgrammaIndirizzo(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_PINDI}/${id}`;
}

const PrinProgrammaIndirizzoDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_PINDI}`;
const AninAnnoIndirizzoAnas = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_IND_IST}`;

module.exports = {
  GetIndirizzoIstituto,
  GetPindiClasseArgomentoCombo,
  GetAnnoIndirizzoIstituto,
  GetAnnoIndirizzo,
  GetLezionePerClasseArgomento,
  GetProgrammaIndirizzo,
  PrinProgrammaIndirizzoDats,
  AninAnnoIndirizzoAnas,
  GetLezionePerProgrammaIndirizzo,
};
