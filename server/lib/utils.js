import Cors from "cors";
import initMiddleware from "./init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

function getUID() {
  const crypto = require("crypto");
  const UUIDGeneratorNode = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
    );
  return UUIDGeneratorNode();
}

function getHash(value) {
  const crypto = require("crypto");

  const hashNode = (val) =>
    new Promise((resolve) =>
      setTimeout(
        () => resolve(crypto.createHash("sha256").update(val).digest("hex")),
        0
      )
    );

  return hashNode(JSON.stringify(value)).then(console.log);
}

function isJson(response) {
  return response.headers.get("content-type")?.includes("application/json");
}

function getAuthorization(token) {
  let auth = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  // console.log(auth);
  return auth;
}

const getToken = async (url, mBody) => {
  let f = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(mBody),
  });
  let resp = await f;
  // console.log(resp);
  let data = isJson(resp) ? resp.json() : resp;
  return data;
};

const getFetch = async (token, url) => {
  console.log("************ GET:", url);
  let f = await fetch(url, {
    headers: getAuthorization(token),
    method: "GET",
  });

  let resp = await f;
  // console.log("************ GET **************");
  let data = {};

  if (resp.status !== 200) {
    // console.log(resp);
    data = {
      status: resp.status,
      statusText: resp.statusText,
    };
  } else {
    // console.log(resp);
    data = isJson(resp) ? resp.json() : { data: JSON.stringify(resp) };
  }
  // console.log(data);
  // if (res.status !== 200) {
  //   // throw new Error(data.message);
  //   const error = new Error("An error occurred while fetching the data.");
  //   error.info = await res.json();
  //   error.status = res.status;
  //   throw error;
  // }

  return data;
};

const postFetch = async (token, url, mBody) => {
  console.log("************ POST:", url);
  let f = await fetch(url, {
    headers: getAuthorization(token),
    method: "POST",
    body: JSON.stringify(mBody),
  });
  let resp = await f;
  // console.log("************ POST **************");
  // console.log(resp);
  let data = isJson(resp) ? resp.json() : resp;
  return data;
};

const postFile = async (token, url, mBody) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Content-Type", "multipart/form-data");
  myHeaders.append("Authorization", "Bearer " + token);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: mBody,
    redirect: "follow",
  };

  let f = await fetch(url, requestOptions);
  let resp = await f;
  console.log("************ POST **************");
  console.log(resp);
  let data = isJson(resp) ? resp.json() : resp;
  return data;
};

const deleteFetch = async (token, url) => {
  let f = await fetch(url, {
    headers: getAuthorization(token),
    method: "DELETE",
  });

  let resp = await f;
  let data = isJson(resp) ? resp.json() : resp;

  return data;
};

const fetcher = async (url) => {
  // console.log("fetcher");
  const options = {
    method: "GET",
    headers: {
      Authorization: "X1X1X",
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, options);
  const data = isJson(res) ? res.json() : { data: JSON.stringify(res) };
  // const data = await res.json();
  console.log(data);

  if (res.status !== 200) {
    // throw new Error(data.message);
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return data;
};

module.exports = {
  cors,
  getToken,
  getUID,
  getHash,
  fetcher,
  getFetch,
  postFetch,
  postFile,
  deleteFetch,
};
