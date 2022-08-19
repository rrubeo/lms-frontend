import {
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
  GRID_UPDATE_ACTION,
} from "../../grid/config";

//nomi di pagina
const GSTU_STEP_0 = "gs_search";
const GSTU_STEP_1 = "gs_dett";
const GSTU_STEP_2 = "gs_iscrizione";

const FRM_GSTU_STEP_0 = "FRM_GestStud_Ricerca";
const GSTU_STEP_0_API = `${process.env.server}/gstu`;
const GSTU_STEP_0_ACTION = [
  {
    id: "1",
    title: "Dettaglio",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: GSTU_STEP_1,
  },
];

const FRM_GSTU_STEP_1 = "FRM_GestStud_Dettaglio";
const GSTU_STEP_1_API = `${process.env.server}/gstu/dettaglio`;
const GSTU_STEP_1_ACTION = [
  {
    id: "1",
    title: "Attiva/Disattiva",
    icon: "icon-switch",
    callBack: GRID_UPDATE_ACTION,
    route: GSTU_STEP_1,
  },
  {
    id: "2",
    title: "Dettaglio",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: GSTU_STEP_2,
  },
  {
    id: "3",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
];

const FRM_GSTU_STEP_2 = "FRM_GestStud_Iscrizione";
const GSTU_STEP_2_API = `${process.env.server}/gstu/iscrizione`;
const GSTU_STEP_2_API_1 = `${process.env.server}/gstu/servizi`;
const GSTU_STEP_2_API_2 = `${process.env.server}/gstu/piano`;
const GSTU_STEP_2_API_3 = `${process.env.server}/gstu/pagamenti`;
const GSTU_STEP_2_API_4 = `${process.env.server}/gstu/tutor`;
const GSTU_STEP_2_API_5 = `${process.env.server}/gstu/docenti`;
const GSTU_STEP_2_ACTION = [];

const MENU_API = `${process.env.server}/menu`;
const NO_DATA_DESC = "Nessun dato";

function getApiUrl(query) {
  const page = query.param[0];
  let apiUrl = "";
  switch (page) {
    case GSTU_STEP_0:
      apiUrl = GSTU_STEP_0_API;
      break;
    case GSTU_STEP_1:
      apiUrl = GSTU_STEP_1_API;
      break;
    case GSTU_STEP_2:
      apiUrl = GSTU_STEP_2_API;
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
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
  GRID_UPDATE_ACTION,
  GSTU_STEP_0,
  FRM_GSTU_STEP_0,
  GSTU_STEP_0_API,
  GSTU_STEP_0_ACTION,
  GSTU_STEP_1,
  FRM_GSTU_STEP_1,
  GSTU_STEP_1_API,
  GSTU_STEP_1_ACTION,
  GSTU_STEP_2,
  FRM_GSTU_STEP_2,
  GSTU_STEP_2_API,
  GSTU_STEP_2_API_1,
  GSTU_STEP_2_API_2,
  GSTU_STEP_2_API_3,
  GSTU_STEP_2_API_4,
  GSTU_STEP_2_API_5,
  GSTU_STEP_2_ACTION,
  MENU_API,
  NO_DATA_DESC,
};
