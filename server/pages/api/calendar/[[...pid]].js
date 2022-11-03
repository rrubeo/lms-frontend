const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import {
  sidemenu,
  navmenu,
  navmenustudenti,
  usermenu,
} from "../../../data/data_sidemenu";

import {
  getFunzioniForm,
  getRuoloUtente,
  getAppuntamentiConfermati,
} from "../../../data/common";

import { insertAppuntamento } from "../../../data/fs/common";

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
    "FRM_Calendario"
  );

  const db_ruolo = await getRuoloUtente(userLogin.token, userLogin.userID, 0);
  const db_appuntamenti = await getAppuntamentiConfermati(
    userLogin.token,
    userLogin.userID,
    "2022-01-01",
    "2100-12-31"
  );

  const data = {
    title: "Calendario",
    menu: sidemenu,
    navmenu: db_ruolo[0].idRuolo != 6 ? navmenu : navmenustudenti,
    usermenu: usermenu,
    funzioni: db_funzioni,
    inevents: db_appuntamenti,
    ruolo: db_ruolo[0].idRuolo,
  };

  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  console.log("************ RICEVUTO RICHIESTA APPUNTAMENTO");
  console.log(postData);

  const appu = {
    appuId: postData.idAppuntamento,
    appuFkStapId: postData.conferma == true ? 2 : 5,
    appuFlagAttiva: postData.conferma == true ? 1 : 0,
    appuSysuser: userLogin.userID,
    appuCommento: postData.commento,
  };

  console.log("************ POST APPUNTAMENTO");
  // console.log(appu);
  p3 = await insertAppuntamento(userLogin.token, appu);
  console.log(p3);

  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    process.env.NODE_ENV === "production"
      ? (res.message = "OK")
      : (res.message = p3.errDesc);
  }
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
      const dataPost = await postHandler(userLogin, req.body, pid);
      res.status(dataPost.status).json(dataPost);
      break;
  }
}
