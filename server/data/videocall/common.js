import {
  UserAuthenticate,
  GetFunzioniForm,
  GetAppuntamento,
} from "../../data/videocall/config";

const utils = require("../../lib/utils");

const getAppuntamento = async (token, roomId) => {
  const f = await utils.getFetch(token, GetAppuntamento(roomId));
  console.log("GetAppuntamento");
  console.log(roomId);
  console.log(f);
  if (f.status) return [];
  const data = f[0];
  return data;
};

module.exports = {
  getAppuntamento
};
