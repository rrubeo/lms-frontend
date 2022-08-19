const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import {
  sidemenu,
  navmenu,
  navmenustudenti,
  usermenu,
} from "../../../data/data_sidemenu";

import { getFunzioniForm, getRuoloUtente } from "../../../data/common";

let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const INITIAL_EVENTS = [
  {
    id: 1,
    title: "All-day event",
    start: todayStr,
  },
  { id: 2, title: "Timed event", start: todayStr + "T12:00:00" },
  {
    id: 3,
    title: "Timed event",
    start: "2022-05-18T12:00:00",
    end: "2022-05-18T18:00:00",
  },
  { id: 4, title: "Colloquio", start: todayStr + "T18:00:00", allDay: false },
];

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_ruolo = await getRuoloUtente(userLogin.token, userLogin.userID, 0);

  const data = {
    title: "Calendario",
    menu: sidemenu,
    navmenu: db_ruolo[0].idRuolo == 6 ? navmenustudenti : navmenu,
    usermenu: usermenu,
    funzioni: db_funzioni,
    inevents: INITIAL_EVENTS,
  };

  return data;
}

async function deleteHandler(userLogin, deleteData) {
  //   console.log("deleteHandler");
  //   console.log(deleteData);
  //   let d1 = await deleteLezioneAggr(
  //     userLogin.token,
  //     deleteData.key,
  //     deleteData.pbaseId
  //   );
  //   // console.log(d1);
  //   const res = { status: 200, message: "Aggregato eliminato" };
  //   return res;
}

async function postHandler(userLogin, postData, response, pid) {
  //   let res = { status: 200, message: "" };
  //   for (let m of postData.lezione) {
  //     if (m != 0) {
  //       let poba = {
  //         lezaFkPobaId: parseInt(pid),
  //         lezaFkLeziId: m.id,
  //         lezaSysuser: userLogin.userID,
  //       };
  //       console.log(poba);
  //       let p3 = await insertLezioneAggr(userLogin.token, poba);
  //       console.log(p3);

  //       const msg =
  //         process.env.NODE_ENV === "production"
  //           ? "OK"
  //           : JSON.stringify(poba) + " RESULT:" + JSON.stringify(p3);

  //       res = { status: 200, message: msg };

  //       if (p3.status) {
  //         res.status = p3.status;
  //         res.message = p3.statusText;
  //         break;
  //       }
  //     }
  //   }

  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("CALENDARIO");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
    case "POST":
      //   const dataPost = await postHandler(userLogin, req.body, res, pid);
      //   res.status(dataPost.status).json(dataPost);
      break;
    case "DELETE":
      //   const dataDel = await deleteHandler(userLogin, req.body);
      //   res.status(dataDel.status).json(dataDel);
      break;
  }
}
