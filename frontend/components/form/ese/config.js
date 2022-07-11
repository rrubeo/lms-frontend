import {
  GRID_ROUTE_ACTION,
  GRID_DELETE_ACTION,
  GRID_ADD_ACTION,
} from "../../grid/config";

//nomi di pagina
const ESE_STEP_0 = "ese_search";
const ESE_STEP_2 = "ese_eserc";
const ESE_STEP_3 = "ese_view";
const ESE_STEP_4 = "ese_domande";
const ESE_STEP_5 = "ese_risposte";
const ESE_STEP_6 = "ese_check";

const FRM_ESE_STEP_0 = "FRM_Ese_Ricerca";
const ESE_STEP_0_API = `${process.env.server}/ese`;
const ESE_STEP_0_ACTION = [
  {
    id: "1",
    title: "Esercitazioni",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: ESE_STEP_3,
  },
];

const FRM_ESE_STEP_2 = "FRM_Ese_Esercitazione";
const ESE_STEP_2_API = `${process.env.server}/ese/esercita`;
const ESE_STEP_2_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
  {
    id: "2",
    title: "Domande",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: ESE_STEP_4,
  },
];

const FRM_ESE_STEP_3 = "FRM_Ese_Visualizza";
const ESE_STEP_3_API = `${process.env.server}/ese/view`;
const ESE_STEP_3_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
  {
    id: "2",
    title: "Gruppo domande",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: ESE_STEP_2,
  },
  {
    id: "3",
    title: "Domande",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: ESE_STEP_4,
  },
  {
    id: "4",
    title: "Check",
    icon: "icon-arrow-right3",
    callBack: GRID_ROUTE_ACTION,
    route: ESE_STEP_6,
  },
];

const FRM_ESE_STEP_4 = "FRM_Ese_Domande";
const ESE_STEP_4_API = `${process.env.server}/ese/domande`;
const ESE_STEP_4_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
  {
    id: "2",
    title: "Risposte",
    icon: "icon-arrow-right4",
    callBack: GRID_ROUTE_ACTION,
    route: ESE_STEP_5,
  },
];

const FRM_ESE_STEP_5 = "FRM_Ese_Risposte";
const ESE_STEP_5_API = `${process.env.server}/ese/risposte`;
const ESE_STEP_5_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: GRID_DELETE_ACTION,
  },
];

const FRM_ESE_STEP_6 = "FRM_Ese_Check";
const ESE_STEP_6_API = `${process.env.server}/ese/check`;
const ESE_STEP_6_ACTION = [
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
    case ESE_STEP_2:
      apiUrl = ESE_STEP_2_API;
      break;
    case ESE_STEP_3:
      apiUrl = ESE_STEP_3_API;
      break;
    case ESE_STEP_4:
      apiUrl = ESE_STEP_4_API;
      break;
    case ESE_STEP_5:
      apiUrl = ESE_STEP_5_API;
      break;
    case ESE_STEP_6:
      apiUrl = ESE_STEP_6_API;
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
  ESE_STEP_2,
  FRM_ESE_STEP_2,
  ESE_STEP_2_API,
  ESE_STEP_2_ACTION,
  ESE_STEP_3,
  FRM_ESE_STEP_3,
  ESE_STEP_3_API,
  ESE_STEP_3_ACTION,
  ESE_STEP_4,
  FRM_ESE_STEP_4,
  ESE_STEP_4_API,
  ESE_STEP_4_ACTION,
  ESE_STEP_5,
  FRM_ESE_STEP_5,
  ESE_STEP_5_API,
  ESE_STEP_5_ACTION,
  ESE_STEP_6,
  FRM_ESE_STEP_6,
  ESE_STEP_6_API,
  ESE_STEP_6_ACTION,
};
