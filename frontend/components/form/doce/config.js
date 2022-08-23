import {
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
  GRID_UPDATE_ACTION,
} from "../../grid/config";

const DOCE_STEP_0 = "doce_search";

const FRM_DOCE_STEP_0 = "FRM_Docenti_Ricerca";
const DOCE_STEP_0_API = `${process.env.server}/doce`;
const DOCE_STEP_0_ACTION = [];

const MENU_API = `${process.env.server}/menu`;
const NO_DATA_DESC = "Nessun dato";

function getApiUrl(query) {
  const page = query.param[0];
  let apiUrl = "";
  switch (page) {
    case DOCE_STEP_0:
      apiUrl = DOCE_STEP_0_API;
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
  MENU_API,
  NO_DATA_DESC,
};
