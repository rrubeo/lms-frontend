import { withIronSessionApiRoute } from "iron-session/next";
import { getToken, sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async (req, res) => {
  console.log("API LOGIN");
  const { username, password } = await req.body;

  try {
    const userLogin = await getToken(username, password);
    // console.log(userLogin);
    const user = {
      isLoggedIn: true,
      login: userLogin.userID,
      token: userLogin.token,
    };
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
