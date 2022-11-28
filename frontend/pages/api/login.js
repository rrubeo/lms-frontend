import { withIronSessionApiRoute } from "iron-session/next";
import { getToken, getRoles, sessionOptions } from "../../lib/session";
import { getLogger } from "../../logging/log-util";

const logger = getLogger("login");

const CryptoJS = require("crypto-js");

export default withIronSessionApiRoute(async (req, res) => {
  const ciphertext = await req.body;
  // console.log("Encrypt Data -");
  // console.log(ciphertext);

  const bytes = CryptoJS.AES.decrypt(
    ciphertext,
    process.env.SECRET_COOKIE_PASSWORD
  );
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  // console.log("decrypted Data -");
  // console.log(decryptedData);

  const { username, password } = decryptedData;

  try {
    const userLogin = await getToken(username, password);
    // console.log(userLogin);
    let user = {
      isLoggedIn: true,
      login: userLogin.userID,
      token: userLogin.token,
    };

    const userRole = await getRoles(user);
    // console.log(userRole);
    if (userRole[0]) {
      user.role = userRole[0].ruolo;
      user.idRole = userRole[0].idRuoloUtente;
      user.isStudent = userRole[0].flagIsStudente;
    }
    req.session.user = user;
    await req.session.save();

    logger.info(`${JSON.stringify(user)}`);

    res.json(user);
  } catch (error) {
    logger.error(`${JSON.stringify(error.message)}`);
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
