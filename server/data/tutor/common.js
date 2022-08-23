const commMain = require("../common");
const utils = require("../../lib/utils");

import { GetAnagraficaTutor } from "./config";

const getAnagraficaTutor = async (token, IdPersona, UserName) => {
  const f = await utils.getFetch(
    token,
    GetAnagraficaTutor(IdPersona, UserName)
  );

  console.log("getAnagraficaTutor");
  // console.log(f);
  if (f.status) return [];

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const data = f.map((x) => {
    return {
      id: x.idPersona,
      col1: x.codiceFiscale,
      col2: x.nome + " " + x.cognome,
      col3: x.dataNascita
        ? new Date(x.dataNascita).toLocaleDateString("it-IT", options)
        : "",
      col4: x.paeseNascita + " " + x.comuneNascita,
    };
  });
  return data;
};

module.exports = {
  getAnagraficaTutor,
};
