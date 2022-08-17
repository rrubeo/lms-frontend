const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { getLezClasseArgomentoId } from "../../../../data/pindi/common";

export default async function handler(req, res) {
  await utils.cors(req, res);

  const pid = apic.getPid(req);
  // console.log(req.query);
  const userLogin = await apic.getLogin(req);

  console.log(
    "COMBO PROGRAMMA INDIRIZZO /Tables/GetLezionePerClasseArgomento",
    pid
  );

  const db_rows = await getLezClasseArgomentoId(userLogin.token, pid);
  // console.log(db_rows);
  res.status(200).json(db_rows);
}
