async function fetchJson(input, init) {
  const response = await fetch(input, init);

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json();

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (response.ok) {
    return data;
  }
  console.log("fetchJson error");
  throw new FetchError({
    message: response.statusText,
    response,
    data,
  });
}

async function postData(url, postedData) {
  console.log("postData URL", url);
  const packBody = {
    extUrl: url,
    data: postedData,
  };
  // console.log(packBody);
  try {
    const data = await fetchJson("/api/postint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packBody),
    });

    // console.log(data);
    return data;
  } catch (error) {
    if (error instanceof FetchError) {
      // console.error(error);
      console.error("postData:", error.data.message);
      return error.data;
    } else {
      console.error("An unexpected error happened:", error);
      return error;
    }
  }
}

async function postFileCors(url, postedData, userInfo) {
  console.log("postFileCors 1");
  console.log("TIPO", typeof postedData.file);
  const endpoint = `${process.env.frontend}/api/apicors`;

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + userInfo.token);
  myHeaders.append("UserId", userInfo.login);
  myHeaders.append("Token", userInfo.token);
  myHeaders.append("Destination", url);
  // myHeaders.append("Content-Type", "multipart/form-data");

  let formData = new FormData();
  formData.append("file", postedData.file, postedData.file.name);

  // let myFiles = [];
  // myFiles.push(postedData.file);

  // const myBody = {
  //   files: myFiles,
  // };

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    // redirect: "follow",
  };

  const response = await fetch(endpoint, requestOptions);
  const result = await response.json();
  console.log("postFileCors 2");
  console.log(result);

  return result;
}

async function postFile(url, postedData, userInfo) {
  console.log(url);
  console.log("postFile");

  let formData = new FormData();
  formData.append("file", postedData.file, postedData.file.name);

  // const formDataObj = {};
  // postData.forEach((value, key) => (formDataObj[key] = value));

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // myHeaders.append("Content-Type", "multipart/form-data");
  myHeaders.append("Authorization", "Bearer " + userInfo.token);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  let data = { url: url, message: "" };

  try {
    console.log("FETCH", url);
    // const data = await fetchJson(url, requestOptions);

    const response = await fetch(url, requestOptions);
    const result = await response.json();
    // console.log("FETCH", result);

    if (result.status) {
      data.message = result.title;
    } else {
      data.message = result.errDesc;
      data.id = result.id;
    }
    return data;
  } catch (error) {
    if (error instanceof FetchError) {
      console.error(error);
      console.error("postFile:", error.data.message);
      return error.data;
    } else {
      console.error("An unexpected error happened:", error);
      return error;
    }
  }
}

async function getData(url) {
  console.log("getData URL", url);
  const packBody = {
    extUrl: url,
  };
  try {
    const apife = `${process.env.frontend}/api/getint`;
    // const apife = "/api/getint";
    const data = await fetchJson(apife, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packBody),
    });
    // console.log(data);
    return data;
  } catch (error) {
    if (error instanceof FetchError) {
      console.error("getData:", error.data.message);
      return error.data;
    } else {
      console.error("An unexpected error happened:", error);
      return error;
    }
  }
}

async function deleteData(url, postedData) {
  const packBody = {
    extUrl: url,
    data: postedData,
  };

  try {
    const data = await fetchJson("/api/deleteint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packBody),
    });

    // console.log(data);
    return data;
  } catch (error) {
    if (error instanceof FetchError) {
      console.error("postData:", error.data.message);
      return error.data;
    } else {
      console.error("An unexpected error happened:", error);
      return error;
    }
  }
}

async function fetchWithUser(url, userInfo) {
  console.log("fetchWithUser", url);
  // console.log(url);
  // console.log(userInfo);
  const data = await fetchJson(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.token,
      UserId: userInfo.login,
      Token: userInfo.token,
    },
  });
  return data;
}

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
  const data = await res.json();

  if (res.ok) {
    return data;
  }

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  });

  // if (res.status !== 200) {
  //   // throw new Error(data.message);
  //   const error = new Error("An error occurred while fetching the data.");
  //   error.info = await res.json();
  //   error.status = res.status;
  //   throw error;
  // }
  // return data;
};

class FetchError extends Error {
  response;
  data;
  constructor({ message, response, data }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = "FetchError";
    this.response = response;
    this.data = data ?? { message: message };
  }
}

function getPageIds(query) {
  let ids = [];
  if (query.param instanceof Array) {
    if (query.param.length > 1) {
      console.log(query);
      for (let i = 1; i < query.param.length; i++) {
        const myArray = query.param[i].split("_");
        for (let j = 0; j < myArray.length; j++) {
          ids.push(myArray[j]);
        }
      }
    }
  }
  return ids;
}

function getBackLink(section, page, query) {
  // console.log("Query:", query);
  // console.log("Query Length:", query.param.length);
  let linkBack = `/${section}/${page}`;
  if (query.param.length > 1) {
    query.param.shift();
    query.param.shift();
    let newParam = query.param.join("/");
    // console.log("JOIN", newParam);

    linkBack = `/${section}/${page}/${newParam}`;
  }
  // console.log("LinkBack:", linkBack);
  return linkBack;
}

function getPageName(query) {
  return query.param[0];
}

module.exports = {
  fetchJson,
  fetchWithUser,
  postData,
  postFile,
  postFileCors,
  getData,
  deleteData,
  fetcher,
  FetchError,
  getPageIds,
  getBackLink,
  getPageName,
};
