import { withIronSessionApiRoute } from "iron-session/next";
import {
  getToken,
  getRoles,
  getPersonalData,
  sessionOptions,
  defaultLogin,
} from "../../lib/session";
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
    let user = defaultLogin;
    // console.log(userLogin);
    user.isLoggedIn = true;
    user.login = userLogin.userID;
    user.token = userLogin.token;

    const userRole = await getRoles(user);
    // console.log(userRole);
    if (userRole[0]) {
      user.role = userRole[0].ruolo;
      user.idRole = userRole[0].idRuoloUtente;
      user.isStudent = userRole[0].flagIsStudente;
      user.id = userRole[0].idPersona;
      //talkjs
      const userPersonalData = await getPersonalData(
        userRole[0].idPersona,
        user
      );
      if (userPersonalData[0]) {
        user.name = `${userPersonalData[0].nome} ${userPersonalData[0].cognome}`;
        user.email = userPersonalData[0].mail;
        user.description = userPersonalData[0].userName;
        user.photoUrl = `${process.env.cloudfiles}/immaginiutente/${userPersonalData[0].userName}.jpg`;
      }
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
