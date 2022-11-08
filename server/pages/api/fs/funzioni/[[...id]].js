const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenustudenti,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";

import { getFunzioniForm } from "../../../../data/common";

import {
  getIscrizioneStudente,
  getLezioni,
  getLezioniSeguite,
} from "../../../../data/fs/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "HOME_STUDENTE"
  );

  const profile = await getIscrizioneStudente(
    userLogin.token,
    userLogin.userID
  );

  const subjects = await getLezioni(userLogin.token, userLogin.userID, 0);

  const recentLessons = await getLezioniSeguite(
    userLogin.token,
    userLogin.userID,
    profile.idIscrizione,
    0
  );
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const data = {
    title: "Configurazione Iscrizione studente",
    menu: db_menu,
    navmenu: navmenustudenti,
    usermenu: usermenu,
    funzioni: db_funzioni,
    profilo: profile,
    materie: subjects,
    lezioniViste: recentLessons,
  };
  return data;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

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
