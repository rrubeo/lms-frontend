const cfgMain = require("../config");

const CLOUD_API_TBL_STUD_TUT = "api/Tables/GetStudTutor";
function GetStudTutor(IdIscrizioneStudente, UserNameTutor) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_STUD_TUT}/${IdIscrizioneStudente}/${UserNameTutor}/0  `;
}

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

const CLOUD_API_TBL_STUD_TUT_DETT = "api/Tables/GetStudenteTutorDettaglio";
function GetStudenteTutorDettaglio(IdIscrizioneStudente) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_STUD_TUT_DETT}/${IdIscrizioneStudente}`;
}

const CLOUD_API_TBL_ISCR_STU_ = "api/Tables/GetIscrizioneStudentexIdPersona";
function GetIscrizioneStudentexIdPersona(
  userName,
  idPersona,
  idAnnoFrequenza,
  idIndirizzoIstituto,
  IdIscrizione
) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ISCR_STU_}/${userName}/${idPersona}/${idAnnoFrequenza}/${idIndirizzoIstituto}/${IdIscrizione}`;
}

module.exports = {
  GetStudTutor,
  GetElencoAppuntamenti,
  GetStudenteTutorDettaglio,
  GetIscrizioneStudentexIdPersona,
};
