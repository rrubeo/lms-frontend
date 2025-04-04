const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");
import { getLogger } from "../../../../logging/log-util";
const logger = getLogger("gstu-dettaglio");
import {
  navmenu,
  usermenu,
  getSideUserMenu,
} from "../../../../data/data_sidemenu";
import { cols_iscrizioni } from "../../../../data/gstu/data_studenti";

import {
  getFunzioniForm,
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
  deleteIscrizione,
  getIscrizione,
  getIdIscrizione,
} from "../../../../data/gstu/common";

import { getAnnoFrequenza } from "../../../../data/pbase/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const db_toponimo = await getToponimo(userLogin.token);
  const db_istituto = await getIstitutoIndirizzoCombo(userLogin.token);
  const db_accademico = await getAnnoAccademicoCombo(userLogin.token);
  const db_tipostudente = await getTipoStudenteCombo(userLogin.token);
  const db_annofreq = await getAnnoFrequenza(userLogin.token);
  const db_menu = await getSideUserMenu(userLogin.token, userLogin.userID);
  let data = {
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
    crediti_label: "Numero Crediti Bonus",
    importo_label: "Importo Complessivo",
    note_label: "Note",
    rows_iscrizioni: [],
  };

  if (pid) {
    logger.info(`RICHIAMA SCHEDA STUDENTE ${pid}`);
    const db_iscrizioni = await getIscrizioniPersona(userLogin.token, pid);
    const db_studente = await getPersona(userLogin.token, pid);
    data.title = db_studente.persNome
      ? `Studente: ${db_studente.persNome} ${db_studente.persCognome}`
      : "Scheda Studente";
    data.utenza = db_studente;
    data.rows_iscrizioni = db_iscrizioni;
    // console.log(data);
  } else {
    logger.info(`NUOVA SCHEDA STUDENTE`);
  }

  return data;
}

async function postHandler(userLogin, postData, pid) {
  let res = { status: 200, message: "OK" };
  let p3 = {};
  logger.info(`RICEVUTA ISCRIZIONE`);
  logger.debug(postData);

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
      let prepIstu = {
        persId: pid,
        istuFlagAttiva: 1,
        istuSysuser: userLogin.userID,
        istuFkAnacId: "",
        istuFkTistId: "",
        istuDataAttivazione: null,
        istuDataDisattivazione: null,
        istuFkInisId: "",
        istuFkAnfrId: "",
        numeroCreditiBonus: 0,
        importoTotale: 0,
        istuNote: "",
      };

      if (postData.action) {
        logger.info(`UPDATE ISCRIZIONE istuId: [${postData.gridId}]`);

        const db_iscrizione = await getIdIscrizione(
          userLogin.token,
          postData.gridId
        );
        if (db_iscrizione.length > 0) {
          res.status = 200;
          res.message = "Iscrizione aggiornata";
          logger.info(`ISCRIZIONE RECUPERATA`);
          logger.info(db_iscrizione[0]);
          prepIstu.istuId = postData.gridId;
          prepIstu.istuFkAnacId = db_iscrizione[0].annoAccademico;
          prepIstu.istuFkTistId = db_iscrizione[0].idTipoStudente;
          prepIstu.istuFkInisId = db_iscrizione[0].idIndirizzoIstituto;
          prepIstu.istuFkAnfrId = db_iscrizione[0].idAnnoFrequenza;
          prepIstu.numeroCreditiBonus = db_iscrizione[0].numeroCreditiBonus;
          prepIstu.importoTotale = db_iscrizione[0].importoTotale;
          prepIstu.istuNote = db_iscrizione[0].note;
          prepIstu.istuDataIscrizione = db_iscrizione[0].dataIscrizione;

          if (db_iscrizione[0].dataAttivazioneIscrizione == null) {
            logger.info(`UPDATE ISCRIZIONE dataAttivazioneIscrizione NULL`);

            prepIstu.istuDataAttivazione = new Date();
            prepIstu.istuDataDisattivazione = null;
          } else {
            if (db_iscrizione[0].dataDisattivazioneIscrizione == null) {
              logger.info(
                `UPDATE ISCRIZIONE dataDisattivazioneIscrizione NULL`
              );

              prepIstu.istuDataDisattivazione = new Date();
              prepIstu.istuDataAttivazione =
                db_iscrizione[0].dataAttivazioneIscrizione;
            } else {
              logger.info(
                `UPDATE ISCRIZIONE dataDisattivazioneIscrizione NOT NULL`
              );

              prepIstu.istuDataAttivazione = new Date();
              prepIstu.istuDataDisattivazione = null;
            }
          }
        } else {
          res.status = 200;
          res.message = "Iscrizione non trovata";
          logger.error(`${res.message}`);
          return res;
        }
      } else {
        logger.info(`VERIFICA ISCRIZIONE`);

        const chekIscrizione = await getIscrizione(
          userLogin.token,
          pid,
          postData.iscr_annofreq.id,
          postData.iscr_istituto.id
        );
        logger.debug(chekIscrizione);

        if (chekIscrizione.length > 0) {
          if (postData.gridId) {
            logger.info(`RICHIESTA MODIFICA ${postData.gridId}`);

            if (postData.gridId != 0) {
              logger.info(`MODIFICA ${postData.gridId}`);
              prepIstu.istuId = postData.gridId;
              prepIstu.istuDataIscrizione = chekIscrizione[0].dataIscrizione;
              prepIstu.istuDataAttivazione =
                chekIscrizione[0].dataAttivazioneIscrizione;
              prepIstu.istuDataDisattivazione =
                chekIscrizione[0].dataDisattivazioneIscrizione;
            } else {
              res.status = 500;
              res.message =
                chekIscrizione[0].annoFrequenza +
                " " +
                chekIscrizione[0].indirizzoIstituto +
                ": modifica fallita.";
              logger.error(`${res.message}`);
              return res;
            }
          } else {
            res.status = 200;
            res.message =
              chekIscrizione[0].annoFrequenza +
              " " +
              chekIscrizione[0].indirizzoIstituto +
              ": iscrizione presente.";
            logger.info(`${res.message}`);
            return res;
          }
        } else {
          logger.info(
            `ISCRIZIONE NON PRESENTE PER idPersona [${pid}] annoFrequenza: [${postData.iscr_annofreq.id}] istituto: [${postData.iscr_istituto.id}]`
          );
        }

        prepIstu.istuFkAnacId = postData.iscr_accademico.label;
        prepIstu.istuFkTistId = postData.iscr_tipostudente.id;
        prepIstu.istuFkInisId = postData.iscr_istituto.id;
        prepIstu.istuFkAnfrId = postData.iscr_annofreq.id;
        prepIstu.numeroCreditiBonus = postData.crediti;
        prepIstu.importoTotale = postData.importo;
        prepIstu.istuNote = postData.note;
      }
      logger.info(`POST ISCRIZIONE`);
      logger.debug(prepIstu);
      p3 = await insertIscrizione(userLogin.token, prepIstu);
      break;
  }
  logger.debug(p3);

  if (p3.err == 1) {
    res.status = 200;
    res.message = p3.errDesc;
    return res;
  }

  if (p3.status) {
    res.status = p3.status;
    res.message = p3.statusText;
  } else {
    res.id = p3.istuId;
  }

  return res;
}

async function deleteHandler(userLogin, deleteData) {
  logger.debug("deleteHandler");
  logger.debug(deleteData);

  let d1 = await deleteIscrizione(userLogin.token, deleteData.key);
  const res = { status: 200, message: "Iscrizione eliminata" };
  logger.info(`${res.message}`);
  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);
  logger.info(`API-CALL [GSTU-DETTAGLIO]`);

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
    case "DELETE":
      const dataDel = await deleteHandler(userLogin, req.body);
      res.status(dataDel.status).json(dataDel);
      break;
  }
}
