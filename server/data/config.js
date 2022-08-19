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
const CLOUD_API_TBL_PAESE = "api/Tables/GetPaeseCombo";
function GetPaeseCombo(IdPaese) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_PAESE}/${IdPaese}`;
}
const CLOUD_API_TBL_REGIONE = "api/Tables/GetRegioneCombo";
function GetRegioneCombo(IdRegione) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_REGIONE}/${IdRegione}`;
}
const CLOUD_API_TBL_COMUNE = "api/Tables/GetComuneCombo";
function GetComuneCombo(IdProvincia) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_COMUNE}/${IdProvincia}`;
}
const CLOUD_API_TBL_PROVINCIA = "api/Tables/GetProvinciaCombo";
function GetProvinciaCombo(IdRegione, IdProvincia) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_PROVINCIA}/${IdRegione}/${IdProvincia}`;
}
const CLOUD_API_TBL_TOPONIMO = "api/Tables/GetToponimoCombo";
const GetToponimoCombo = `${CLOUD_BASE_URL}/${CLOUD_API_TBL_TOPONIMO}`;

const CLOUD_API_TBL_ANAG_PERS = "api/Tables/GetAnagraficaPersone";
function GetAnagraficaPersone(IdPersona) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_ANAG_PERS}/${IdPersona}`;
}

const CLOUD_API_PERSONA = "api/PersPersonaDats";
const PersPersonaDats = `${CLOUD_BASE_URL}/${CLOUD_API_PERSONA}`;

const CLOUD_API_TBL_MENU_NONSTU = "api/Tables/GetMenuNonStudenti";
const CLOUD_API_TBL_ISCR_STUD = "api/Tables/GetIscrizioneStudente";

function GetIscrizioneStudente(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_ISCR_STUD}/${id}`;
}

function GetMenuNonStudenti(utenza) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_MENU_NONSTU}/${utenza}`;
}

const CLOUD_API_TBL_RUOLO_USER = "api/Tables/GetRuoloUtente";
function GetRuoloUtente(IdUtenteUserName, IdRuoloUtente) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_RUOLO_USER}/${IdUtenteUserName}/${IdRuoloUtente}`;
}

module.exports = {
  CLOUD_BASE_URL,
  UserAuthenticate,
  UserValidate,
  GetFunzioniForm,
  GetPaeseCombo,
  GetRegioneCombo,
  GetProvinciaCombo,
  GetComuneCombo,
  GetToponimoCombo,
  GetAnagraficaPersone,
  PersPersonaDats,
  GetMenuNonStudenti,
  GetIscrizioneStudente,
  GetRuoloUtente,
};
