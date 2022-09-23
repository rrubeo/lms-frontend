const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { getLezionePerProgrammaIndirizzo } from "../../../../data/pindi/common";

export default async function handler(req, res) {
  await utils.cors(req, res);

  const pid = apic.getPid(req);

  let IdAnnoIndirizzo = 0;
  if (pid != 0) {
    IdAnnoIndirizzo = req.query.pid.length > 1 ? apic.getParentPid(req, 1) : 0;
  }

  // console.log(req.query);
  const userLogin = await apic.getLogin(req);

  const db_rows = await getLezionePerProgrammaIndirizzo(
    userLogin.token,
    pid,
    IdAnnoIndirizzo
  );
  // console.log(db_rows);
  res.status(200).json(db_rows);
}
