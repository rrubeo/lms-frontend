const cfgMain = require("../config");

const CLOUD_API_TBL_ANAG_STU = "api/Tables/GetAnagraficaStudente";
function GetAnagraficaStudente(userName) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ANAG_STU}/${userName}`;
}

const CLOUD_API_TBL_ISCR_STU_ = "api/Tables/GetIscrizioneStudentexIdPersona";
function GetIscrizioneStudentexIdPersona(userName, idPersona) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ISCR_STU_}/${userName}/${idPersona}`;
}

const CLOUD_API_TBL_ISTI_INDI_COMBO =
  "api/Tables/GetTipoIstitutoIndirizzoCombo";
function GetTipoIstitutoIndirizzoCombo(IdTipoIstituto) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ISTI_INDI_COMBO}/${IdTipoIstituto}`;
}

const CLOUD_API_TBL_ANNO_ACC = "api/Tables/GetAnnoAccademicoCombo";
const GetAnnoAccademicoCombo = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ANNO_ACC}`;

const CLOUD_API_TBL_TIPO_STU = "api/Tables/GetTipoStudenteCombo";
const GetTipoStudenteCombo = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_TIPO_STU}`;

const CLOUD_API_ISCR_STU = "api/IstuIscrizioneStudenteDats";
const IstuIscrizioneStudenteDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_ISCR_STU}`;

module.exports = {
  GetAnagraficaStudente,
  GetIscrizioneStudentexIdPersona,
  GetTipoIstitutoIndirizzoCombo,
  GetAnnoAccademicoCombo,
  GetTipoStudenteCombo,
  IstuIscrizioneStudenteDats,
};
