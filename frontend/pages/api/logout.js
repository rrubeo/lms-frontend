import { withIronSessionApiRoute } from "iron-session/next";
import { defaultLogin, sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req, res) {
  console.log("API LOGOUT");
  req.session.destroy();
  res.json(defaultLogin);
}
