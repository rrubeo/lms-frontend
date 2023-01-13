import { withIronSessionApiRoute } from "iron-session/next";
import { defaultLogin, sessionOptions } from "../../lib/session";
import { getLogger } from "../../logging/log-util";
const logger = getLogger("user");

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req, res) {
  // console.log("API USER");
  // console.log(req.session.user);
  logger.debug(`userRoute`);
  if (req.session.user) {
    logger.info(`session verified`);
    // logger.debug(req.session.user);
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    const data = Object.assign({}, defaultLogin);
    data.isLoggedIn = false;
    data.token = "";
    logger.info(`session initialized`);
    res.json(data);
  }
}
