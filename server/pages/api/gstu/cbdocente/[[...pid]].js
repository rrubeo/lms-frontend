const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { getDocenteMateria } from "../../../../data/gstu/common";

export default async function handler(req, res) {
  await utils.cors(req, res);

  const pid = apic.getPid(req);

  const userLogin = await apic.getLogin(req);

  const db_filtra = await getDocenteMateria(userLogin.token, pid, 0);

  res.status(200).json(db_filtra);
}
