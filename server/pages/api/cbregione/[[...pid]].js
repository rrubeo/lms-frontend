const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import { getRegione, getNullGeo } from "../../../data/common";

export default async function handler(req, res) {
  await utils.cors(req, res);

  const pid = apic.getPid(req);

  const userLogin = await apic.getLogin(req);

  let db_filtra = await getNullGeo();

  if (pid == 118) {
    db_filtra = await getRegione(userLogin.token, 0);
  }

  res.status(200).json(db_filtra);
}
