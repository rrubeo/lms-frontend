const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import {
  sidemenu,
  navmenu,
  navmenustudenti,
  usermenu,
} from "../../../data/data_sidemenu";
import { getFunzioniForm } from "../../../data/common";
import {
  getIscrizioneStudente,
  getIscrizioneStudenteMulti,
  getLezioni,
  getLezioniSeguite,
} from "../../../data/fs/common";

export default async function handler(req, res) {
  await utils.cors(req, res);

  console.log("RICERCA");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const db_funzioni = await getFunzioniForm(
        userLogin.token,
        userLogin.userID,
        "FRM_Studente_Home"
      );
      // const profile = await getIscrizioneStudente(
      //   userLogin.token,
      //   userLogin.userID
      // );
      const iscrizione = await getIscrizioneStudenteMulti(
        userLogin.token,
        "Wolf"
      );
      const subjects = await getLezioni(userLogin.token, userLogin.userID, 0);

      // const recentLessons = await getLezioniSeguite(
      //   userLogin.token,
      //   userLogin.userID,
      //   profile.idIscrizione,
      //   0
      // );

      const recentLessons = await getLezioniSeguite(
        userLogin.token,
        "Wolf",
        iscrizione.idIscrizione,
        0
      );

      const data = {
        title: "Home Studenti",
        label_corsi: "Corsi attivi",
        menu: sidemenu,
        navmenu: navmenustudenti,
        usermenu: usermenu,
        funzioni: db_funzioni,
        iscrizione: iscrizione,
        materie: subjects,
        lezioniViste: recentLessons,
      };
      res.status(200).json(data);
      break;
  }
}
