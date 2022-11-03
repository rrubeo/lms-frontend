import {
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
  GRID_UPDATE_ACTION,
} from "../../grid/config";

const TUTOP_STEP_0 = "tut_studenti";
const TUTOP_STEP_1 = "tut_lezioni";
const TUTOP_STEP_2 = "tut_appuntamenti";
const TUTOP_STEP_3 = "tut_dettaglio";

const FRM_TUTOP_STEP_0 = "FRM_Tutor_Studenti";
const TUTOP_STEP_0_API = `${process.env.server}/tutorop`;

const TUTOP_STEP_0_ACTION = [
  {
    id: "1",
    title: "Dettaglio",
    icon: "icon-program-management",
    callBack: GRID_ROUTE_ACTION,
    route: TUTOP_STEP_3,
  },
  {
    id: "2",
    title: "Appuntamenti",
    icon: "icon-clock",
    callBack: GRID_ROUTE_ACTION,
    route: TUTOP_STEP_2,
  },
  {
    id: "3",
    title: "Lezioni",
    icon: "icon-teacher-assignment",
    callBack: GRID_ROUTE_ACTION,
    route: TUTOP_STEP_1,
  },
];

const FRM_TUTOP_STEP_1 = "FRM_Tutor_Lezioni";
const TUTOP_STEP_1_API = `${process.env.server}/tutorop/lezioni`;
const TUTOP_STEP_1_ACTION = [];

const FRM_TUTOP_STEP_2 = "FRM_Tutor_Appuntamenti";
const TUTOP_STEP_2_API = `${process.env.server}/tutorop/appuntamenti`;
const TUTOP_STEP_2_ACTION = [];

const FRM_TUTOP_STEP_3 = "FRM_Tutor_Dettaglio";
const TUTOP_STEP_3_API = `${process.env.server}/tutorop/dettaglio`;
const TUTOP_STEP_3_ACTION = [];

function getApiUrl(query) {
  const page = query.param[0];
  let apiUrl = "";
  switch (page) {
    case TUTOP_STEP_0:
      apiUrl = TUTOP_STEP_0_API;
      break;
    case TUTOP_STEP_1:
      apiUrl = TUTOP_STEP_1_API;
      break;
    case TUTOP_STEP_2:
      apiUrl = TUTOP_STEP_2_API;
      break;
    case TUTOP_STEP_3:
      apiUrl = TUTOP_STEP_3_API;
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
  TUTOP_STEP_0,
  FRM_TUTOP_STEP_0,
  TUTOP_STEP_0_API,
  TUTOP_STEP_0_ACTION,
  TUTOP_STEP_1,
  FRM_TUTOP_STEP_1,
  TUTOP_STEP_1_API,
  TUTOP_STEP_1_ACTION,
  TUTOP_STEP_2,
  FRM_TUTOP_STEP_2,
  TUTOP_STEP_2_API,
  TUTOP_STEP_2_ACTION,
  TUTOP_STEP_3,
  FRM_TUTOP_STEP_3,
  TUTOP_STEP_3_API,
  TUTOP_STEP_3_ACTION,
};
