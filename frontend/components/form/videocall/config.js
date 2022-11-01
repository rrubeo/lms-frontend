const CALL_API = `${process.env.server}/videocall`;

const MENU_API = `${process.env.server}/menu`;
const NO_DATA_DESC = "Nessun dato";

function getApiUrl(query) {
  const page = query.param[0];
  let apiUrl =  CALL_API;


  let param = "";
  for (let i = 1; i < query.param.length; i++) {
    param = param + "/" + query.param[i];
  }

  apiUrl = apiUrl + param;
  // console.log("getApiUrl");
  // console.log(param);

  return apiUrl;

}

module.exports = {
  getApiUrl,
  CALL_API
};
