const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";

import { 
  getLezioni,
  getLezione
} from "../../../../data/fs/common";


async function getHandler(userLogin, classeArgomento, lezione) {
  const arg = await getLezioni(userLogin.token, userLogin.userID, classeArgomento);
  const subject = await getLezione(userLogin.token, lezione);

  const data = {
    title: "Configurazione dettaglio",
    // login: false,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    argomento: arg,
    materia: subject,
    // bread: db_bread,
  };
  return data;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  const classeArgomento = req.query.id[0];
  const lezione = req.query.id[1];
  const userLogin = await apic.getLogin(req);


  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, classeArgomento, lezione);
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