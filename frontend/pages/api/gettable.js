import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { fetchWithUser } from "../../lib";

export default withIronSessionApiRoute(async (req, res) => {
  const packBody = req.body;
  const userLogin = req.session.user;

  try {
    const data = await fetchWithUser(packBody.extUrl, userLogin);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
