const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";

import { 
  getLezioni,
  getLezione
} from "../../../../data/fs/common";


function getIndex(list, itemId) {
  if (list.length>0){
    for (var i= 0; i< list.length; i++){
      if (list[i].idLezione == itemId){
        return i;
      }
    }
  }
};


function getContenutoVideo(list) {
  if (list.length>0){
    for (var i= 0; i< list.length; i++){
      if (list[i].tipoContenuto == "Video"){
        return list[i];
      }
    }
  }
}


function getContenutoTesto(list) {
  if (list.length>0){
    for (var i= 0; i< list.length; i++){
      if (list[i].tipoContenuto == "Testo"){
        return list[i];
      }
    }
  }
}


async function getHandler(userLogin, classeArgomento, lezione) {
  const arg = await getLezioni(userLogin.token, userLogin.userID, classeArgomento);
  const contents = await getLezione(userLogin.token, lezione);
  const contentVideo = getContenutoVideo(contents);
  const contentText = getContenutoTesto(contents);
  const selectedIndex = getIndex(arg[0].lezioniStudenteMATERIA1[0].lezioniStudenteCLASSE1[0].lezioniStudenteLezione1, lezione);
  const subject = arg[0].lezioniStudenteMATERIA1[0].lezioniStudenteCLASSE1[0].lezioniStudenteLezione1[selectedIndex];

  const data = {
    title: "Configurazione dettaglio",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    argomento: arg,
    contenutoVideo: contentVideo,
    contenutoTesto: contentText,
    lezione: subject,
    index: selectedIndex
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