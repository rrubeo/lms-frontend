const cfgMain = require("../config");

const CLOUD_API_DOM_ESE = "api/DoesDomandaEsercitazioneDats";
const DoesDomandaEsercitazioneDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_DOM_ESE}`;

const CLOUD_API_ESERCITA = "api/EserEsercitazioneDats";
const EserEsercitazioneDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_ESERCITA}`;

const CLOUD_API_ESE_LEZ = "api/EsleEsercitazioneLezioneRels";
const EsleEsercitazioneLezioneRels = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_ESE_LEZ}`;

const CLOUD_API_TBL_DOM_ESE = "api/Tables/GetDomandaEsercitazione";
function GetDomandaEsercitazione(IdDomanda, IdEsercitazione, IdGruppoDomande) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_DOM_ESE}/${IdDomanda}/${IdEsercitazione}/${IdGruppoDomande}`;
}

const CLOUD_API_TBL_ESE = "api/Tables/GetEsercitazione";
function GetEsercitazione(IdVerifica, IdArgomento, IdLivDiff) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ESE}/${IdVerifica}/${IdArgomento}/${IdLivDiff}`;
}

const CLOUD_API_TBL_ESE_LEZ = "api/Tables/GetEsercitazioneLezione";
function GetEsercitazioneLezione(
  IdLezione,
  IdEsercitazione,
  IdClasseArgomento,
  IdArgomento
) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ESE_LEZ}/${IdLezione}/${IdEsercitazione}/${IdClasseArgomento}/${IdArgomento}`;
}

const CLOUD_API_TBL_LEZ_ESE = "api/Tables/GetLezioneConEsercitazione";
function GetLezioneConEsercitazione(IdLezione, IdClasseArgomento, IdArgomento) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LEZ_ESE}/${IdLezione}/${IdClasseArgomento}/${IdArgomento}`;
}

const CLOUD_API_TBL_GRP_DOM_ESE =
  "api/Tables/GetElencoGruppoDomandexEsercitazione";
function GetElencoGruppoDomandexEsercitazione(IdEsercitazione) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_GRP_DOM_ESE}/${IdEsercitazione}`;
}

const CLOUD_API_TBL_LIVELLO_ESE = "api/Tables/GetLivelloDifficolta";
function GetLivelloDifficolta(IdLivelloDifficolta) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_LIVELLO_ESE}/${IdLivelloDifficolta}`;
}

const CLOUD_API_TBL_GRP_DOM = "api/Tables/GetGruppoDomande";
function GetGruppoDomande(IdGruppoDomande, IdEsercitazione) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_GRP_DOM}/${IdGruppoDomande}/${IdEsercitazione}`;
}

const CLOUD_API_GRP_DOM = "api/GrudGruppoDomandeDats";
const GrudGruppoDomandeDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_GRP_DOM}`;

const CLOUD_API_TIPO_DOM = "api/Tables/GetTipologiaDomanda";
function GetTipologiaDomanda(IdTipoDomanda) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TIPO_DOM}/${IdTipoDomanda}`;
}

const CLOUD_API_RIS_DOM = "api/RidoRispostaDomandaDats";
const RidoRispostaDomandaDats = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_RIS_DOM}`;

const CLOUD_API_TBL_RIS_DOM = "api/Tables/GetRispostaDomanda";
function GetRispostaDomanda(
  IdDomanda,
  IdEsercitazione,
  IdGruppoDomande,
  IdRisposta
) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_RIS_DOM}/${IdDomanda}/${IdEsercitazione}/${IdGruppoDomande}/${IdRisposta}`;
}

module.exports = {
  DoesDomandaEsercitazioneDats,
  EserEsercitazioneDats,
  EsleEsercitazioneLezioneRels,
  GetDomandaEsercitazione,
  GetEsercitazione,
  GetEsercitazioneLezione,
  GetLezioneConEsercitazione,
  GetElencoGruppoDomandexEsercitazione,
  GetLivelloDifficolta,
  GetGruppoDomande,
  GrudGruppoDomandeDats,
  GetTipologiaDomanda,
  RidoRispostaDomandaDats,
  GetRispostaDomanda,
};
