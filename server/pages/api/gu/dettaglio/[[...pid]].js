const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";

import {
  getFunzioniForm,
  getToponimo,
  insertPersona,
  getPersona,
} from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_toponimo = await getToponimo(userLogin.token);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  const data = {
    title: "Scheda Utente",
    menu: db_menu,
    navmenu: navmenu,
    usermenu: usermenu,
    back_label: "Torna indietro",
    utenza_label: "Utenza",
    email_label: "eMail",
    cell_label: "Cellulare",
    fisso_label: "Telefono Fisso",
    cf_label: "Codice Fiscale",
    nome_label: "Nome",
    cognome_label: "Cognome",
    nascita_label: "Data Nascita",
    paese_label: "Paese",
    regione_label: "Regione",
    provincia_label: "Provincia",
    comune_label: "Comune",
    toponimo_label: "Toponimo",
    toponimo: db_toponimo,
    cap_label: "CAP",
    indirizzo_label: "Indirizzo",
    civico_label: "Numero Civico",
    tab1_label: "Dati Anagrafici",
    funzioni: db_funzioni,
  };

  if (pid) {
    console.log("RICHIAMA SCHEDA UTENTE");
    const db_studente = await getPersona(userLogin.token, pid);
    data.title = db_studente.persNome
      ? `Scheda: ${db_studente.persNome} ${db_studente.persCognome}`
      : "Scheda Utente";
    data.utenza = db_studente;
    // console.log(data);
  } else {
    console.log("NUOVA SCHEDA UTENTE");
  }

  return data;
}

async function postHandler(userLogin, postData, pid) {
  console.log(postData);

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

  console.log("########################################################");
  console.log(poba);
  let p3 = await insertPersona(userLogin.token, poba);
  console.log(p3);

  let res = { status: 200, message: "OK" };
  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    res.id = p3.eserId;
  }

  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("SCHEDA UTENTE");
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
