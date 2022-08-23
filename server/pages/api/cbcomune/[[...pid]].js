const utils = require("../../../lib/utils");
const apic = require("../../../lib/apicommon");

import { getComune } from "../../../data/common";

export default async function handler(req, res) {
  await utils.cors(req, res);

  const pid = apic.getPid(req);

  const userLogin = await apic.getLogin(req);

  const db_filtra = await getComune(userLogin.token, pid);

  res.status(200).json(db_filtra);
}
