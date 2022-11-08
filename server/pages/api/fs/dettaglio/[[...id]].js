const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenustudenti,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";

import { getLezioni, getLezione, getPDF } from "../../../../data/fs/common";

function getIndex(list, itemId) {
  if (list.length > 0) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].idArgomento == itemId) {
        return i;
      }
    }
  }
}

async function getHandler(userLogin, classeArgomento, lezione) {
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const arg = await getLezioni(
    userLogin.token,
    userLogin.userID,
    classeArgomento
  );
  const contents = await getLezione(userLogin.token, lezione);
  const images = await getPDF(userLogin.token, contents[0].idPdf);
  const selectedIndex = getIndex(
    arg[0].lezioniStudenteMATERIA1[0].lezioniStudenteCLASSE1[0]
      .lezioniStudenteLezione1,
    lezione
  );
  const subject =
    arg[0].lezioniStudenteMATERIA1[0].lezioniStudenteCLASSE1[0]
      .lezioniStudenteLezione1[selectedIndex];

  const data = {
    title: "Configurazione dettaglio",
    menu: db_menu,
    navmenu: navmenustudenti,
    usermenu: usermenu,
    argomento: arg,
    contenuti: contents[0],
    immagini: images.testoImages,
    linkpdf: images.urlFile,
    lezione: subject,
    index: selectedIndex,
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
  }
}
