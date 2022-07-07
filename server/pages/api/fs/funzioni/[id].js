const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";

import { 
  getFunzioniForm,
  getIscrizioneStudente, 
  getStudenteMaterie,
  getLezioniSeguite,
  getLezioniDaSeguire
} from "../../../../data/fs/common";


async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    ""
  );

  const profile = await getIscrizioneStudente(userLogin.token, userLogin.userID);
  const accordionElements = await getStudenteMaterie(userLogin.token, userLogin.userID, profile.idIscrizione);
  const recentLessons = await getLezioniSeguite(userLogin.token, userLogin.userID, profile.idIscrizione);
  const todoLessons = await getLezioniDaSeguire(userLogin.token, profile.idIscrizione);


  const colums = [
    {
      field: "col1",
      headerName: "Argomento",
      flex: 1,
    },
    {
      field: "col2",
      headerName: "Lezione",
      flex: 1,
    },
    {
      field: "col3",
      headerName: "Durata",
      flex: 1,
    },
    {
      field: "col4",
      headerName: "Tempo residuo",
      flex: 1,
    },
    {
      field: "col5",
      headerName: "Esercizi da controllare",
      flex: 1,
    }
  ];


  var rows = [];
  todoLessons.map((x) => {
    var item = {
      id: utils.getUID(),
      col1: "ASDGFT76H56F343F",
      col2: "Carlo Bianchi",
      col3: "22/11/22",
      col4: "Roma",
      col5: "Esercizi",
    }

    rows.push(item);
  });

  const data = {
    title: "Configurazione Iscrizione studente",
    // login: false,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    funzioni: db_funzioni,
    profileDats: profile,
    accordionElements: accordionElements,
    recentLessons: recentLessons,
    rows: rows,
    cols: colums,
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
