import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { fetchWithUser } from "../../lib";

const pi_cfg = require("../../components/form/pindi/config");
const pb_cfg = require("../../components/form/pbase/config");

export default withIronSessionApiRoute(async (req, res) => {
  console.log("API COMBO CLASSE");
  let id = 0;

  if (req.body) {
    console.log(req.body);
    id = req.body.combo.id;
  }
  const userLogin = req.session.user;
  try {
    const API =
      req.body.form == pi_cfg.FRM_PINDI_STEP_1
        ? pi_cfg.PINDI_STEP_1_API_COMBO_CLASSE
        : pb_cfg.PBASE_STEP_1_1_API_COMBO_CLASSE;
    console.log("COMBO API:", API);
    // const url = `${pi_cfg.PINDI_STEP_1_API_COMBO_CLASSE}/${id}`;
    // console.log(url);
    // const data = await getData(url);
    // console.log(data);
    const data = await fetchWithUser(`${API}/${id}`, userLogin);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
