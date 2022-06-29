import { withIronSessionApiRoute } from "iron-session/next";
import { validateToken, sessionOptions } from "../../lib/session";
import { fetchJson } from "../../lib";

async function postWithUser(url, userInfo, postedData) {
  console.log("postWithUser");

  const data = await fetchJson(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.token,
      UserId: userInfo.login,
      Token: userInfo.token,
    },
    body: JSON.stringify(postedData),
  });
  // console.log(data);
  return data;
}

export default withIronSessionApiRoute(async (req, res) => {
  console.log("API POST");
  const packBody = req.body;

  if (!packBody.data) {
    res.status(500).json({ status: 500, message: "Body not found." });
    res.end();
    return;
  }
  console.log(packBody);

  const userInfo = req.session.user;

  if (!userInfo) {
    res.status(401).json({ status: 401, message: "User not logged." });
    res.end();
    return;
  }

  try {
    const validation = await validateToken(userInfo.login, userInfo.token);
    // console.log(validation.status);
    if (validation.status != 200) {
      req.session.destroy();
      res.status(401).json({ status: 401, message: "Invalid Token." });
      res.end();
      return;
    }

    const data = await postWithUser(packBody.extUrl, userInfo, packBody.data);
    // console.log(data);
    res.json(data);
    res.end();
  } catch (error) {
    console.log("API POST ERROR");
    res.status(500).json({ message: error.message });
    res.end();
  }
}, sessionOptions);
