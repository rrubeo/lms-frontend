const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";

import { 
  getFunzioniForm,
  getIscrizioneStudente, 
  getDocentiAula, 
  getTutorAula
} from "../../../../data/fs/common";


async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    ""
  );

  const profile = await getIscrizioneStudente(userLogin.token, userLogin.userID);
  const docenti = await getDocentiAula(userLogin.token, 5, profile.idIscrizione, userLogin.userID);
  const tutor = await getTutorAula(userLogin.token, 4, profile.idIscrizione, userLogin.userID);


  const data = {
    title: "Configurazione Aula",
    // login: false,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    funzioni: db_funzioni,
    docenti: docenti,
    tutor: tutor
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
