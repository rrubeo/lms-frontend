const cfgMain = require("../config");

const CLOUD_API_TBL_MON_STUD = "api/Tables/GetStudenteXMonitoraggio";
const GetStudenteXMonitoraggio = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_MON_STUD}`;

const CLOUD_API_SEARCH_APPU_DOC = "api/Tables/GetAppuntamentiDocentiTutor";
const GetAppuntamentiDocentiTutor = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_SEARCH_APPU_DOC}`;

const CLOUD_API_TBL_APPUNTAMENTI = "api/Tables/GetElencoAppuntamenti";
function GetElencoAppuntamenti(
  UserName,
  DataInizio,
  DataFine,
  IdIscrizione,
  IdStatoAppuntamento,
  IdAppuntamento,
  IdTipoAppuntamento
) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_APPUNTAMENTI}/${UserName}/${DataInizio}/${DataFine}/${IdIscrizione}/${IdStatoAppuntamento}/${IdAppuntamento}/${IdTipoAppuntamento}`;
}

const CLOUD_API_TBL_ISCR_STUD = "api/Tables/GetIscrizioneStudente";
function GetIscrizioneStudente(id) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ISCR_STUD}/${id}`;
}

const CLOUD_API_TBL_ISCR_STUD_ATTIVA = "api/Tables/GetIscrizioneStudenteAttiva";
function GetIscrizioneStudenteAttiva(UserName, IdIscrizione, IdPersona) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ISCR_STUD_ATTIVA}/${UserName}/${IdIscrizione}/${IdPersona}`;
}

const CLOUD_API_TBL_ANAG_DOC = "api/Tables/GetAnagraficaDocenti";
function GetAnagraficaDocenti(IdPersona, UserName) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ANAG_DOC}/${IdPersona}/${UserName}`;
}

const CLOUD_API_NOTIFICHE = "api/NotiNotificheDats";
const NotiNotificheDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_NOTIFICHE}`;

const CLOUD_API_APPUNTAMENTI = "api/AppuAppuntamentiDats";
const AppuAppuntamentiDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_APPUNTAMENTI}`;

module.exports = {
  GetStudenteXMonitoraggio,
  GetAppuntamentiDocentiTutor,
  GetElencoAppuntamenti,
  GetAnagraficaDocenti,
  GetIscrizioneStudente,
  NotiNotificheDats,
  AppuAppuntamentiDats,
  GetIscrizioneStudenteAttiva,
};
