const cfgMain = require("../config");

//API GET lettura programma base completo
const CLOUD_API_TBL_LIST_PBASE = "api/Tables/GetProgrammaBase";
const CLOUD_API_TBL_LIST_PBASE_COMBO = "api/Tables/GetProgrammaBaseCombo";
const CLOUD_API_TBL_LIST_CLAS_ARG =
  "api/Tables/GetClasseArgomentoXProgrammaBase";
const CLOUD_API_TBL_LIST_CLAS_ARG_COMBO =
  "api/Tables/GetClasseArgomentoXProgrammaBaseCombo";
const CLOUD_API_TBL_LIST_CLAS_ARG_COMBO_AGG =
  "api/Tables/GetClasseArgomentoXProgrammaBaseAggregatoCombo";
const CLOUD_API_TBL_LIST_ARG = "api/Tables/GetArgomentoXClasseArgomento";
const CLOUD_API_TBL_LIST_LEZ = "api/Tables/GetLezione";
const CLOUD_API_TBL_LIST_CONT = "api/Tables/GetContenutoLezione";
//POST
const CLOUD_API_PBASE = "api/PobaProgrammaBaseAnas";
const CLOUD_API_ANNO_FREQ = "api/AnfrAnnoFrequenzaAnas";
const CLOUD_API_MAT = "api/MascMateriaScolasticaAnas";
const CLOUD_API_ARGO_MAT = "api/ArgoArgomentoMateriaDats";
const CLOUD_API_CLAS_ARGO = "api/ClarClasseArgomentoAnas";
const CLOUD_API_TBL_PBASE_RIEPILOGO = "api/Tables/GetRiepilogoProgrammaBase";
const CLOUD_API_CLAS_LEZIO = "api/LeziLezioneDats";
const CLOUD_API_CLAS_LEZIO_AGGR = "api/LezaLezioneAggrDats";
const CLOUD_API_TBL_LEZIO_PBASE_AGGR =
  "api/Tables/GetPossibiliLezioniPGMAggregato";
const CLOUD_API_TBL_PBASE_AGGR_ANNO =
  "api/Tables/GetAnnoXProgrammaBaseAggregatoCombo";

const CLOUD_API_CLAS_CONTE = "api/ColeContenutoLezioneDats";
const CLOUD_API_CLAS_CONTE_UPLOAD = "api/ColeContenutoLezioneDats/UploadFile";
const CLOUD_API_TIPO_CONT = "api/TicoTipoContenutoTyps";
const CLOUD_API_TIPO_CONT_COMBO = "api/Tables/GetTipoContenutoCombo";
const CLOUD_API_BREAD_CLAS_ARGO = "api/Tables/GetBreadClasseArgomento";
const CLOUD_API_BREAD_ARG = "api/Tables/GetBreadArgomento";
const CLOUD_API_BREAD_LEZIO = "api/Tables/GetBreadLezione";

//Endpoint
function GetProgrammaBase(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_PBASE}/${id}`;
}
function GetProgrammaBaseCombo(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_PBASE_COMBO}/${id}`;
}
function GetAnnoAggregatoCombo(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_PBASE_AGGR_ANNO}/${id}`;
}
function GetClasseArgomento(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_CLAS_ARG}/${id}`;
}
function GetBreadClasseArgomento(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_BREAD_CLAS_ARGO}/${id}`;
}
function GetClasseArgomentoCombo(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_CLAS_ARG_COMBO}/${id}`;
}
function GetClasseArgomentoComboAggr(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_CLAS_ARG_COMBO_AGG}/${id}`;
}
function GetArgomento(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_ARG}/${id}`;
}
function GetBreadArgomento(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_BREAD_ARG}/${id}`;
}
function GetLezione(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_LEZ}/${id}/0`;
}
function GetLezioneAggr(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LEZIO_PBASE_AGGR}/${id}/0`;
}
function GetBreadLezione(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_BREAD_LEZIO}/${id}`;
}
function GetContenuto(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_CONT}/${id}`;
}

const AnfrAnnoFrequenzaAnas = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_ANNO_FREQ}`;
const MascMateriaScolasticaAnas = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_MAT}`;
const GetRiepilogoProgrammaBase = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_PBASE_RIEPILOGO}`;
const PobaProgrammaBaseAnas = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_PBASE}`;
const ClarClasseArgomentoAnas = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_CLAS_ARGO}`;
const ArgoArgomentoMateriaDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_ARGO_MAT}`;
const LeziLezioneDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_CLAS_LEZIO}`;
const LezaLezioneAggrDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_CLAS_LEZIO_AGGR}`;
const ColeContenutoLezioneDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_CLAS_CONTE}`;
const ColeContenutoLezioneDatsUpload = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_CLAS_CONTE_UPLOAD}`;
const TicoTipoContenutoCombo = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TIPO_CONT_COMBO}`;
const TicoTipoContenutoTyps = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TIPO_CONT}`;

module.exports = {
  GetProgrammaBase,
  GetProgrammaBaseCombo,
  GetAnnoAggregatoCombo,
  GetClasseArgomento,
  GetBreadClasseArgomento,
  GetClasseArgomentoCombo,
  GetClasseArgomentoComboAggr,
  GetArgomento,
  GetBreadArgomento,
  GetLezione,
  GetLezioneAggr,
  GetBreadLezione,
  GetContenuto,
  AnfrAnnoFrequenzaAnas,
  MascMateriaScolasticaAnas,
  GetRiepilogoProgrammaBase,
  PobaProgrammaBaseAnas,
  ClarClasseArgomentoAnas,
  ArgoArgomentoMateriaDats,
  LeziLezioneDats,
  LezaLezioneAggrDats,
  ColeContenutoLezioneDats,
  ColeContenutoLezioneDatsUpload,
  TicoTipoContenutoCombo,
  TicoTipoContenutoTyps,
};
