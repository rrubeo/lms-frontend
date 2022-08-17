const cfgMain = require("../config");

const CLOUD_API_TBL_ANAG_STU = "api/Tables/GetAnagraficaStudente";
function GetAnagraficaStudente(userName) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ANAG_STU}/${userName}`;
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

const CLOUD_API_TBL_ISTI_INDI_COMBO =
  "api/Tables/GetTipoIstitutoIndirizzoCombo";
function GetTipoIstitutoIndirizzoCombo(IdTipoIstituto) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ISTI_INDI_COMBO}/${IdTipoIstituto}`;
}

const CLOUD_API_TBL_ANNO_IND = "api/Tables/GetAnnoIndirizzo";
function GetAnnoIndirizzo(IdAnnoIndirizzoIstituto) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ANNO_IND}/${IdAnnoIndirizzoIstituto}`;
}

const CLOUD_API_TBL_ANNO_ACC = "api/Tables/GetAnnoAccademicoCombo";
const GetAnnoAccademicoCombo = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ANNO_ACC}`;

const CLOUD_API_TBL_TIPO_STU = "api/Tables/GetTipoStudenteCombo";
const GetTipoStudenteCombo = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_TIPO_STU}`;

const CLOUD_API_ISCR_STU = "api/IstuIscrizioneStudenteDats";
const IstuIscrizioneStudenteDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_ISCR_STU}`;

const CLOUD_API_FREQ_PAGA = "api/FpagFrequenzaPagamentoTyps";
const FpagFrequenzaPagamentoTyps = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_FREQ_PAGA}`;

const CLOUD_API_TBL_SERV = "api/Tables/GetServizio";
const GetServizio = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_SERV}`;

const CLOUD_API_TBL_SERV_SOTTO = "api/Tables/GetServizioSottoscritto";
function GetServizioSottoscritto(IdIscrizioneStudente, IdServizio) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_SERV_SOTTO}/${IdIscrizioneStudente}/${IdServizio}`;
}

const CLOUD_API_TBL_PAGA = "api/Tables/GetPagamentoStudente";
function GetPagamentoStudente(IdIscrizioneStudente) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_PAGA}/${IdIscrizioneStudente}`;
}

const CLOUD_API_SERV_SOTTO = "api/SesoServizioSottoscrittoDats";
const SesoServizioSottoscrittoDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_SERV_SOTTO}`;

const CLOUD_API_PAGA = "api/PastPagamentoStudenteDats";
const PastPagamentoStudenteDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_PAGA}`;

const CLOUD_API_TUTOR = "api/StutStudenteTutorRels";
const StutStudenteTutorRels = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TUTOR}`;

const CLOUD_API_DOCENTE = "api/StdoStudenteDocenteRels";
const StdoStudenteDocenteRels = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_DOCENTE}`;

const CLOUD_API_TBL_TUTOR = "api/Tables/GetRuoloUtente";
function GetRuoloUtente(IdUtenteUserName, IdRuoloUtente) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_TUTOR}/${IdUtenteUserName}/${IdRuoloUtente}`;
}

const CLOUD_API_TBL_STUD = "api/Tables/GetStudenteTutor";
function GetStudenteTutor(IdIscrizioneStudente, IdRuoloUtente) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_STUD}/${IdIscrizioneStudente}/${IdRuoloUtente}`;
}

const CLOUD_API_TBL_STUD_DOCENTE = "api/Tables/GetStudenteDocente";
function GetStudenteDocente(IdIscrizioneStudente, IdRuoloUtente) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_STUD_DOCENTE}/${IdIscrizioneStudente}/${IdRuoloUtente}`;
}

const CLOUD_API_TBL_MATERIE = "api/Tables/GetMateriaScolasticaCombo";
const GetMateriaScolasticaCombo = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_MATERIE}`;

const CLOUD_API_TBL_DOCENTE_MATERIA = "api/Tables/GetDocenteMateria";
function GetDocenteMateria(IdRuoloUtente, IdMateriaScolastica) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_DOCENTE_MATERIA}/${IdRuoloUtente}/${IdMateriaScolastica}`;
}

module.exports = {
  GetAnagraficaStudente,
  GetIscrizioneStudentexIdPersona,
  GetTipoIstitutoIndirizzoCombo,
  GetAnnoIndirizzo,
  GetAnnoAccademicoCombo,
  GetTipoStudenteCombo,
  IstuIscrizioneStudenteDats,
  FpagFrequenzaPagamentoTyps,
  GetServizio,
  GetServizioSottoscritto,
  GetPagamentoStudente,
  SesoServizioSottoscrittoDats,
  PastPagamentoStudenteDats,
  StutStudenteTutorRels,
  StdoStudenteDocenteRels,
  GetRuoloUtente,
  GetStudenteTutor,
  GetStudenteDocente,
  GetMateriaScolasticaCombo,
  GetDocenteMateria,
};
