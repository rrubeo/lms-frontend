const cfgMain = require("../config");

const CLOUD_API_TBL_MON_STUD = "api/Tables/GetStudenteXMonitoraggio";
const GetStudenteXMonitoraggio = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_MON_STUD}`;

module.exports = { GetStudenteXMonitoraggio };
