const cfgMain = require("../config");

const CLOUD_API_TBL_MON_STUD = "api/Tables/GetStudenteXMonitoraggio";
const GetStudenteXMonitoraggio = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_TBL_MON_STUD}`;

const CLOUD_API_SEARCH_APPU_DOC = "api/Tables/GetAppuntamentiDocentiTutor";
const GetAppuntamentiDocentiTutor = `${cfgMain.CLOUD_BASE_URL}/${CLOUD_API_SEARCH_APPU_DOC}`;

module.exports = { GetStudenteXMonitoraggio, GetAppuntamentiDocentiTutor };
