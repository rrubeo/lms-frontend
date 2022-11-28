import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { fetchWithUser } from "../../lib";
import { getLogger } from "../../logging/log-util";

export default withIronSessionApiRoute(async (req, res) => {
  const logger = getLogger("flydata");
  logger.trace(`${JSON.stringify(req.body)}`);

  let pid = 0;
  let api = "";

  if (!req.body.hasOwnProperty("api")) {
    logger.error(`API not found.`);
    res.status(400).send({ message: "API not found." });
    return;
  }
  api = req.body.api;

  if (!req.body.hasOwnProperty("pid")) {
    logger.error(`PID not found.`);
    res.status(400).json({ message: "PID not found." });
    return;
  }
  pid = req.body.pid;

  const userLogin = req.session.user;
  try {
    const endpoint = `${api}/${pid}`;
    logger.debug(`GET ${endpoint}`);
    const data = await fetchWithUser(endpoint, userLogin);
    res.json(data);
  } catch (error) {
    logger.error(`${error.message}`);
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
