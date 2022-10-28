const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  sidemenu,
  navmenu,
  navmenustudenti,
  usermenu,
} from "../../../../data/data_sidemenu";

import { getFunzioniForm } from "../../../../data/common";

import {
  getDisponibilitaCrediti,
  getDisponibilitaCalendario 
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

  const data = {
    title: "Configurazione Aula",
    menu: sidemenu,
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
