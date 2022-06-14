import { withIronSessionApiRoute } from "iron-session/next";
import { getToken, sessionOptions } from "../../lib/session";
import { fetchWithUser } from "../../lib";

const pi_cfg = require("../../components/form/pindi/config");

export default withIronSessionApiRoute(async (req, res) => {
  console.log("API COMBO CLASSE");
  let id = 0;

  if (req.body) {
    console.log(req.body);
    id = req.body.id;
  }
  const userLogin = req.session.user;
  try {
    const data = await fetchWithUser(
      `${pi_cfg.PINDI_STEP_1_API_COMBO_CLASSE}/${id}`,
      userLogin
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
