import { withIronSessionApiRoute } from "iron-session/next";
import { defaultLogin, sessionOptions } from "../../lib/session";
import { getLogger } from "../../logging/log-util";

const logger = getLogger("logout");

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req, res) {
  logger.info(`${JSON.stringify(req.session.user)}`);
  req.session.destroy();
  res.json(defaultLogin);
}
