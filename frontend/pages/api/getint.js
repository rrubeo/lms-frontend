import { withIronSessionApiRoute } from "iron-session/next";
import { validateToken, sessionOptions } from "../../lib/session";
import { fetchJson } from "../../lib";
import { getLogger } from "../../logging/log-util";

const logger = getLogger("getint");

async function getWithUser(url, userInfo) {
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
  const packBody = req.body;
  const userInfo = req.session.user;

  if (!userInfo) {
    logger.warn(`User not logged.`);
    res.status(401).json({ status: 401, message: "User not logged." });
    res.end();
    return;
  }

  try {
    const validation = await validateToken(userInfo.login, userInfo.token);
    if (validation.status != 200) {
      logger.warn(`Invalid Token.`);
      req.session.destroy();
      res.status(401).json({ status: 401, message: "Invalid Token." });
      res.end();
      return;
    }

    logger.debug(`GET ${packBody.extUrl}`);
    const data = await getWithUser(packBody.extUrl, userInfo);
    data.status = 200;
    res.json(data);
    res.end();
    return;
  } catch (error) {
    logger.error(`${error.message}`);
    res.status(500).json({ message: error.message });
    res.end();
    return;
  }
}, sessionOptions);
