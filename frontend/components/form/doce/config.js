import {
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
  GRID_UPDATE_ACTION,
} from "../../grid/config";

const DOCE_STEP_0 = "doce_search";
const DOCE_STEP_1 = "doce_materie";
const DOCE_STEP_2 = "doce_orario";
const DOCE_STEP_3 = "doce_studenti";
const DOCE_STEP_4 = `doce_lezioni`;
const DOCE_STEP_5 = `doce_appuntamenti`;
const DOCE_STEP_6 = `doce_dettaglio`;

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

const FRM_DOCE_STEP_3 = "FRM_Tutor_Studenti";
const DOCE_STEP_3_API = `${process.env.server}/doce/studenti`;

const DOCE_STEP_3_ACTION = [
  {
    id: "1",
    title: "Dettaglio",
    icon: "icon-program-management",
    callBack: GRID_ROUTE_ACTION,
    route: DOCE_STEP_6,
  },
  {
    id: "2",
    title: "Appuntamenti",
    icon: "icon-clock",
    callBack: GRID_ROUTE_ACTION,
    route: DOCE_STEP_5,
  },
  {
    id: "3",
    title: "Lezioni",
    icon: "icon-teacher-assignment",
    callBack: GRID_ROUTE_ACTION,
    route: DOCE_STEP_4,
  },
];

const FRM_DOCE_STEP_4 = "FRM_Tutor_Lezioni";
const DOCE_STEP_4_API = `${process.env.server}/tutorop/lezioni`;
const DOCE_STEP_4_ACTION = [];

const FRM_DOCE_STEP_5 = "FRM_Tutor_Appuntamenti";
const DOCE_STEP_5_API = `${process.env.server}/tutorop/appuntamenti`;
const DOCE_STEP_5_ACTION = [];

const FRM_DOCE_STEP_6 = "FRM_Tutor_Dettaglio";
const DOCE_STEP_6_API = `${process.env.server}/tutorop/dettaglio`;
const DOCE_STEP_6_ACTION = [];

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
    case DOCE_STEP_3:
      apiUrl = DOCE_STEP_3_API;
      break;
    case DOCE_STEP_4:
      apiUrl = DOCE_STEP_4_API;
      break;
    case DOCE_STEP_5:
      apiUrl = DOCE_STEP_5_API;
      break;
    case DOCE_STEP_6:
      apiUrl = DOCE_STEP_6_API;
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
  DOCE_STEP_3,
  FRM_DOCE_STEP_3,
  DOCE_STEP_3_ACTION,
  DOCE_STEP_6,
  FRM_DOCE_STEP_6,
  DOCE_STEP_6_API,
  DOCE_STEP_6_ACTION,
  DOCE_STEP_5,
  FRM_DOCE_STEP_5,
  DOCE_STEP_5_API,
  DOCE_STEP_5_ACTION,
  DOCE_STEP_4,
  FRM_DOCE_STEP_4,
  DOCE_STEP_4_API,
  DOCE_STEP_4_ACTION,
};
