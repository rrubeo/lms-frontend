import { withIronSessionApiRoute } from "iron-session/next";
import { getToken, validateToken, sessionOptions } from "../../lib/session";
import { fetchJson } from "../../lib";

async function deleteWithUser(url, userInfo, postedData) {
  const data = await fetchJson(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + userInfo.token,
      UserId: userInfo.login,
      Token: userInfo.token,
    },
    body: JSON.stringify(postedData),
  });
  return data;
}

export default withIronSessionApiRoute(async (req, res) => {
  console.log("API DELETE");
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
    console.log(validation.status);
    if (validation.status != 200) {
      req.session.destroy();
      res.status(401).json({ status: 401, message: "Invalid Token." });
      res.end();
      return;
    }

    const data = await deleteWithUser(packBody.extUrl, userInfo, packBody.data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.end();
  }
}, sessionOptions);
