import { array } from "yup/lib/locale";
import {
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
} from "../../grid/config";

//nomi di pagina
const PBASE_STEP_0 = "pb_search";
const PBASE_STEP_1 = "pb_1mt";
const PBASE_STEP_1_1 = "pb_1mt_agg";
const PBASE_STEP_2 = "pb_2cl";
const PBASE_STEP_3 = "pb_3ar";
const PBASE_STEP_4 = "pb_4le";
const PBASE_STEP_5 = "pb_5ct";

const FRM_PBASE_STEP_0 = "FRM_ProgBase_Ricerca";
const PBASE_STEP_0_API = `${process.env.server}/pbase`;
const PBASE_STEP_0_ACTION = [
  {
    id: "1",
    title: "Modifica",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: PBASE_STEP_1,
  },
];

const FRM_PBASE_STEP_1 = "FRM_ProgBase_Materie";
const PBASE_STEP_1_API = `${process.env.server}/pbase/materie`;
const PBASE_STEP_1_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
  {
    id: "2",
    title: "Classe Argomento",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: PBASE_STEP_2,
  },
  // {
  //   id: "3",
  //   title: "Add",
  //   icon: "icon-arrow-right4",
  //   callBack: GRID_ADD_ACTION,
  // },
];

const FRM_PBASE_STEP_1_1 = "FRM_ProgBase_Aggregato";
const PBASE_STEP_1_1_API = `${process.env.server}/pbase/aggregato`;
const PBASE_STEP_1_1_API_COMBO_CLASSE = `${process.env.server}/pbase/cbclasse`;
const PBASE_STEP_1_1_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
];

const FRM_PBASE_STEP_2 = "FRM_ProgBase_Classe_Argomento";
const PBASE_STEP_2_API = `${process.env.server}/pbase/classe`;
const PBASE_STEP_2_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
  {
    id: "2",
    title: "Argomento",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: PBASE_STEP_3,
  },
];

const FRM_PBASE_STEP_3 = "FRM_ProgBase_Argomento";
const PBASE_STEP_3_API = `${process.env.server}/pbase/argomento`;
const PBASE_STEP_3_ACTION = [
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
    route: PBASE_STEP_4,
  },
];

const FRM_PBASE_STEP_4 = "FRM_ProgBase_Lezione";
const PBASE_STEP_4_API = `${process.env.server}/pbase/lezione`;
const PBASE_STEP_4_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
  {
    id: "2",
    title: "Contenuto",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: PBASE_STEP_5,
  },
];
const FRM_PBASE_STEP_5 = "FRM_ProgBase_Contenuto";
const PBASE_STEP_5_API = `${process.env.server}/pbase/contenuto`;
const PBASE_STEP_5_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
];

const MENU_API = `${process.env.server}/menu`;
const NO_DATA_DESC = "Nessun dato";

function getApiUrl(query) {
  // console.log("getApiUrl");
  // console.log(query);
  const page = query.param[0];
  // console.log(page);
  let apiUrl = "";

  switch (page) {
    case PBASE_STEP_0:
      apiUrl = PBASE_STEP_0_API;
      break;
    case PBASE_STEP_1:
      apiUrl = PBASE_STEP_1_API;
      break;
    case PBASE_STEP_1_1:
      apiUrl = PBASE_STEP_1_1_API;
      break;
    case PBASE_STEP_2:
      apiUrl = PBASE_STEP_2_API;
      break;
    case PBASE_STEP_3:
      apiUrl = PBASE_STEP_3_API;
      break;
    case PBASE_STEP_4:
      apiUrl = PBASE_STEP_4_API;
      break;
    case PBASE_STEP_5:
      apiUrl = PBASE_STEP_5_API;
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

function getAPI(page) {
  switch (page) {
    case PBASE_STEP_0:
      return PBASE_STEP_0_API;
    case PBASE_STEP_1:
      return PBASE_STEP_1_API;
    case PBASE_STEP_2:
      return PBASE_STEP_2_API;
    case PBASE_STEP_3:
      return PBASE_STEP_3_API;
    case PBASE_STEP_4:
      return PBASE_STEP_4_API;
    case PBASE_STEP_5:
      return PBASE_STEP_5_API;
  }
}

function getPageName(query) {
  return query.param[0];
}

module.exports = {
  getAPI,
  getPageName,
  getApiUrl,
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
  FRM_PBASE_STEP_0,
  FRM_PBASE_STEP_1,
  FRM_PBASE_STEP_1_1,
  FRM_PBASE_STEP_2,
  FRM_PBASE_STEP_3,
  FRM_PBASE_STEP_4,
  FRM_PBASE_STEP_5,
  PBASE_STEP_0,
  PBASE_STEP_1,
  PBASE_STEP_1_1,
  PBASE_STEP_2,
  PBASE_STEP_3,
  PBASE_STEP_4,
  PBASE_STEP_5,
  PBASE_STEP_0_API,
  PBASE_STEP_1_API,
  PBASE_STEP_1_1_API,
  PBASE_STEP_1_1_API_COMBO_CLASSE,
  PBASE_STEP_2_API,
  PBASE_STEP_3_API,
  PBASE_STEP_4_API,
  PBASE_STEP_5_API,
  MENU_API,
  NO_DATA_DESC,
  PBASE_STEP_0_ACTION,
  PBASE_STEP_1_ACTION,
  PBASE_STEP_1_1_ACTION,
  PBASE_STEP_2_ACTION,
  PBASE_STEP_3_ACTION,
  PBASE_STEP_4_ACTION,
  PBASE_STEP_5_ACTION,
};
