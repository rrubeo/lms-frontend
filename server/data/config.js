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

const CLOUD_API_ANNO_ACC = "api/AnacAnnoAccademicoAnas";
const CLOUD_API_APPU_DAT = "api/AppuAppuntamentiDats";
const CLOUD_API_CAT_MAT = "api/CamaCategoriaMateriaAnas";
const CLOUD_API_CAT_IST = "api/CateCategoriaIstitutoAnas";
const CLOUD_API_CONTEST = "api/ContContestoAnas";

const CLOUD_API_TBL_MENU_NONSTU = "api/Tables/GetMenuNonStudenti";

const AnacAnnoAccademicoAnas = `${CLOUD_BASE_URL}/${CLOUD_API_ANNO_ACC}`;
const AppuAppuntamentiDats = `${CLOUD_BASE_URL}/${CLOUD_API_APPU_DAT}`;
const CamaCategoriaMateriaAnas = `${CLOUD_BASE_URL}/${CLOUD_API_CAT_MAT}`;
const CateCategoriaIstitutoAnas = `${CLOUD_BASE_URL}/${CLOUD_API_CAT_IST}`;
const ContContestoAnas = `${CLOUD_BASE_URL}/${CLOUD_API_CONTEST}`;

const CLOUD_API_TBL_ISCR_STUD = "api/Tables/GetIscrizioneStudente";

function GetIscrizioneStudente(id) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_ISCR_STUD}/${id}`;
}

function GetMenuNonStudenti(utenza) {
  return `${CLOUD_BASE_URL}/${CLOUD_API_TBL_MENU_NONSTU}/${utenza}`;
}

module.exports = {
  CLOUD_BASE_URL,
  UserAuthenticate,
  UserValidate,
  GetMenuNonStudenti,
  GetFunzioniForm,
  GetIscrizioneStudente,
};
