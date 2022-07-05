import { UserAuthenticate, GetFunzioniForm } from "../data/config";

const utils = require("../lib/utils");

const getToken = async (user, password) => {
  const c = {
    utntUserName: user,
    utntPasswordHash: password,
  };

  const data = await utils.getToken(UserAuthenticate, c);
  // console.log(data);
  return data;
};
const getFunzioniForm = async (token, user, formName) => {
  const f = await utils.getFetch(token, GetFunzioniForm(user, formName));

  console.log("getFunzioniForm");
  // console.log(f);
  if (f.status) return [];

  const data = f.map((x) => {
    return {
      id: x.idFunzione,
      funzione: x.funzione,
      form: x.form,
    };
  });
  return data;
};
const deleteObjectURL = async (token, url) => {
  const f = await utils.deleteFetch(token, url);
  console.log("delete-" + url);
  // console.log(f);
  if (f.status) return [];
  return f;
};

module.exports = {
  getToken,
  getFunzioniForm,
  deleteObjectURL,
};
