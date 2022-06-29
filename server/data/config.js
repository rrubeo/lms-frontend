//Percorso di base API
const CLOUD_BASE_URL = process.env.API_SERVER;

//API autorizzazione token
const CLOUD_API_TOKEN = "api/User/authenticate";
const CLOUD_API_VALID_TOKEN = "api/User/ValidateToken";
//Endpoint
const UserAuthenticate = `${CLOUD_BASE_URL}/${CLOUD_API_TOKEN}`;
const UserValidate = `${CLOUD_BASE_URL}/${CLOUD_API_VALID_TOKEN}`;

//API autorizzazione funzioni FORM
const CLOUD_API_FORM = "api/Tables/GetFunzioniRuoliForm";
//Endpoint
function GetFunzioniForm(user, formName) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_FORM}/${user}/${formName}`;
}

//API GET lettura programma base completo
const CLOUD_API_TBL_LIST_PBASE = "api/Tables/GetProgrammaBase";
const CLOUD_API_TBL_LIST_PBASE_COMBO = "api/Tables/GetProgrammaBaseCombo";
const CLOUD_API_TBL_LIST_CLAS_ARG =
  "api/Tables/GetClasseArgomentoXProgrammaBase";
const CLOUD_API_TBL_LIST_CLAS_ARG_COMBO =
  "api/Tables/GetClasseArgomentoXProgrammaBaseCombo";
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

const CLOUD_API_CLAS_CONTE = "api/ColeContenutoLezioneDats";
const CLOUD_API_CLAS_CONTE_UPLOAD = "api/ColeContenutoLezioneDats/UploadFile";
const CLOUD_API_TIPO_CONT = "api/TicoTipoContenutoTyps";
const CLOUD_API_TIPO_CONT_COMBO = "api/Tables/GetTipoContenutoCombo";
const CLOUD_API_BREAD_CLAS_ARGO = "api/Tables/GetBreadClasseArgomento";
const CLOUD_API_BREAD_ARG = "api/Tables/GetBreadArgomento";
const CLOUD_API_BREAD_LEZIO = "api/Tables/GetBreadLezione";
//Endpoint
function GetProgrammaBase(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_PBASE}/${id}`;
}
function GetProgrammaBaseCombo(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_PBASE_COMBO}/${id}`;
}
function GetClasseArgomento(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_CLAS_ARG}/${id}`;
}
function GetBreadClasseArgomento(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_BREAD_CLAS_ARGO}/${id}`;
}
function GetClasseArgomentoCombo(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_CLAS_ARG_COMBO}/${id}`;
}
function GetArgomento(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_ARG}/${id}`;
}
function GetBreadArgomento(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_BREAD_ARG}/${id}`;
}
function GetLezione(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_LEZ}/${id}/0`;
}
function GetLezioneAggr(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LEZIO_PBASE_AGGR}/${id}/0`;
}
function GetBreadLezione(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_BREAD_LEZIO}/${id}`;
}
function GetContenuto(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_CONT}/${id}`;
}
const PobaProgrammaBaseAnas = `${CLOUD_BASE_URL}/${CLOUD_API_PBASE}`;
const AnfrAnnoFrequenzaAnas = `${CLOUD_BASE_URL}/${CLOUD_API_ANNO_FREQ}`;
const MascMateriaScolasticaAnas = `${CLOUD_BASE_URL}/${CLOUD_API_MAT}`;
const ArgoArgomentoMateriaDats = `${CLOUD_BASE_URL}/${CLOUD_API_ARGO_MAT}`;
const ClarClasseArgomentoAnas = `${CLOUD_BASE_URL}/${CLOUD_API_CLAS_ARGO}`;
const GetRiepilogoProgrammaBase = `${CLOUD_BASE_URL}/${CLOUD_API_TBL_PBASE_RIEPILOGO}`;
const LeziLezioneDats = `${CLOUD_BASE_URL}/${CLOUD_API_CLAS_LEZIO}`;
const LezaLezioneAggrDats = `${CLOUD_BASE_URL}/${CLOUD_API_CLAS_LEZIO_AGGR}`;
const ColeContenutoLezioneDats = `${CLOUD_BASE_URL}/${CLOUD_API_CLAS_CONTE}`;
const ColeContenutoLezioneDatsUpload = `${CLOUD_BASE_URL}/${CLOUD_API_CLAS_CONTE_UPLOAD}`;
const TicoTipoContenutoTyps = `${CLOUD_BASE_URL}/${CLOUD_API_TIPO_CONT}`;
const TicoTipoContenutoCombo = `${CLOUD_BASE_URL}/${CLOUD_API_TIPO_CONT_COMBO}`;
//API GET lettura programma indirizzo completo
const CLOUD_API_TBL_PINDI = "api/Tables/GetIndirizzoIstituto";
const CLOUD_API_TBL_LIST_ANNO_IST = "api/Tables/GetAnnoIndirizzoIstituto";
const CLOUD_API_TBL_LIST_ANNO_IND = "api/Tables/GetAnnoIndirizzo";
const CLOUD_API_TBL_LIST_LEZ_CLAS_ARG =
  "api/Tables/GetLezionePerClasseArgomento";
const CLOUD_API_TBL_LIST_PINDI = "api/Tables/GetProgrammaIndirizzo";
const CLOUD_API_PINDI = "api/PrinProgrammaIndirizzoDats";
const CLOUD_API_IND_IST = "api/AninAnnoIndirizzoAnas";
const CLOUD_API_TBL_PINDI_CLAS_ARG_COMBO =
  "api/Tables/GetClasseArgomentoXProgrammaIndirizzoCombo";

//Endpoint
function GetPindiClasseArgomentoCombo(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_PINDI_CLAS_ARG_COMBO}/${id}`;
}
function GetIndirizzoIstituto(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_PINDI}/${id}`;
}
function GetAnnoIndirizzoIstituto(IdIndirizzoIstituto, IdProgrammaBase) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_ANNO_IST}/${IdIndirizzoIstituto}/${IdProgrammaBase}`;
}
function GetAnnoIndirizzo(idAnnoIndirizzoIstituto) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_ANNO_IND}/${idAnnoIndirizzoIstituto}`;
}
function GetLezionePerClasseArgomento(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_LEZ_CLAS_ARG}/${id}`;
}
function GetProgrammaIndirizzo(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_PINDI}/${id}`;
}
const PrinProgrammaIndirizzoDats = `${CLOUD_BASE_URL}/${CLOUD_API_PINDI}`;
const AninAnnoIndirizzoAnas = `${CLOUD_BASE_URL}/${CLOUD_API_IND_IST}`;

const CLOUD_API_ANNO_ACC = "api/AnacAnnoAccademicoAnas";
const CLOUD_API_APPU_DAT = "api/AppuAppuntamentiDats";
const CLOUD_API_CAT_MAT = "api/CamaCategoriaMateriaAnas";
const CLOUD_API_CAT_IST = "api/CateCategoriaIstitutoAnas";
const CLOUD_API_CONTEST = "api/ContContestoAnas";

const CLOUD_API_TBL_MENU_NONSTU = "api/Tables/GetMenuNonStudenti";

const AnacAnnoAccademicoAnas = `${CLOUD_BASE_URL}/${CLOUD_API_ANNO_ACC}`;
const AppuAppuntamentiDats = `${CLOUD_BASE_URL}/${CLOUD_API_APPU_DAT}`;
const CamaCategoriaMateriaAnas = `${CLOUD_BASE_URL}/${CLOUD_API_CAT_MAT}`;
const CateCategoriaIstitutoAnas = `${CLOUD_BASE_URL}/${CLOUD_API_CAT_IST}`;
const ContContestoAnas = `${CLOUD_BASE_URL}/${CLOUD_API_CONTEST}`;

function GetMenuNonStudenti(utenza) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_MENU_NONSTU}/${utenza}`;
}

module.exports = {
  UserAuthenticate,
  UserValidate,
  AnfrAnnoFrequenzaAnas,
  MascMateriaScolasticaAnas,
  PobaProgrammaBaseAnas,
  ClarClasseArgomentoAnas,
  ArgoArgomentoMateriaDats,
  TicoTipoContenutoTyps,
  TicoTipoContenutoCombo,
  GetMenuNonStudenti,
  GetProgrammaBase,
  GetProgrammaBaseCombo,
  GetClasseArgomento,
  GetBreadClasseArgomento,
  GetClasseArgomentoCombo,
  GetArgomento,
  GetBreadArgomento,
  GetLezione,
  GetLezioneAggr,
  GetBreadLezione,
  GetContenuto,
  GetFunzioniForm,
  GetRiepilogoProgrammaBase,
  ClarClasseArgomentoAnas,
  ColeContenutoLezioneDats,
  ColeContenutoLezioneDatsUpload,
  LeziLezioneDats,
  LezaLezioneAggrDats,
  GetPindiClasseArgomentoCombo,
  GetIndirizzoIstituto,
  GetAnnoIndirizzoIstituto,
  GetAnnoIndirizzo,
  GetLezionePerClasseArgomento,
  GetProgrammaIndirizzo,
  PrinProgrammaIndirizzoDats,
  AninAnnoIndirizzoAnas,
};
