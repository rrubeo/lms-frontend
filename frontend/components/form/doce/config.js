import {
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
  GRID_UPDATE_ACTION,
} from "../../grid/config";

const DOCE_STEP_0 = "doce_search";
const DOCE_STEP_1 = "doce_materie";
const DOCE_STEP_2 = "doce_orario";

const FRM_DOCE_STEP_0 = "FRM_Docenti_Ricerca";
const DOCE_STEP_0_API = `${process.env.server}/doce`;
const DOCE_STEP_0_ACTION = [
  {
    id: "1",
    title: "Materie",
    icon: "icon-teacher-assignment",
    callBack: GRID_ROUTE_ACTION,
    route: DOCE_STEP_1,
  },
  {
    id: "2",
    title: "Piano Orario",
    icon: "icon-clock",
    callBack: GRID_ROUTE_ACTION,
    route: DOCE_STEP_2,
  },
];

const FRM_DOCE_STEP_1 = "FRM_Docenti_Materie";
const DOCE_STEP_1_API = `${process.env.server}/doce/materie`;
const DOCE_STEP_1_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
];

const FRM_DOCE_STEP_2 = "FRM_Docenti_Orario";
const DOCE_STEP_2_API = `${process.env.server}/doce/orario`;
const DOCE_STEP_2_ACTION = [];

const MENU_API = `${process.env.server}/menu`;
const NO_DATA_DESC = "Nessun dato";

function getApiUrl(query) {
  const page = query.param[0];
  let apiUrl = "";
  switch (page) {
    case DOCE_STEP_0:
      apiUrl = DOCE_STEP_0_API;
      break;
    case DOCE_STEP_1:
      apiUrl = DOCE_STEP_1_API;
      break;
    case DOCE_STEP_2:
      apiUrl = DOCE_STEP_2_API;
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
  DOCE_STEP_0,
  FRM_DOCE_STEP_0,
  DOCE_STEP_0_API,
  DOCE_STEP_0_ACTION,
  DOCE_STEP_1,
  FRM_DOCE_STEP_1,
  DOCE_STEP_1_API,
  DOCE_STEP_1_ACTION,
  DOCE_STEP_2,
  FRM_DOCE_STEP_2,
  DOCE_STEP_2_API,
  DOCE_STEP_2_ACTION,
  MENU_API,
  NO_DATA_DESC,
};
