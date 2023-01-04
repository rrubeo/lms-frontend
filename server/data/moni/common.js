const commMain = require("../common");
const utils = require("../../lib/utils");

import { GetStudenteXMonitoraggio } from "./config";

const getStudenteXMonitoraggio = async (
  token,
  IdIscrizioneStudente,
  UserNameTutor
) => {
  const f = await utils.getFetch(token, GetStudenteXMonitoraggio);

  console.log("getStudenteXMonitoraggio");
  // console.log(f);
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

module.exports = { getStudenteXMonitoraggio };
