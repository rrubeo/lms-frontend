const FS_FUNZIONI_HOME_STUDENTE = `${process.env.server}/fs/funzioni`;
const FS_FUNZIONI_AULA = `${process.env.server}/fs/aula`;
const FS_FUNZIONI_DETTAGLIO = `${process.env.server}/fs/dettaglio`;
const FS_FUNZIONI_CALENDARIO = `${process.env.server}/fs/calendar`;
const IMAGE_BASE_URL = process.env.cloudfiles;
const CLOUD_BASE_URL = process.env.API_SERVER;

module.exports = { 
  FS_FUNZIONI_HOME_STUDENTE,
  FS_FUNZIONI_AULA,
  FS_FUNZIONI_DETTAGLIO,
  //FS_FUNZIONI_CALENDARIO,
  IMAGE_BASE_URL
};
