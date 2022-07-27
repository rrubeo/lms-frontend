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

//API GET lettura profilo studente
const CLOUD_API_TBL_LIST_ISCRIZIONE_STUDENTE = "api/Tables/GetIscrizioneStudente";
const CLOUD_API_TBL_LIST_LEZIONI = "api/Tables/GetLezioniStudente";
const CLOUD_API_TBL_LIST_LEZIONI_SEGUITE = "api/Tables/GetStudenteLezioniSeguite";
const CLOUD_API_TBL_LIST_DOCENTI_AULA = "api/Tables/GetTUtorDocentexStudente";
const CLOUD_API_TBL_LIST_MATERIA = "api/Tables/GetLezioneContenuto";
const CLOUD_API_TBL_LIST_PDF = "api/Tables/GetColeContenutoLezioneTestoImages";


//Endpoint
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


//const IscrizioneStudente = `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_ISCRIZIONE_STUDENTE}`;


module.exports = {
  UserAuthenticate,
  UserValidate,
  GetFunzioniForm,
  GetIscrizioneStudente,
  GetLezioni,
  GetLezioniSeguite,
  GetDocentiAula,
  GetTutorAula,
  GetLezione,
  GetPDF
};




