import { withIronSessionApiRoute } from "iron-session/next";
import { getToken, getRoles, sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async (req, res) => {
  console.log("API LOGIN");
  const { username, password } = await req.body;

  try {
    const userLogin = await getToken(username, password);
    console.log(userLogin);
    let user = {
      isLoggedIn: true,
      login: userLogin.userID,
      token: userLogin.token,
    };

    const userRole = await getRoles(user);
    console.log(userRole[0]);
    if (userRole[0]) {
      user.role = userRole[0].ruolo;
      user.idRole = userRole[0].idRuoloUtente;
      user.isStudent = userRole[0].flagIsStudente;
    }
    req.session.user = user;
    await req.session.save();

    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
