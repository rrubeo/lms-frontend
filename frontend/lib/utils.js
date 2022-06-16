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

async function getData(url) {
  const packBody = {
    extUrl: url,
  };
  try {
    const data = await fetchJson("/api/getint", {
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

module.exports = {
  fetchJson,
  fetchWithUser,
  postData,
  getData,
  deleteData,
  fetcher,
  FetchError,
};
