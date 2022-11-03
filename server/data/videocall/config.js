const cfgMain = require("../config");

const CLOUD_API_APPUNTAMENTO = "api/Tables/GetAppuntamento";

//Endpoint
function GetAppuntamento(roomId) {
  return `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_APPUNTAMENTO}/${roomId}`;
}

module.exports = {
  GetAppuntamento,
};
