const commMain = require("../common");
const utils = require("../../lib/utils");
import { getLogger } from "../../logging/log-util";
const logger = getLogger("data-moni-common");

import {
  GetStudenteXMonitoraggio,
  GetAppuntamentiDocentiTutor,
  GetElencoAppuntamenti,
  GetAnagraficaDocenti,
  GetIscrizioneStudente,
  NotiNotificheDats,
  AppuAppuntamentiDats,
  GetIscrizioneStudenteAttiva,
} from "./config";

const insertNotifica = async (token, body) => {
  let res = await utils.postFetch(token, NotiNotificheDats, body);
  logger.debug("[insertNotifica]");
  logger.trace(res);
  return res;
};

const getStudenteXMonitoraggio = async (
  token,
  IdIscrizioneStudente,
  UserNameTutor
) => {
  const f = await utils.getFetch(token, GetStudenteXMonitoraggio);
  logger.debug("[getStudenteXMonitoraggio]");

  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idIscrizione,
      col1: x.annoFrequenza,
      col2: x.istituto,
      col3: x.indirizzo,
      col4: x.annoAccademico,
      col5: x.cognomeStudente + " " + x.nomeStudente,
      col6: x.percAvanzamentoTotale,
    };
  });
  return data;
};

const getAppuntamentiDocentiTutor = async (token) => {
  const f = await utils.getFetch(token, GetAppuntamentiDocentiTutor);
  logger.debug("[getAppuntamentiDocentiTutor]");
  // logger.debug(f);
  if (f.status) return [];

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const options1 = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const dateFormat = "it-IT";
  const data = f.map((x, index) => {
    let dataEvento = new Date(x.inizio);

    const offset = dataEvento.getTimezoneOffset();
    dataEvento = new Date(dataEvento.getTime() - offset * 60 * 1000);
    dataEvento = dataEvento.toISOString().split("T")[0];

    const dataEventoLocale = dataEvento.toLocaleString(dateFormat, options);
    return {
      id: x.idAppuntamento,
      col1: x.docenteTutor,
      col2: x.studente,
      col3: x.inizio ? dataEvento : "",
      col4: x.inizio
        ? new Date(x.inizio).toLocaleTimeString(dateFormat, options1)
        : "",
      col5: x.fine
        ? new Date(x.fine).toLocaleTimeString(dateFormat, options1)
        : "",
      col6: x.durata,
      col7: x.stato,
      col8: x.tipoAppuntamento,
      col9: x.titolo,
      col10: x.commento,
    };
  });

  return data;
};

const getElencoAppuntamenti = async (
  token,
  UserName,
  DataInizio,
  DataFine,
  IdIscrizione,
  IdStatoAppuntamento,
  IdAppuntamento,
  IdTipoAppuntamento
) => {
  const f = await utils.getFetch(
    token,
    GetElencoAppuntamenti(
      0,
      DataInizio,
      DataFine,
      IdIscrizione,
      IdStatoAppuntamento,
      IdAppuntamento,
      IdTipoAppuntamento
    )
  );
  logger.debug("[getElencoAppuntamenti]");
  // logger.debug(f);
  if (f.status) return [];

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const options1 = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const dateFormat = "it-IT";
  const data = f.map((x, index) => {
    let dataEvento = new Date(x.inizioAppuntamento);

    const offset = dataEvento.getTimezoneOffset();
    dataEvento = new Date(dataEvento.getTime() - offset * 60 * 1000);
    dataEvento = dataEvento.toISOString().split("T")[0];

    return {
      id: x.idAppuntamento,
      col1: `${x.nominativoAltro} - ${x.nominativoRichiedente}`,
      col2: x.inizioAppuntamento ? dataEvento : "",
      col3: x.oggetto,
      col4: x.inizioAppuntamento
        ? new Date(x.inizioAppuntamento).toLocaleTimeString(
            dateFormat,
            options1
          )
        : "",
      col5: x.fineAppuntamento
        ? new Date(x.fineAppuntamento).toLocaleTimeString(dateFormat, options1)
        : "",
    };
  });
  // logger.debug(data);
  return data;
};

const getIscrizioneStudente = async (token, id) => {
  const f = await utils.getFetch(token, GetIscrizioneStudente(0));
  logger.debug("[getIscrizioneStudente]");
  const arr1 = [{ label: "Seleziona", id: 0 }];
  // console.log(f);
  if (f.status) return [];
  const data = f.map((x) => {
    return {
      label: `${x.nome} ${x.cognome} ${x.iscrizione}`,
      id: x.userName,
    };
  });

  return arr1.concat(data);
};

const getIscrizioneStudenteAttiva = async (
  token,
  UserName,
  IdIscrizione,
  IdPersona
) => {
  const f = await utils.getFetch(
    token,
    GetIscrizioneStudenteAttiva(UserName, IdIscrizione, IdPersona)
  );
  logger.debug("[getIscrizioneStudenteAttiva]");
  const arr1 = [{ label: "Seleziona", id: 0 }];
  // console.log(f);
  if (f.status) return [];
  const data = f.map((x) => {
    return {
      label: `${x.nome} ${x.cognome} ${x.iscrizione}`,
      id: x.userName,
    };
  });

  return arr1.concat(data);
};

const getIscrizioneStudenteData = async (token, id) => {
  const f = await utils.getFetch(token, GetIscrizioneStudente(id));
  logger.debug("[getIscrizioneStudenteData]");
  // console.log(f);
  if (f.status) return [];
  return f;
};

const getListIscrizioneStudente = async (
  token,
  UserName,
  IdIscrizione,
  IdPersona
) => {
  const f = await utils.getFetch(
    token,
    GetIscrizioneStudenteAttiva(UserName, IdIscrizione, IdPersona)
  );
  logger.debug("[getListIscrizioneStudente]");

  // console.log(f);
  if (f.status) return [];
  const data = f.map((x) => {
    return {
      label: `${x.nome} ${x.cognome} ${x.iscrizione}`,
      id: x.userName,
    };
  });

  return data;
};

const getGridIscrizioneStudente = async (
  token,
  UserName,
  IdIscrizione,
  IdPersona
) => {
  const f = await utils.getFetch(
    token,
    GetIscrizioneStudenteAttiva(UserName, IdIscrizione, IdPersona)
  );
  logger.debug("[getGridIscrizioneStudente]");

  // console.log(f);
  if (f.status) return [];
  const data = f.map((x) => {
    let dataEvento = new Date(x.dataNascita);
    const offset = dataEvento.getTimezoneOffset();
    dataEvento = new Date(dataEvento.getTime() - offset * 60 * 1000);
    dataEvento = dataEvento.toISOString().split("T")[0];

    return {
      id: x.userName,
      col1: x.nome,
      col2: x.cognome,
      col3: x.iscrizione,
      col4: x.note,
      col5: x.codiceFiscale,
      col6: dataEvento,
      col7: x.paeseResidenza,
      col8: x.regioneResidenza,
      col9: x.provinciaResidenza,
      col10: x.comuneResidenza,
      col11: x.indirizzoResidenza,
      col12: x.paeseDomicilio,
      col13: x.regioneDomicilio,
      col14: x.provinciaDomicilio,
      col15: x.comuneDomicilio,
      col16: x.indirizzoDomicilio,
      col17: x.tipoStudente,
    };
  });

  return data;
};

const getAnagraficaDocenti = async (token, IdPersona, UserName) => {
  const f = await utils.getFetch(
    token,
    GetAnagraficaDocenti(IdPersona, UserName)
  );
  logger.debug("[getAnagraficaDocenti]");
  const arr1 = [{ label: "Seleziona", id: 0 }];
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      label: `${x.nome} ${x.cognome} ${x.codiceFiscale}`,
      id: x.userName,
    };
  });

  return arr1.concat(data);
};

const insertAppuntamento = async (token, body) => {
  let res = await utils.postFetch(token, AppuAppuntamentiDats, body);
  return res;
};

const deleteAppuntamento = async (token, id) => {
  return await commMain.deleteObjectURL(token, `${AppuAppuntamentiDats}/${id}`);
};

module.exports = {
  getStudenteXMonitoraggio,
  getAppuntamentiDocentiTutor,
  getElencoAppuntamenti,
  getIscrizioneStudente,
  getAnagraficaDocenti,
  getListIscrizioneStudente,
  insertNotifica,
  insertAppuntamento,
  deleteAppuntamento,
  getIscrizioneStudenteAttiva,
  getIscrizioneStudenteData,
  getGridIscrizioneStudente,
};
