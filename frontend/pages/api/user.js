import { withIronSessionApiRoute } from "iron-session/next";
import { defaultLogin, sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req, res) {
  // console.log("API USER");
  // console.log(req.session.user);
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json(defaultLogin);
  }
}
