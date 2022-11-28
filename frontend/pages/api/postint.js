import { withIronSessionApiRoute } from "iron-session/next";
import { validateToken, sessionOptions } from "../../lib/session";
import { fetchJson } from "../../lib";
import { getLogger } from "../../logging/log-util";

const logger = getLogger("postint");

async function postWithUser(url, userInfo, postedData) {
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

  return data;
}

export default withIronSessionApiRoute(async (req, res) => {
  const packBody = req.body;

  if (!packBody.data) {
    logger.warn(`Body not found.`);
    res.status(500).json({ status: 500, message: "Body not found." });
    res.end();
    return;
  }

  logger.trace(`POST BODY: ${JSON.stringify(packBody)}`);
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
    logger.debug(`POST ${packBody.extUrl}`);
    const data = await postWithUser(packBody.extUrl, userInfo, packBody.data);

    res.json(data);
    res.end();
  } catch (error) {
    logger.error(`${error.message}`);
    res.status(500).json({ message: error.message });
    res.end();
  }
}, sessionOptions);
