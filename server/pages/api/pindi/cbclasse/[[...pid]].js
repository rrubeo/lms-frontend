const utils = require("../../../../lib/utils");

import { getToken, getLezClasseArgomentoId } from "../../../../data/common";

export default async function handler(req, res) {
  await utils.cors(req, res);
  console.log("COMBO CLASSE");

  let id = 0;

  let { pid } = req.query;
  console.log(pid);
  if (pid) {
    id = pid[0];
    if (pid[1]) carg = pid[1];
  }
  console.log(id);

  const userLogin = await getToken("Romolo", "pass2");
  const db_rows = await getLezClasseArgomentoId(userLogin.token, id);
  // console.log(db_rows);
  res.status(200).json(db_rows);
}
