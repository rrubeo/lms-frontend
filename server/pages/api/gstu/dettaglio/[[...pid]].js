const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { cols_iscrizioni } from "../../../../data/gstu/data_studenti";

import {
  getFunzioniForm,
  getPaese,
  getRegione,
  getProvincia,
  getComune,
  getToponimo,
  insertPersona,
  getPersona,
} from "../../../../data/common";

import {
  getIscrizioniPersona,
  getIstitutoIndirizzoCombo,
  getAnnoAccademicoCombo,
  getTipoStudenteCombo,
  insertIscrizione,
} from "../../../../data/gstu/common";

import { getAnnoFrequenza } from "../../../../data/pbase/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_toponimo = await getToponimo(userLogin.token);
  const db_paese = await getPaese(userLogin.token);
  const db_regione = await getRegione(userLogin.token);
  const db_provincia = await getProvincia(userLogin.token);
  const db_comune = await getComune(userLogin.token);
  const db_istituto = await getIstitutoIndirizzoCombo(userLogin.token);
  const db_accademico = await getAnnoAccademicoCombo(userLogin.token);
  const db_tipostudente = await getTipoStudenteCombo(userLogin.token);
  const db_annofreq = await getAnnoFrequenza(userLogin.token);

  const data = {
    title: "Scheda Utente",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    utenza_label: "Utenza",
    email_label: "eMail",
    cell_label: "Cellulare",
    fisso_label: "Telefono Fisso",
    cf_label: "Codice Fiscale",
    nome_label: "Nome",
    cognome_label: "Cognome",
    nascita_label: "Data Nascita",
    paese_label: "Paese",
    paese: db_paese,
    regione_label: "Regione",
    regione: db_regione,
    provincia_label: "Provincia",
    provincia: db_provincia,
    comune_label: "Comune",
    comune: db_comune,
    toponimo_label: "Toponimo",
    toponimo: db_toponimo,
    cap_label: "CAP",
    indirizzo_label: "Indirizzo",
    civico_label: "Numero Civico",
    tab1_label: "Dati Anagrafici",
    tab3_label: "Iscrizione",

    istituto_label: "Tipologia Istituto",
    istituto: db_istituto,
    accademico_label: "Anno Accademico",
    accademico: db_accademico,
    tipostudente_label: "Tipo Studente",
    tipostudente: db_tipostudente,
    annofreq_label: "Anno Frequenza",
    annofreq: db_annofreq,
    cols_iscrizioni: cols_iscrizioni,
    funzioni: db_funzioni,
  };

  if (pid) {
    console.log("RICHIAMA SCHEDA STUDENTE");
    const db_iscrizioni = await getIscrizioniPersona(userLogin.token, pid);
    const db_studente = await getPersona(userLogin.token, pid);
    data.title = db_studente.persNome
      ? `Scheda: ${db_studente.persNome} ${db_studente.persCognome}`
      : "Scheda Studente";
    data.utenza = db_studente;
    data.rows_iscrizioni = db_iscrizioni;
    // console.log(data);
  } else {
    console.log("NUOVA SCHEDA STUDENTE");
  }

  return data;
}

async function postHandler(userLogin, postData, pid) {
  console.log(postData);
  let p3 = {};
  console.log("########################################################");
  switch (postData.tab) {
    case 0:
      let poba = {
        persId: postData.upid ? postData.upid : -1,
        persNome: postData.nome,
        persCognome: postData.cognome,
        persCodiceFiscale: postData.cf.toUpperCase(),
        persDataNascita: postData.nascita,
        persFkGpaeIdPaeseNascita:
          postData.nas_paese.id == 0 ? -1 : postData.nas_paese.id,
        persFkGcomIdComuneNascita:
          postData.nas_comune.id == 0 ? -1 : postData.nas_comune.id,
        persFkGpaeIdPaeseResidenza:
          postData.res_paese.id == 0 ? -1 : postData.res_paese.id,
        persFkGcomIdComuneResidenza:
          postData.res_comune.id == 0 ? -1 : postData.res_comune.id,
        persFkGtopToponimoResidenza:
          postData.res_toponimo.id == 0 ? null : postData.res_toponimo.label,
        persIndirizzoResidenza: postData.res_indirizzo,
        persNumeroCivicoResidenza: postData.res_civico,
        persCapResidenza: postData.res_cap,
        persFkGpaeIdPaeseDomicilio:
          postData.dom_paese.id == 0 ? -1 : postData.dom_paese.id,
        persFkGcomIdComuneDomicilio:
          postData.dom_comune.id == 0 ? -1 : postData.dom_comune.id,
        persFkGtopToponimoDomicilio:
          postData.dom_toponimo.id == 0 ? null : postData.dom_toponimo.label,
        persIndirizzoDomicilio: postData.dom_indirizzo,
        persNumeroCivicoDomicilio: postData.dom_civico,
        persCapDomicilio: postData.dom_cap,
        persEmail: postData.email,
        persSysuser: userLogin.userID,
        persFlagAttiva: 1,
        persCellulare: postData.cell,
        persTelefono: postData.fisso,
        // persSysdate: "2022-08-03T15:41:21.216Z",
      };
      console.log(poba);
      p3 = await insertPersona(userLogin.token, poba);
      break;
    case 1:
      let istu = {
        persId: pid,
        istuFlagAttiva: 1,
        istuSysuser: userLogin.userID,
        // istuSysdate: "2022-08-09T07:47:11.113Z",
        istuFkAnacId: postData.iscr_accademico.label,
        // istuDataIscrizione: "2022-08-09T07:47:11.113Z",
        istuFkTistId: postData.iscr_tipostudente.id,
        // istuDataAttivazione: "2022-08-09T07:47:11.113Z",
        // istuDataDisattivazione: "2022-08-09T07:47:11.113Z",
        istuFkAninId: postData.iscr_istituto.id,
        istuFkAnfrId: postData.iscr_annofreq.id,
      };
      console.log(istu);
      p3 = await insertIscrizione(userLogin.token, istu);
      break;
  }

  console.log(p3);

  let res = { status: 200, message: "OK" };
  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    res.id = p3.istuId;
  }

  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("SCHEDA STUDENTE");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
    case "POST":
      const dataPost = await postHandler(userLogin, req.body, pid);
      res.status(dataPost.status).json(dataPost);
      break;
  }
}
