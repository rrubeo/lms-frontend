const cfgMain = require("../config");

const CLOUD_API_TBL_ANAG_DOC = "api/Tables/GetAnagraficaDocenti";
function GetAnagraficaDocenti(IdPersona, UserName) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ANAG_DOC}/${IdPersona}/${UserName}`;
}

const CLOUD_API_TBL_DOC_MATERIE = "api/Tables/GetDocenteMateria";
function GetDocenteMateria(IdRuoloUtente, IdMateriaScolastica, IdPersona) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_DOC_MATERIE}/${IdRuoloUtente}/${IdMateriaScolastica}/${IdPersona}`;
}

const CLOUD_API_TBL_MATERIE_COMBO = "api/Tables/GetMateriaScolasticaCombo";
const GetMateriaScolasticaCombo = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_MATERIE_COMBO}`;

const CLOUD_API_DOC_MATERIE = "api/DomaDocenteMateriaRels";
const DomaDocenteMateriaRels = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_DOC_MATERIE}`;

const CLOUD_API_TBL_GET_ORARIO = "api/Tables/GetDisponibilitaOrarie";
function GetDisponibilitaOrarie(IdPersona) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_GET_ORARIO}/${IdPersona}`;
}

const CLOUD_API_TBL_SET_ORARIO = "api/Tables/SetDisponibilitaOrarie";
const SetDisponibilitaOrarie = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_SET_ORARIO}`;

const CLOUD_API_TBL_STUD_DOCENTE = "api/Tables/GetStudenteDocente";
function GetStudenteDocente(
  IdIscrizioneStudente,
  UserNameDocente,
  IdPersonaDocente
) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_STUD_DOCENTE}/${IdIscrizioneStudente}/${UserNameDocente}/${IdPersonaDocente}`;
}

module.exports = {
  GetAnagraficaDocenti,
  GetDocenteMateria,
  GetMateriaScolasticaCombo,
  DomaDocenteMateriaRels,
  GetDisponibilitaOrarie,
  SetDisponibilitaOrarie,
  GetStudenteDocente,
};
