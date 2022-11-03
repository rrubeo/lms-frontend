//Percorso di base API
const CLOUD_BASE_URL = process.env.API_SERVER;

//API GET lettura profilo studente
const CLOUD_API_TBL_LIST_ISCRIZIONE_STUDENTE =
  "api/Tables/GetIscrizioneStudente";
const CLOUD_API_TBL_LIST_LEZIONI = "api/Tables/GetLezioniStudente";
const CLOUD_API_TBL_LIST_LEZIONI_SEGUITE =
  "api/Tables/GetStudenteLezioniSeguite";
const CLOUD_API_TBL_LIST_DOCENTI_AULA = "api/Tables/GetTUtorDocentexStudente";
const CLOUD_API_TBL_LIST_MATERIA = "api/Tables/GetLezioneContenuto";
const CLOUD_API_TBL_LIST_PDF = "api/Tables/GetColeContenutoLezioneTestoImages";
const CLOUD_API_TBL_DISP_CALENDAR = "api/Tables/GetDisponibilitaCalendario";
const CLOUD_API_TBL_DISP_CALENDAR_TUTOR =
  "api/Tables/GetDisponibilitaCalendarioTutor";
const CLOUD_API_TBL_STUD_DOC = "api/Tables/GetStudenteDocente";
const CLOUD_API_TBL_CREDITI = "api/Tables/GetDisponibilitaCrediti";

//Endpoint
function GetDisponibilitaCrediti(IdIscrizione, NumMinimoMinuti, NumMaxMinuti) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_CREDITI}/${IdIscrizione}/${NumMinimoMinuti}/${NumMaxMinuti}`;
}

function GetIscrizioneStudente(username) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_ISCRIZIONE_STUDENTE}/${username}`;
}

function GetLezioni(username, classeArgomento) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_LEZIONI}/${username}/${classeArgomento}`;
}

function GetLezioniSeguite(username, idIscrizione, maxNumber) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_LEZIONI_SEGUITE}/${username}/${idIscrizione}/${maxNumber}`;
}

function GetDocentiAula(idRuolo, idIscrizione, username) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_DOCENTI_AULA}/${idRuolo}/${idIscrizione}/${username}`;
}

function GetTutorAula(idRuolo, idIscrizione, username) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_DOCENTI_AULA}/${idRuolo}/${idIscrizione}/${username}`;
}

function GetLezione(idLezione) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_MATERIA}/${idLezione}`;
}

function GetPDF(idContenuto) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_PDF}/${idContenuto}`;
}

function GetDisponibilitaCalendario(
  UserNameDocente,
  Data,
  NumeroGiorniCalendario,
  IdIscrizione,
  IdIscrizioneAppuntamento,
  IdDocenteStudente
) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_DISP_CALENDAR}/${UserNameDocente}/${Data}/${NumeroGiorniCalendario}/${IdIscrizione}/${IdIscrizioneAppuntamento}/${IdDocenteStudente}`;
}

function GetDisponibilitaCalendarioTutor(
  UserNameTutor,
  Data,
  NumeroGiorniCalendario,
  IdIscrizione,
  IdIscrizioneAppuntamento,
  IdTutorStudente
) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_DISP_CALENDAR_TUTOR}/${UserNameTutor}/${Data}/${NumeroGiorniCalendario}/${IdIscrizione}/${IdIscrizioneAppuntamento}/${IdTutorStudente}`;
}

function GetStudenteDocente(IdIscrizione, UserNameDocente, IdPersona) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_STUD_DOC}/${IdIscrizione}/${UserNameDocente}/${IdPersona}`;
}

const CLOUD_API_TBL_STUD = "api/Tables/GetStudTutor";
function GetStudTutor(IdIscrizioneStudente, UserNameTutor, IdRuoloUtente) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_STUD}/${IdIscrizioneStudente}/${UserNameTutor}/${IdRuoloUtente}`;
}

const CLOUD_API_APPUNTAMENTI = "api/AppuAppuntamentiDats";
const AppuAppuntamentiDats = `${CLOUD_BASE_URL}/${CLOUD_API_APPUNTAMENTI}`;

module.exports = {
  GetDisponibilitaCrediti,
  GetIscrizioneStudente,
  GetLezioni,
  GetLezioniSeguite,
  GetDocentiAula,
  GetTutorAula,
  GetLezione,
  GetPDF,
  GetDisponibilitaCalendario,
  GetDisponibilitaCalendarioTutor,
  GetStudenteDocente,
  GetStudTutor,
  AppuAppuntamentiDats,
};
