const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/ese/data_common";
import { rows, cols } from "../../../../data/ese/data_esercita";

import { getFunzioniForm } from "../../../../data/common";
import {
  getBreadEsercita,
  insertRisposta,
  deleteRisposta,
  getEsercitazioneCheck,
  getEsercitazioneInfo,
  getDomande,
} from "../../../../data/ese/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );
  const db_domande = await getEsercitazioneCheck(userLogin.token, 0, pid, 0, 0);
  const db_esercitazione = await getEsercitazioneInfo(
    userLogin.token,
    0,
    pid,
    0,
    0
  );
  const data = {
    title: "Esercitazioni - Check",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: db_domande,
    nome_label: "Esercitazione",
    nome: db_esercitazione.nomeEsercitazione
      ? db_esercitazione.nomeEsercitazione
      : "NOME",
    tipo_label: "Tipo Esercitazione",
    tipo: db_esercitazione.verificaEsercitazione
      ? db_esercitazione.verificaEsercitazione
      : "TIPO",
    limite_label: "Tempo Limite (min.)",
    limite: db_esercitazione.tempoLimite ? db_esercitazione.tempoLimite : "0",
    livello_label: "Livello Difficoltà",
    livello: db_esercitazione.livelloDifficolta
      ? db_esercitazione.livelloDifficolta
      : "LIVELLO",
    punteggio_label: "Punteggio Minimo (%)",
    punteggio: db_esercitazione.punteggio
      ? db_esercitazione.punteggio
      : "LIVELLO",
    back_label: tornaIndietro,
    stepper: stepper,
    funzioni: db_funzioni,
  };
  return data;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("ESERCITAZIONE CHECK");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
  }
}
