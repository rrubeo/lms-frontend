import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { fetchWithUser } from "../../lib";

export default withIronSessionApiRoute(async (req, res) => {
  // console.log("API COMBO");
  let id = 0;
  let api = "";

  if (req.body.hasOwnProperty("combo")) {
    id = req.body.combo.id;
    api = req.body.api;
  } else {
    res.json([{ label: " Seleziona", id: 0 }]);
    return;
  }
  console.log("ASYNC COMBO", id);
  console.log("ASYNC URL", api);
  if (id == 0) {
    if (req.body.hasOwnProperty("isCheckList")) {
      if (req.body.isCheckList) {
        res.json([]);
        return;
      }
    }

    res.json([{ label: " Seleziona", id: 0 }]);
    return;
  }
  const userLogin = req.session.user;
  try {
    const data = await fetchWithUser(`${api}/${id}`, userLogin);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
