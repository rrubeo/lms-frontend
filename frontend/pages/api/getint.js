import { withIronSessionApiRoute } from "iron-session/next";
import { getToken, validateToken, sessionOptions } from "../../lib/session";
import { fetchJson, FetchError } from "../../lib";

async function getWithUser(url, userInfo) {
  //   console.log("postWithUser");

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

export default withIronSessionApiRoute(async (req, res) => {
  console.log("API GET");
  const packBody = req.body;
  const userInfo = req.session.user;

  if (!userInfo) {
    // console.log("User not logged.");
    res.status(401).json({ status: 401, message: "User not logged." });
    res.end();
    return;
  }

  // console.log("Mo basta pero.");
  try {
    const validation = await validateToken(userInfo.login, userInfo.token);
    // console.log(validation.status);
    if (validation.status != 200) {
      req.session.destroy();
      res.status(401).json({ status: 401, message: "Invalid Token." });
      res.end();      
      return;
    }

    const data = await getWithUser(packBody.extUrl, userInfo);
    data.status = 200;
    res.json(data);
    res.end();
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.end();
    return;
  }
}, sessionOptions);
