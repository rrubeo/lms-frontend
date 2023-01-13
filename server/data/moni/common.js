const commMain = require("../common");
const utils = require("../../lib/utils");
import { getLogger } from "../../logging/log-util";
const logger = getLogger("data-moni-common");

import {
  GetStudenteXMonitoraggio,
  GetAppuntamentiDocentiTutor,
} from "./config";

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
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const options1 = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const data = f.map((x, index) => {
    const dataEvento = new Date(x.inizio);
    return {
      id: x.idAppuntamento,
      col1: x.docenteTutor,
      col2: x.studente,
      col3: dataEvento.toLocaleDateString("it-IT", options)
        ? new Date(x.inizio).toLocaleDateString("it-IT", options)
        : "",
      col4: x.inizio
        ? new Date(x.inizio).toLocaleTimeString("it-IT", options1)
        : "",
      col5: x.fine
        ? new Date(x.fine).toLocaleTimeString("it-IT", options1)
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

module.exports = { getStudenteXMonitoraggio, getAppuntamentiDocentiTutor };
