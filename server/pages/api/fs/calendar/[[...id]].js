const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenustudenti,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";

import { getFunzioniForm } from "../../../../data/common";

import {
  getDisponibilitaCrediti,
  getDisponibilitaCalendario,
} from "../../../../data/fs/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    ""
  );

  const disponibilitaCrediti = await getDisponibilitaCrediti(
    userLogin.token,
    profile.idIscrizione,
    1,
    1000000
  );

  const disponibilitaCalendario = await getDisponibilitaCalendario(
    userLogin.token,
    usernameDocente,
    date,
    7,
    profile.idIscrizione,
    0,
    0
  );
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const data = {
    title: "Configurazione Aula",
    menu: db_menu,
    navmenu: navmenustudenti,
    usermenu: usermenu,
    funzioni: db_funzioni,
    docenti: docenti,
    tutor: tutor,
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
  }
}
