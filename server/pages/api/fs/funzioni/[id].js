const utils = require("../../../../lib/utils");
const apic = require("../../../../lib/apicommon");

import { sidemenu, navmenu, usermenu } from "../../../../data/data_sidemenu";

import { 
  getFunzioniForm,
  getIscrizioneStudente, 
  getLezioniDaSeguire
} from "../../../../data/fs/common";


const accordionElements = {
  title: "Materie Anno II",
  subjects: [
    {
      id: 1,
      title: "Accordion1",
      contentText: [
        {
          id: 1,
          arg: "I linguaggi del web",
          list: [
            {
              id: 1,
              title: "Introduzione ai linguaggi del Web",
              time: 45,
            },
            {
              id: 2,
              title: "La struttura delle pagine Web",
              time: 35,
            },
            {
              id: 3,
              title: "Introduzione ai fogli di stile con CSS3",
              time: 60,
            },
          ],
        },
        {
          id: 2,
          arg: "HTML 5",
          list: [
            {
              id: 1,
              title: "Introduzione all'HTML 5",
              time: 45,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Accordion2",
      contentText: [
        {
          id: 1,
          arg: "I linguaggi del web",
          list: [
            {
              id: 1,
              title: "Introduzione ai linguaggi del Web",
              time: 45,
            },
            {
              id: 2,
              title: "La struttura delle pagine Web",
              time: 35,
            },
            {
              id: 3,
              title: "Introduzione ai fogli di stile con CSS3",
              time: 60,
            },
          ],
        },
        {
          id: 2,
          arg: "HTML 5",
          list: [
            {
              id: 1,
              title: "Introduzione all'HTML 5",
              time: 45,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Accordion3",
      contentText: [
        {
          id: 1,
          arg: "I linguaggi del web",
          list: [
            {
              id: 1,
              title: "Introduzione ai linguaggi del Web",
              time: 45,
            },
            {
              id: 2,
              title: "La struttura delle pagine Web",
              time: 35,
            },
            {
              id: 3,
              title: "Introduzione ai fogli di stile con CSS3",
              time: 60,
            },
          ],
        },
        {
          id: 2,
          arg: "HTML 5",
          list: [
            {
              id: 1,
              title: "Introduzione all'HTML 5",
              time: 45,
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Accordion4",
      contentText: [
        {
          id: 1,
          arg: "I linguaggi del web",
          list: [
            {
              id: 1,
              title: "Introduzione ai linguaggi del Web",
              time: 45,
            },
            {
              id: 2,
              title: "La struttura delle pagine Web",
              time: 35,
            },
            {
              id: 3,
              title: "Introduzione ai fogli di stile con CSS3",
              time: 60,
            },
          ],
        },
        {
          id: 2,
          arg: "HTML 5",
          list: [
            {
              id: 1,
              title: "Introduzione all'HTML 5",
              time: 45,
            },
          ],
        },
      ],
    },
    {
      id: 5,
      title: "Fisica Fondamenti",
      contentText: [
        {
          id: 1,
          arg: "I linguaggi del web",
          list: [
            {
              id: 1,
              title: "Introduzione ai linguaggi del Web",
              time: 45,
            },
            {
              id: 2,
              title: "La struttura delle pagine Web",
              time: 35,
            },
            {
              id: 3,
              title: "Introduzione ai fogli di stile con CSS3",
              time: 60,
            },
          ],
        },
        {
          id: 2,
          arg: "HTML 5",
          list: [
            {
              id: 1,
              title: "Introduzione all'HTML 5",
              time: 45,
            },
          ],
        },
      ],
    },
    {
      id: 6,
      title: "Accordion6",
      contentText: [
        {
          id: 1,
          arg: "I linguaggi del web",
          list: [
            {
              id: 1,
              title: "Introduzione ai linguaggi del Web",
              time: 45,
            },
            {
              id: 2,
              title: "La struttura delle pagine Web",
              time: 35,
            },
            {
              id: 3,
              title: "Introduzione ai fogli di stile con CSS3",
              time: 60,
            },
          ],
        },
        {
          id: 2,
          arg: "HTML 5",
          list: [
            {
              id: 1,
              title: "Introduzione all'HTML 5",
              time: 45,
            },
          ],
        },
      ],
    },
  ],
};

const recentLessons = {
  title: "Ultime lezioni viste",
  lessons: [
    { id: 1, name: "La struttura delle pagine web", time: 50 },
    { id: 2, name: "La struttura delle pagine web", time: 45 },
    { id: 3, name: "La struttura delle pagine web", time: 50 },
  ],
};

async function getHandler(userLogin, pid) {
  const db_funzioni = await getFunzioniForm(
    userLogin.token,
    userLogin.userID,
    ""
  );

  const profileStudent = await getIscrizioneStudente(userLogin.token, userLogin.userID);
  //const accordionElements = await getLezioniDaSeguire(userLogin.token, profileStudent.idIscrizione);

  const data = {
    title: "Configurazione Iscrizione studente",
    // login: false,
    menu: sidemenu,
    navmenu: navmenu,
    usermenu: usermenu,
    funzioni: db_funzioni,
    profileDats: profileStudent,
    accordionElements: accordionElements,
    recentLessons: recentLessons,
    // bread: db_bread,
  };
  return data;
}

export default async function handler(req, res) {
  // Run cors
  await utils.cors(req, res);

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
