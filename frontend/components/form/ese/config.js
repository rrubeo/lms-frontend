import {
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
} from "../../grid/config";

//nomi di pagina
const ESE_STEP_0 = "ese_search";
const ESE_STEP_1 = "ese_dett";
const ESE_STEP_2 = "ese_eserc";
const ESE_STEP_3 = "ese_view";

const FRM_ESE_STEP_0 = "FRM_Ese_Ricerca";
const ESE_STEP_0_API = `${process.env.server}/ese`;
const ESE_STEP_0_ACTION = [
  {
    id: "1",
    title: "Esercitazione",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: ESE_STEP_2,
  },
  {
    id: "2",
    title: "Dettaglio",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: ESE_STEP_1,
  },
];

const FRM_ESE_STEP_1 = "FRM_Ese_Dettaglio";
const ESE_STEP_1_API = `${process.env.server}/ese`;
const ESE_STEP_1_ACTION = [
  {
    id: "1",
    title: "Visualizza",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: ESE_STEP_1,
  },
];

const FRM_ESE_STEP_2 = "FRM_Ese_Esercitazione";
const ESE_STEP_2_API = `${process.env.server}/ese`;
const ESE_STEP_2_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
];

const FRM_ESE_STEP_3 = "FRM_Ese_Visualizza";
const ESE_STEP_3_API = `${process.env.server}/ese`;
const ESE_STEP_3_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
];

function getApiUrl(query) {
  const page = query.param[0];
  let apiUrl = "";
  switch (page) {
    case ESE_STEP_0:
      apiUrl = ESE_STEP_0_API;
      break;
    case ESE_STEP_1:
      apiUrl = ESE_STEP_1_API;
      break;
    case ESE_STEP_2:
      apiUrl = ESE_STEP_2_API;
      break;
    case ESE_STEP_3:
      apiUrl = ESE_STEP_3_API;
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
  ESE_STEP_0,
  FRM_ESE_STEP_0,
  ESE_STEP_0_API,
  ESE_STEP_0_ACTION,
  ESE_STEP_1,
  FRM_ESE_STEP_1,
  ESE_STEP_1_API,
  ESE_STEP_1_ACTION,
  ESE_STEP_2,
  FRM_ESE_STEP_2,
  ESE_STEP_2_API,
  ESE_STEP_2_ACTION,
  ESE_STEP_3,
  FRM_ESE_STEP_3,
  ESE_STEP_3_API,
  ESE_STEP_3_ACTION,
};
