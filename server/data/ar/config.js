const cfgMain = require("../config");

const CLOUD_API_TBL_UTENTE = "api/Tables/GetUtente";
function GetUtente(IdPersona) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_UTENTE}/${IdPersona}`;
}

const CLOUD_API_TBL_VALIDA_UTENTE = "api/Tables/GetValidaUserName";
function GetValidaUserName(UserName) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_VALIDA_UTENTE}/${UserName}`;
}

const CLOUD_API_TBL_RUOLO_PERS = "api/Tables/GetRuoloPersona";
function GetRuoloPersona(IdPersona, IdUtenteUserName, IdRuoloUtente) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_RUOLO_PERS}/${IdPersona}/${IdUtenteUserName}/${IdRuoloUtente}`;
}

const CLOUD_API_UTENTE = "api/UtntUtenteDats";
const UtntUtenteDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_UTENTE}`;

const CLOUD_API_TBL_RUOLO = "api/Tables/GetRuolo";
const GetRuolo = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_RUOLO}`;

const CLOUD_API_RUOLO_UTENTE = "api/RuutRuoloUtenteDats";
const RuutRuoloUtenteDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_RUOLO_UTENTE}`;

module.exports = {
  GetUtente,
  GetRuoloPersona,
  GetValidaUserName,
  GetRuolo,
  RuutRuoloUtenteDats,
  UtntUtenteDats,
};
