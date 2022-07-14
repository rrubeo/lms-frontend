const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
import { useSearchParams } from 'react-router-dom';

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";

import { 
  getFunzioniForm,
  getLezioni,
} from "../../../../data/fs/common";


async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    ""
  );

  const subjects = await getLezioni(userLogin.token, userLogin.userID, parseInt(window.location.href.split('=')[1]));

  const data = {
    title: "Configurazione dettaglio",
    // login: false,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    funzioni: db_funzioni,
    materie: subjects,
    // bread: db_bread,
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