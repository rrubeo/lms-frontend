import {
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
} from "../../grid/config";

//nomi di pagina
const GU_STEP_0 = "gu_search";
const GU_STEP_1 = "gu_dett";

const FRM_GU_STEP_0 = "FRM_GestUt_Ricerca";
const GU_STEP_0_API = `${process.env.server}/gu`;
const GU_STEP_0_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
  {
    id: "2",
    title: "Dettaglio",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: GU_STEP_1,
  },
];

const FRM_GU_STEP_1 = "FRM_GestUt_Dettaglio";
const GU_STEP_1_API = `${process.env.server}/gu/dettaglio`;
const GU_STEP_1_ACTION = [];

const MENU_API = `${process.env.server}/menu`;
const NO_DATA_DESC = "Nessun dato";

function getApiUrl(query) {
  const page = query.param[0];
  let apiUrl = "";
  switch (page) {
    case GU_STEP_0:
      apiUrl = GU_STEP_0_API;
      break;
    case GU_STEP_1:
      apiUrl = GU_STEP_1_API;
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
  GU_STEP_0,
  GU_STEP_1,
  FRM_GU_STEP_0,
  GU_STEP_0_API,
  GU_STEP_0_ACTION,
  FRM_GU_STEP_1,
  GU_STEP_1_API,
  GU_STEP_1_ACTION,
  MENU_API,
  NO_DATA_DESC,
};
