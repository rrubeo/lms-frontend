const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";
import { stepper, tornaIndietro } from "../../../../data/ese/data_common";
import { rows, cols } from "../../../../data/ese/data_esercita";

import { getFunzioniForm } from "../../../../data/common";

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    "FRM_ProgBase_Ricerca"
  );

  const data = {
    title: "Esercitazioni",
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    rows: rows,
    cols: cols,
    tipo_label: "Tipo Esercitazione",
    tipo: [],
    livello_label: "Livello Difficoltà",
    livello: [],
    testo_gruppo_label: "Testo Gruppo",
    nome_gruppo_label: "Nome Gruppo Domande",
    punteggio_label: "Punteggio Minimo",
    back_label: tornaIndietro,
    stepper: stepper,
    funzioni: db_funzioni,
  };
  return data;
}

async function deleteHandler(userLogin, deleteData) {
  //   console.log("deleteHandler");
  //   console.log(deleteData);
  //   let d1 = await deleteLezioneAggr(
  //     userLogin.token,
  //     deleteData.key,
  //     deleteData.pbaseId
  //   );
  //   // console.log(d1);
  //   const res = { status: 200, message: "Aggregato eliminato" };
  //   return res;
}

async function postHandler(userLogin, postData, response, pid) {
  //   let res = { status: 200, message: "" };
  //   for (let m of postData.lezione) {
  //     if (m != 0) {
  //       let poba = {
  //         lezaFkPobaId: parseInt(pid),
  //         lezaFkLeziId: m.id,
  //         lezaSysuser: userLogin.userID,
  //       };
  //       console.log(poba);
  //       let p3 = await insertLezioneAggr(userLogin.token, poba);
  //       console.log(p3);

  //       const msg =
  //         process.env.NODE_ENV === "production"
  //           ? "OK"
  //           : JSON.stringify(poba) + " RESULT:" + JSON.stringify(p3);

  //       res = { status: 200, message: msg };

  //       if (p3.status) {
  //         res.status = p3.status;
  //         res.message = p3.statusText;
  //         break;
  //       }
  //     }
  //   }

  return res;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

  console.log("RISPOSTE");
  const pid = apic.getPid(req);
  const userLogin = await apic.getLogin(req);

  switch (req.method) {
    case "GET":
      const dataGet = await getHandler(userLogin, pid);
      res.status(200).json(dataGet);
      break;
    case "POST":
      //   const dataPost = await postHandler(userLogin, req.body, res, pid);
      //   res.status(dataPost.status).json(dataPost);
      break;
    case "DELETE":
      //   const dataDel = await deleteHandler(userLogin, req.body);
      //   res.status(dataDel.status).json(dataDel);
      break;
  }
}
