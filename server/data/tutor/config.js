const cfgMain = require("../config");

const CLOUD_API_TBL_ANAG_TUT = "api/Tables/GetAnagraficaTutor";
function GetAnagraficaTutor(IdPersona, UserName) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_ANAG_TUT}/${IdPersona}/${UserName}`;
}

module.exports = {
  GetAnagraficaTutor,
};
