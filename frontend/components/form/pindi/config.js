import { GRID_ROUTE_ACTION, GRID_DELETE_ACTION } from "../../grid/config";

const PINDI_STEP_0 = "pi_1base";
const PINDI_STEP_1 = "pi_2le";

const PINDI_STEP_1_API_CLASSE = `${process.env.server}/pindi/classe`;
const PINDI_STEP_1_API_COMBO_CLASSE = `${process.env.server}/pindi/cbclasse`;

const FRM_PINDI_STEP_0 = "FRM_ProgIndi_ProgBase";
const PINDI_STEP_0_API = `${process.env.server}/pindi`;
const PINDI_STEP_0_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
  {
    id: "2",
    title: "Lezione",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: PINDI_STEP_1,
  },
];

const FRM_PINDI_STEP_1 = "FRM_ProgIndi_Lezione";
const PINDI_STEP_1_API = `${process.env.server}/pindi/lezione`;

const PINDI_STEP_1_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
];

function getApiUrl(query) {
  // console.log("getApiUrl");
  // console.log(query);
  const page = query.param[0];
  // console.log(page);
  let apiUrl = "";

  switch (page) {
    case PINDI_STEP_0:
      apiUrl = PINDI_STEP_0_API;
      break;
    case PINDI_STEP_1:
      apiUrl = PINDI_STEP_1_API;
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

const MENU_API = `${process.env.server}/menu`;
const NO_DATA_DESC = "Nessun dato";

module.exports = {
  PINDI_STEP_0,
  PINDI_STEP_1,
  PINDI_STEP_1_API_CLASSE,
  PINDI_STEP_1_API_COMBO_CLASSE,
  getApiUrl,
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  FRM_PINDI_STEP_0,
  FRM_PINDI_STEP_1,
  PINDI_STEP_0_API,
  PINDI_STEP_1_API,
  MENU_API,
  NO_DATA_DESC,
  PINDI_STEP_0_ACTION,
  PINDI_STEP_1_ACTION,
};
