import {
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
  GRID_UPDATE_ACTION,
} from "../../grid/config";

const MONI_STEP_0 = "mon_studenti";
const MONI_STEP_1 = `mon_lezioni`;
const MONI_STEP_2 = `mon_appuntamenti`;
const MONI_STEP_3 = `mon_dettaglio`;

const FRM_MONI_STEP_0 = "FRM_Monitor_Studenti";
const MONI_STEP_0_API = `${process.env.server}/monitor`;

const MONI_STEP_0_ACTION = [
  {
    id: "1",
    title: "Dettaglio",
    icon: "icon-program-management",
    callBack: GRID_ROUTE_ACTION,
    route: MONI_STEP_3,
  },
  {
    id: "2",
    title: "Appuntamenti",
    icon: "icon-clock",
    callBack: GRID_ROUTE_ACTION,
    route: MONI_STEP_2,
  },
  {
    id: "3",
    title: "Lezioni",
    icon: "icon-teacher-assignment",
    callBack: GRID_ROUTE_ACTION,
    route: MONI_STEP_1,
  },
];

const FRM_MONI_STEP_1 = "FRM_Tutor_Lezioni";
const MONI_STEP_1_API = `${process.env.server}/tutorop/lezioni`;
const MONI_STEP_1_ACTION = [];

const FRM_MONI_STEP_2 = "FRM_Tutor_Appuntamenti";
const MONI_STEP_2_API = `${process.env.server}/tutorop/appuntamenti`;
const MONI_STEP_2_ACTION = [];

const FRM_MONI_STEP_3 = "FRM_Tutor_Dettaglio";
const MONI_STEP_3_API = `${process.env.server}/tutorop/dettaglio`;
const MONI_STEP_3_ACTION = [];

function getApiUrl(query) {
  const page = query.param[0];
  let apiUrl = "";
  switch (page) {
    case MONI_STEP_0:
      apiUrl = MONI_STEP_0_API;
      break;
    case MONI_STEP_1:
      apiUrl = MONI_STEP_1_API;
      break;
    case MONI_STEP_2:
      apiUrl = MONI_STEP_2_API;
      break;
    case MONI_STEP_3:
      apiUrl = MONI_STEP_3_API;
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
  MONI_STEP_0,
  MONI_STEP_1,
  MONI_STEP_2,
  MONI_STEP_3,
  FRM_MONI_STEP_0,
  MONI_STEP_0_API,
  MONI_STEP_0_ACTION,
  FRM_MONI_STEP_1,
  MONI_STEP_1_API,
  MONI_STEP_1_ACTION,
  FRM_MONI_STEP_2,
  MONI_STEP_2_API,
  MONI_STEP_2_ACTION,
  FRM_MONI_STEP_3,
  MONI_STEP_3_API,
  MONI_STEP_3_ACTION,
};
