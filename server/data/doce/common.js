const commMain = require("../common");
const utils = require("../../lib/utils");
import { getLogger } from "../../logging/log-util";
const logger = getLogger("data-doce-common");
import {
  GetAnagraficaDocenti,
  GetDocenteMateria,
  GetMateriaScolasticaCombo,
  DomaDocenteMateriaRels,
  GetDisponibilitaOrarie,
  SetDisponibilitaOrarie,
} from "./config";

const getAnagraficaDocenti = async (token, IdPersona, UserName) => {
  const f = await utils.getFetch(
    token,
    GetAnagraficaDocenti(IdPersona, UserName)
  );
  logger.debug("[getAnagraficaDocenti]");
  logger.trace(f);
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

const getDocenteMateria = async (token, IdPersona) => {
  const f = await utils.getFetch(token, GetDocenteMateria(0, 0, IdPersona));
  logger.debug("[getDocenteMateria]");
  logger.trace(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idDocenteMateria,
      col1: x.materia,
    };
  });
  return data;
};

const getDisponibilitaOrarie = async (token, IdPersona) => {
  const f = await utils.getFetch(token, GetDisponibilitaOrarie(IdPersona));
  logger.debug("[getDisponibilitaOrarie]");
  logger.trace(f);
  if (f.status) return [];
  return f;
};

const getMateriaScolasticaCombo = async (token) => {
  const f = await utils.getFetch(token, GetMateriaScolasticaCombo);
  logger.debug("[getMateriaScolasticaCombo]");
  logger.trace(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return { label: x.materia, id: x.idMateria };
  });
  return data;
};

const insertDocenteMateria = async (token, body) => {
  let res = await utils.postFetch(token, DomaDocenteMateriaRels, body);
  return res;
};

const setDisponibilitaOrarie = async (token, IdPersona, body) => {
  let res = await utils.postFetch(
    token,
    `${SetDisponibilitaOrarie}/${IdPersona}`,
    body
  );
  logger.debug("[setDisponibilitaOrarie]");
  return res;
};

const deleteDocenteMateria = async (token, id) => {
  logger.debug("[deleteDocenteMateria]");
  return await commMain.deleteObjectURL(
    token,
    `${DomaDocenteMateriaRels}/${id}`
  );
};

module.exports = {
  getAnagraficaDocenti,
  getDocenteMateria,
  getMateriaScolasticaCombo,
  insertDocenteMateria,
  deleteDocenteMateria,
  getDisponibilitaOrarie,
  setDisponibilitaOrarie,
};
