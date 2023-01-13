import { withIronSessionApiRoute } from "iron-session/next";
import { defaultLogin, sessionOptions } from "../../lib/session";
import { getLogger } from "../../logging/log-util";

const logger = getLogger("logout");

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req, res) {
  logger.debug(`${JSON.stringify(req.session.user)}`);
  req.session.destroy();
  logger.info(`session destroyed`);
  const data = Object.assign({}, defaultLogin);
  data.isLoggedIn = false;
  data.token = "";
  // logger.info(data);
  res.json(data);
}
