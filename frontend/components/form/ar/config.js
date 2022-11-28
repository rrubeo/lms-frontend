import {
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
} from "../../grid/config";

//nomi di pagina
const AR_STEP_0 = "ar_search";
const AR_STEP_1 = "ar_ruoli";

const FRM_AR_STEP_0 = "FRM_Ruoli_Ricerca";
const AR_STEP_0_API = `${process.env.server}/ar`;
const AR_STEP_0_ACTION = [
  {
    id: "1",
    title: "Dettaglio",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: AR_STEP_1,
  },
];

const FRM_AR_STEP_1 = "FRM_Ruoli_Assegna";
const AR_STEP_1_API = `${process.env.server}/ar/assegna`;
const AR_STEP_1_ACTION = [
  {
    id: "1",
    title: "Disattiva",
    icon: "icon-blocked",
    callBack: GRID_DELETE_ACTION,
  },
];

const MENU_API = `${process.env.server}/menu`;
const NO_DATA_DESC = "Nessun dato";

function getApiUrl(query) {
  const page = query.param[0];
  let apiUrl = "";
  switch (page) {
    case AR_STEP_0:
      apiUrl = AR_STEP_0_API;
      break;
    case AR_STEP_1:
      apiUrl = AR_STEP_1_API;
      break;
  }

  let param = "";
  for (let i = 1; i < query.param.length; i++) {
    param = param + "/" + query.param[i];
  }

  apiUrl = apiUrl + param;

  return apiUrl;
}

module.exports = {
  getApiUrl,
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
  AR_STEP_0,
  AR_STEP_1,
  FRM_AR_STEP_0,
  AR_STEP_0_API,
  AR_STEP_0_ACTION,
  FRM_AR_STEP_1,
  AR_STEP_1_API,
  AR_STEP_1_ACTION,
  MENU_API,
  NO_DATA_DESC,
};
