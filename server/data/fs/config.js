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
const CLOUD_API_TBL_LIST_STUDENTE_MATERIE = "api/Tables/GetStudenteMaterie";
const CLOUD_API_TBL_LIST_LEZIONI_SEGUITE = "api/Tables/GetStudenteLezioniSeguite";
const CLOUD_API_TBL_LIST_LEZIONI_DASEGUIRE = "api/Tables/GetLezioniDaSeguirexStudente";
const CLOUD_API_TBL_LIST_DOCENTI_AULA = "api/Tables/GetTUtorDocentexStudente";

//Endpoint
function GetIscrizioneStudente(username) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_ISCRIZIONE_STUDENTE}/${username}`;
}

function GetStudenteMaterie(username, idIscrizione) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_STUDENTE_MATERIE}/${username}/${idIscrizione}`;
}

function GetLezioniSeguite(username, idIscrizione) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_LEZIONI_SEGUITE}/${username}/${idIscrizione}`;
}

function GetLezioniDaSeguire(idIscrizione) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_LEZIONI_DASEGUIRE}/${idIscrizione}`;
}

function GetDocentiAula(idRuolo, idIscrizione, username) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_DOCENTI_AULA}/${idRuolo}/${idIscrizione}/${username}`;
}

function GetTutorAula(idRuolo, idIscrizione, username) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_DOCENTI_AULA}/${idRuolo}/${idIscrizione}/${username}`;
}


//const IscrizioneStudente = `${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_ISCRIZIONE_STUDENTE}`;


module.exports = {
  UserAuthenticate,
  UserValidate,
  GetFunzioniForm,
  GetIscrizioneStudente,
  GetStudenteMaterie,
  GetLezioniSeguite,
  GetLezioniDaSeguire,
  GetDocentiAula,
  GetTutorAula
};




