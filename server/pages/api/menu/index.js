import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";
import { sidemenu, navmenu, usermenu } from "../../../data/data_sidemenu";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);
  // console.log(req.headers);
  const data = {
    title: process.env.sitetitle,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
  };
  res.status(200).json(data);
}
