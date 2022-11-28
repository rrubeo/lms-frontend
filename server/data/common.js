import {
  UserAuthenticate,
  GetFunzioniForm,
  GetPaeseCombo,
  GetRegioneCombo,
  GetProvinciaCombo,
  GetComuneCombo,
  GetToponimoCombo,
  GetAnagraficaPersone,
  PersPersonaDats,
  GetRuoloUtente,
  GetAppuntamentiConfermati,
  MoveRec,
  GetMenuXUserName,
  GetNotificaDaAppuntamento,
  NotiNotificheDats,
  GetPersonaByUsername,
} from "../data/config";

const utils = require("../lib/utils");
import { getLogger } from "../logging/log-util";
const logger = getLogger("data-common");

const getToken = async (user, password) => {
  logger.debug("[getToken]");
  const c = {
    utntUserName: user,
    utntPasswordHash: password,
  };

  const data = await utils.getToken(UserAuthenticate, c);
  // console.log(data);
  return data;
};

const getFunzioniForm = async (token, user, formName) => {
  logger.debug("[getFunzioniForm] NON ATTIVA");
  return [];
  const f = await utils.getFetch(token, GetFunzioniForm(user, formName));

  logger.trace(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idFunzione,
      funzione: x.funzione,
      form: x.form,
    };
  });
  return data;
};

const deleteObjectURL = async (token, url) => {
  const f = await utils.deleteFetch(token, url);
  logger.debug(`[deleteObjectURL] ${url}`);
  logger.trace(f);
  if (f.status) return [];
  return f;
};

const getNullGeo = async () => {
  logger.debug("[getNullGeo]");
  const data = [
    { label: "Seleziona", id: 0 },
    { label: "Non Disponibile", id: -1 },
  ];
  return data;
};

const getPaese = async (token) => {
  const f = await utils.getFetch(token, GetPaeseCombo(0));
  logger.debug("[getPaese]");
  logger.trace(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.paese,
      id: x.idPaese,
    };
  });
  return data;
};

const getRegione = async (token, IdRegione) => {
  const f = await utils.getFetch(token, GetRegioneCombo(IdRegione));
  logger.debug("[getRegione]");
  logger.trace(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.regione,
      id: x.idRegione,
    };
  });
  return data;
};

const getProvincia = async (token, IdRegione, IdProvincia) => {
  const f = await utils.getFetch(
    token,
    GetProvinciaCombo(IdRegione, IdProvincia)
  );
  logger.debug("[getProvincia]");
  logger.trace(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.provincia,
      id: x.idProvincia,
    };
  });
  return data;
};

const getComune = async (token, IdProvincia) => {
  const f = await utils.getFetch(token, GetComuneCombo(IdProvincia));
  logger.debug("[getComune]");
  logger.trace(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: x.comuneDen,
      id: x.idComune,
    };
  });
  return data;
};

const getToponimo = async (token) => {
  const f = await utils.getFetch(token, GetToponimoCombo);
  logger.debug("[getToponimo]");
  logger.trace(f);
  if (f.status) return [];

  const data = f.map((x, i) => {
    return {
      label: x.idToponimo,
      id: i,
    };
  });

  return data;
};

const getRicercaPersone = async (token) => {
  const f = await utils.getFetch(token, GetAnagraficaPersone(0));
  logger.debug("[getRicercaPersone]");
  logger.trace(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idPersona,
      col1: x.codiceFiscale,
      col2: x.nome + " " + x.cognome,
      col3: x.dataNascita,
      col4: x.paeseNascita + " " + x.comuneNascita,
      col5: x.attivo,
    };
  });
  return data;
};

const getPersona = async (token, idPersona) => {
  const f = await utils.getFetch(token, `${PersPersonaDats}/${idPersona}`);
  logger.debug("[getPersona]");
  logger.trace(f);
  if (f.status) return [];
  const c = await utils.getFetch(token, GetAnagraficaPersone(idPersona));
  // console.log(c);
  f.idRegioneNascita = c[0].idRegioneNascita;
  f.idProvinciaNascita = c[0].idProvinciaNascita;
  f.idRegioneResidenza = c[0].idRegioneResidenza;
  f.idProvinciaResidenza = c[0].idProvinciaResidenza;
  f.idRegioneDomicilio = c[0].idRegioneDomicilio;
  f.idProvinciaDomicilio = c[0].idProvinciaDomicilio;
  // console.log(f);
  return f;
};

const insertPersona = async (token, body) => {
  let res = await utils.postFetch(token, PersPersonaDats, body);
  return res;
};

const deletePersona = async (token, id) => {
  return await deleteObjectURL(token, `${PersPersonaDats}/${id}`);
};

const getYesNoCombo = async (token) => {
  logger.debug("[getYesNoCombo]");
  // console.log(f);

  const data = [
    { label: "Seleziona", id: 0 },
    { label: "Si", id: 1 },
    { label: "No", id: 2 },
  ];

  return data;
};

const getRuoloUtente = async (token, IdUtenteUserName, IdRuoloUtente) => {
  const f = await utils.getFetch(
    token,
    GetRuoloUtente(IdUtenteUserName, IdRuoloUtente)
  );
  logger.debug("[getRuoloUtente]");
  logger.trace(f);
  if (f.status) return [];

  return f;
};

const getAppuntamentiConfermati = async (
  token,
  UserName,
  DataInizio,
  DataFine
) => {
  const f = await utils.getFetch(
    token,
    GetAppuntamentiConfermati(UserName, DataInizio, DataFine)
  );
  logger.debug("[getAppuntamentiConfermati]");
  logger.trace(f);
  if (f.status) return [];

  const minute = 1000 * 60;
  const hour = minute * 60;

  const data = f.map((x, index) => {
    const msInizio = Date.parse(x.inizioAppuntamento);
    const msFine = Date.parse(x.fineAppuntamento);

    const DataInizio = isNaN(msInizio) ? 0 : new Date(msInizio);
    const DataFine = isNaN(msFine) ? 0 : new Date(msFine);

    const Orario =
      DataInizio == 0
        ? "00:00"
        : `${DataInizio.getHours()}:${String(DataInizio.getMinutes()).padStart(
            2,
            "0"
          )}-${DataFine.getHours()}:${String(DataFine.getMinutes()).padStart(
            2,
            "0"
          )}`;

    const nominativo =
      UserName.toLowerCase() == x.altroUtente.toLowerCase()
        ? x.nominativoRichiedente
        : x.nominativoAltro;

    // console.log("UserName", UserName);
    // console.log("altroUtente", x.altroUtente);
    // console.log("nominativo", nominativo);

    return {
      id: index,
      username: UserName,
      utenteRichiedente: x.utenteRichiedente,
      title: nominativo + ": " + x.tipoAppuntamento + " (" + x.oggetto + ")",
      start: x.inizioAppuntamento,
      end: x.fineAppuntamento,
      statoAppuntamento: x.statoAppuntamento,
      commento: x.commento,
      tipoAppuntamento: x.tipoAppuntamento,
      nominativoRichiedente: x.nominativoRichiedente,
      orario: Orario,
      linkStanza: x.linkStanza,
      nominativo: nominativo,
      idAppuntamento: x.idAppuntamento,
      idStatoAppuntamento: x.idStatoAppuntamento,
      cancellabile: x.appuntamentoCancellabileDalloStudente,
      oggetto: x.oggetto,
    };
  });
  // console.log(data);
  return data;
};

const moveRec = async (token, id, TipoTabella, Spostamento) => {
  logger.debug(`[moveRec] [${id}] [${TipoTabella}] [${Spostamento}]`);

  let tabella = 0;
  switch (TipoTabella) {
    case "GD_FRM_ProgBase_Classe_Argomento":
      tabella = 3;
      break;
    case "GD_FRM_ProgBase_Argomento":
      tabella = 2;
      break;
    case "GD_FRM_ProgBase_Lezione":
      tabella = 1;
      break;
    default:
      tabella = 0;
      break;
  }
  const urlPost = MoveRec(id, tabella, Spostamento);
  let res = await utils.postFetch(token, urlPost, {});
  logger.trace(res);
  return res;
};

const getMenuXUserName = async (token, IdUtenteUserName) => {
  const f = await utils.getFetch(token, GetMenuXUserName(IdUtenteUserName));
  logger.debug("[getMenuXUserName]");
  logger.trace(f);
  if (f.status) return [];
  return f;
};

const getPersonaByUserName = async (token, IdUtenteUserName) => {
  const f = await utils.getFetch(token, GetPersonaByUsername(IdUtenteUserName));
  logger.debug("[getPersonaByUserName]");
  logger.trace(f);
  if (f.status) return [];
  return f;
};

const getNotificaDaAppuntamento = async (token, IdUtenteUserName) => {
  const f = await utils.getFetch(
    token,
    GetNotificaDaAppuntamento(IdUtenteUserName)
  );
  logger.debug("[getNotificaDaAppuntamento]");
  logger.trace(f);
  if (f.status) return [];

  const data = f.map((x, index) => {
    return {
      id: x.idNotifica,
      title: "APPUNTAMENTI",
      description: x.messaggio,
      avatar: "/images/process_steps.png",
      type: "appuntamento",
      createdAt: x.dataLettura,
      isUnRead: x.dataLettura == null ? true : false,
    };
  });

  return data;
};

const letturaNotifica = async (token, body) => {
  let res = await utils.postFetch(token, NotiNotificheDats, body);
  logger.debug("[letturaNotifica]");
  logger.trace(res);
  return res;
};

module.exports = {
  getToken,
  getFunzioniForm,
  deleteObjectURL,
  getNullGeo,
  getPaese,
  getRegione,
  getProvincia,
  getComune,
  getToponimo,
  getRicercaPersone,
  getPersona,
  insertPersona,
  deletePersona,
  getYesNoCombo,
  getRuoloUtente,
  getAppuntamentiConfermati,
  moveRec,
  getMenuXUserName,
  getNotificaDaAppuntamento,
  letturaNotifica,
  getPersonaByUserName,
};
