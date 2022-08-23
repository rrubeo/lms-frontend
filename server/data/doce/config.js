const cfgMain = require("../config");

const CLOUD_API_TBL_ANAG_DOC = "api/Tables/GetAnagraficaDocenti";
function GetAnagraficaDocenti(IdPersona, UserName) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ANAG_DOC}/${IdPersona}/${UserName}`;
}

module.exports = {
  GetAnagraficaDocenti,
};
