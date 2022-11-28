const axios = require("axios");
const AXIOS_ErrorMsg = "Unable to get data";
import { getLogger } from "../logging/log-util";
const logger = getLogger("AxiosMgr");

async function loadAxios(locaurl) {
  logger.info(`loadAxios ${locaurl}`);
  const config = {
    method: "get",
    url: locaurl,
  };
  logger.debug(config);
  try {
    let res = await axios(config);
    logger.debug(res.data);
    return res.data;
  } catch (err) {
    logger.error(err);
    ErrorAxios(err);
    throw new Error(`${AXIOS_ErrorMsg} from ${locaurl}`);
  }
}

async function deleteAxios(locaurl) {
  logger.info(`deleteAxios ${locaurl}`);
  const config = {
    method: "delete",
    url: locaurl,
  };
  logger.debug(config);
  try {
    let res = await axios(config);
    logger.debug(res.data);
    return res.data;
  } catch (err) {
    logger.error(err);
    ErrorAxios(err);
    throw new Error(`${AXIOS_ErrorMsg} from ${locaurl}`);
  }
}

async function saveAxios(localUrl, payload) {
  logger.info(`saveAxios ${localUrl}`);
  const config = {
    method: "post",
    url: localUrl,
    data: payload,
  };
  logger.debug(config);
  try {
    let res = await axios(config);
    return res;
  } catch (err) {
    logger.error(err);
    ErrorAxios(err);
    return {
      error: true,
      status: err.response.status,
      message: `Error saveAxios ${localUrl}`,
    };
  }
}

async function formDataAxios(localUrl, formData) {
  logger.info(`formDataAxios ${localUrl}`);

  const myHeaders = new Headers();
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Authorization", "Bearer " + formData.get("token"));
//   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Content-Type", "multipart/form-data");

  const config = {
    method: "post",
    headers: myHeaders,
    url: localUrl,
    data: formData,
  };
  logger.debug(config);
  try {
    let res = await axios(config);
    return res;
  } catch (err) {
    logger.error(err);
    ErrorAxios(err);
    return {
      error: true,
      status: err.response.status,
      message: `Error formDataAxios ${localUrl}`,
    };
  }
}

function ErrorAxios(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    logger.error(error.response.status);
    // console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    logger.error(error.request);
    //   console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    logger.error(error.message);
  }
  // console.log(error.config);
}

module.exports = { loadAxios, deleteAxios, saveAxios, formDataAxios };
