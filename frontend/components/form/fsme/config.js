//nomi di pagina
const IMAGE_BASE_URL = "https://lmsfilesdev.cloudandpartners.com";

const FSME_STEP_0 = "fsme_home";
const FSME_STEP_1 = "fsme_dettaglio";
const FSME_STEP_2 = "fsme_aula";
const FSME_STEP_3 = "fsme_esercitazione";
const FSME_STEP_4 = "fsme_richiesta";

const FRM_FSME_STEP_0 = "FRM_Studente_Home";
const FSME_STEP_0_API = `${process.env.server}/fsme`;

const FRM_FSME_STEP_1 = "FRM_Studente_Lezione";
const FSME_STEP_1_API = `${process.env.server}/fsme`;

const FRM_FSME_STEP_2 = "FRM_Studente_Aula";
const FSME_STEP_2_API = `${process.env.server}/fsme/aula`;

const FRM_FSME_STEP_3 = "FRM_Studente_Esercitazione";
const FSME_STEP_3_API = `${process.env.server}/fsme`;

const FRM_FSME_STEP_4 = "FRM_Studente_Richiesta";
const FSME_STEP_4_API = `${process.env.server}/fsme/richiesta`;

function getApiUrl(query) {
  const page = query.param[0];
  let apiUrl = "";
  switch (page) {
    case FSME_STEP_0:
      apiUrl = FSME_STEP_0_API;
      break;
    case FSME_STEP_1:
      apiUrl = FSME_STEP_1_API;
      break;
    case FSME_STEP_2:
      apiUrl = FSME_STEP_2_API;
      break;
    case FSME_STEP_3:
      apiUrl = FSME_STEP_3_API;
      break;
    case FSME_STEP_4:
      apiUrl = FSME_STEP_4_API;
      break;
  }

  let param = "";
  for (let i = 1; i < query.param.length; i++) {
    param = param + "/" + query.param[i];
  }

  apiUrl = apiUrl + param;
  console.log(apiUrl);

  return apiUrl;
}

module.exports = {
  getApiUrl,
  IMAGE_BASE_URL,
  FSME_STEP_0,
  FSME_STEP_1,
  FSME_STEP_2,
  FSME_STEP_3,
  FSME_STEP_4,
  FRM_FSME_STEP_0,
  FSME_STEP_0_API,
  FRM_FSME_STEP_1,
  FSME_STEP_1_API,
  FRM_FSME_STEP_2,
  FSME_STEP_2_API,
  FRM_FSME_STEP_3,
  FSME_STEP_3_API,
  FRM_FSME_STEP_4,
  FSME_STEP_4_API,
};
