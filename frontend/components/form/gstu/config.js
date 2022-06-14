import {
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
} from "../../grid/config";

//nomi di pagina
const GSTU_STEP_0 = "gs_search";
const GSTU_STEP_1 = "gs_new";

const FRM_GSTU_STEP_0 = "FRM_GestStud_Ricerca";
const GSTU_STEP_0_API = `${process.env.server}/gstu`;
const GSTU_STEP_0_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
  {
    id: "2",
    title: "Modifica",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: GSTU_STEP_1,
  },
];

const MENU_API = `${process.env.server}/menu`;
const NO_DATA_DESC = "Nessun dato";

function getAPI(page) {
  switch (page) {
    case GSTU_STEP_0:
      return GSTU_STEP_0_API;
  }
}

function getPageName(query) {
  return query.param[0];
}

module.exports = {
  getAPI,
  getPageName,
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
  FRM_GSTU_STEP_0,
  GSTU_STEP_0,
  GSTU_STEP_0_API,
  MENU_API,
  NO_DATA_DESC,
  GSTU_STEP_0_ACTION,
};
