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

  throw new FetchError({
    message: response.statusText,
    response,
    data,
  });
}

async function fetchWithUser(url, userInfo) {
  console.log("fetchWithUser");
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

function setBody(JSONdata) {
  const options = {
    method: "POST",
    headers: {
      Authorization: "X1X1X",
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };
  return options;
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

const sender = async (url, formData) => {
  console.log("SENDER");
  // console.log(formData);
  const JSONdata = JSON.stringify(formData);
  console.log(JSONdata);
  const response = await fetch(url, setBody(JSONdata));
  const result = await response.json();
  // console.log(result);
  return result;
};

const deleter = async (url, rowData) => {
  console.log(url);
  let f = await fetch(url, {
    headers: {
      Authorization: "X1X1X",
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(rowData),
  });

  let resp = await f;
  const data = await resp.json();

  // if (resp.ok) {
  //   return data;
  // }

  return data;
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

module.exports = {
  fetchJson,
  fetchWithUser,
  fetcher,
  sender,
  deleter,
  FetchError,
};
