import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { fetchWithUser } from "../../lib";

export default withIronSessionApiRoute(async (req, res) => {
  console.log("API FLY");
  console.log(req.body);
  let pid = 0;
  let api = "";

  if (!req.body.hasOwnProperty("api")) {
    res.status(400).send({ message: "API not found." });
    return;
  }
  api = req.body.api;

  if (!req.body.hasOwnProperty("pid")) {
    res.status(400).json({ message: "PID not found." });
    return;
  }
  pid = req.body.pid;

  //   if (req.body.hasOwnProperty("combo")) {
  //     id = req.body.combo.id;
  //     api = req.body.api;
  //   } else {
  //     res.json([{ label: " Seleziona", id: 0 }]);
  //     return;
  //   }
  //   console.log("ASYNC COMBO", id);
  //   console.log("ASYNC URL", api);
  //   if (id == 0) {
  //     if (req.body.hasOwnProperty("isCheckList")) {
  //       if (req.body.isCheckList) {
  //         res.json([]);
  //         return;
  //       }
  //     }

  //     res.json([{ label: " Seleziona", id: 0 }]);
  //     return;
  //   }
  const userLogin = req.session.user;
  try {
    const endpoint = `${api}/${pid}`;
    console.log("URL", endpoint);
    const data = await fetchWithUser(endpoint, userLogin);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
