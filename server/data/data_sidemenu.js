import { getMenuXUserName } from "./common";

const utils = require("../lib/utils");
const cfg = require("../config");

const sidemenu = [
  {
    id: "2_1",
    text: "Gestione Studenti",
    icon: "icon-users",
    link: "#",
  },
  {
    id: "2_2_4",
    text: "Anagrafica Studenti",
    icon: "icon-registry",
    link: `${process.env.frontend}/gs/${cfg.GSTU_STEP_0}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: "3_1",
    text: "Gestione Tutor",
    icon: "icon-tutor-assignment",
    link: "#",
  },
  {
    id: "3_2_5",
    text: "Tutor",
    icon: "icon-tutor-assignment",
    link: `${process.env.frontend}/tutor/${cfg.TUT_STEP_0}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: "5_1",
    text: "Gestione Docenti",
    icon: "icon-teacher-assignment",
    link: "#",
  },
  {
    id: "5_2_9",
    text: "Docenti",
    icon: "icon-teacher-assignment",
    link: `${process.env.frontend}/doce/${cfg.DOCE_STEP_0}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: "4_1",
    text: "Gestione Utenti",
    icon: "icon-users",
    link: "#",
  },
  {
    id: "4_2_8",
    text: "Assegnazione Ruoli",
    icon: "icon-role-assignment",
    link: `${process.env.frontend}/ar/${cfg.AR_STEP_0}`,
  },
  {
    id: "4_2_7",
    text: "Anagrafica Utenti",
    icon: "icon-registry",
    link: `${process.env.frontend}/gu/${cfg.GU_STEP_0}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: "1_1",
    text: "Gestione Configurazione",
    icon: "icon-library",
    link: "#",
  },
  {
    id: "1_2_1",
    text: "Gestione Programma Base",
    icon: "icon-program-management",
    link: `${process.env.frontend}/pb/${cfg.PBASE_STEP_0}`,
  },
  {
    id: "1_2_2",
    text: "Gestione Programma di Indirizzo",
    icon: "icon-program-management",
    link: `${process.env.frontend}/pi/${cfg.PINDI_STEP_0}`,
  },
  {
    id: "1_2_3",
    text: "Gestione Esercitazioni",
    icon: "icon-lesson-management",
    link: `${process.env.frontend}/ese/${cfg.ESE_STEP_0}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: "6_1",
    text: "Tutor",
    icon: "icon-tutor-assignment",
    link: "#",
  },
  {
    id: "6_2_10",
    text: "I miei studenti",
    icon: "icon-tutor-assignment",
    link: `${process.env.frontend}/tutorop/${cfg.TUTOP_STEP_0}`,
  },
  {
    id: "6_2_12",
    text: "Piano Orario",
    icon: "icon-clock",
    link: `${process.env.frontend}/tutor/${cfg.TUT_STEP_1}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: "7_1",
    text: "Docente",
    icon: "icon-teacher-assignment",
    link: "#",
  },
  {
    id: "7_2_11",
    text: "I miei studenti",
    icon: "icon-teacher-assignment",
    link: `${process.env.frontend}/tutorop/${cfg.TUTOP_STEP_0}`,
  },
  {
    id: "7_2_13",
    text: "Piano Orario",
    icon: "icon-clock",
    link: `${process.env.frontend}/doce/${cfg.DOCE_STEP_2}`,
  },
  // {
  //   id: utils.getUID(),
  //   text: "Studente",
  //   icon: "icon-library",
  //   link: "#",
  // },
  // {
  //   id: utils.getUID(),
  //   text: "Studente Home",
  //   icon: "icon-lesson-management",
  //   link: `${process.env.frontend}/fsme/${cfg.FSME_STEP_0}`,
  // },
];

const navmenu = [
  {
    id: utils.getUID(),
    text: "Home",
    icon: "icon-home",
    link: `${process.env.frontend}/${cfg.HOME_0}`,
  },
  {
    id: utils.getUID(),
    text: "Calendario",
    icon: "icon-calendar",
    link: `${process.env.frontend}/${cfg.CALENDAR}`,
  },
  {
    id: utils.getUID(),
    text: "News",
    icon: "icon-bell",
    link: `${process.env.frontend}/${cfg.HOME_0}`,
  },
];

const navmenustudenti = [
  {
    id: utils.getUID(),
    text: "Home",
    icon: "icon-home",
    link: `${process.env.frontend}/${cfg.HOME_STUDENT}`,
  },
  {
    id: utils.getUID(),
    text: "Aula Virtuale",
    icon: "icon-student-teacher-assignment",
    link: `${process.env.frontend}/fsme/${cfg.FSME_STEP_2}`,
  },
  {
    id: utils.getUID(),
    text: "Calendario",
    icon: "icon-calendar",
    link: `${process.env.frontend}/${cfg.CALENDAR}`,
  },
  {
    id: utils.getUID(),
    text: "News",
    icon: "icon-bell",
    link: `${process.env.frontend}/${cfg.HOME_0}`,
  },
];

const usermenu = [
  {
    id: utils.getUID(),
    text: "Profile",
    icon: "icon-user",
    link: `${process.env.frontend}/pb/${cfg.PBASE_STEP_3}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: "logOut",
    text: "Logout",
    icon: "icon-exit",
    link: `${process.env.frontend}/pb/${cfg.PBASE_STEP_3}`,
  },
];

const getSideUserMenu = async (token, user) => {
  const db_menu = await getMenuXUserName(token, user);
  console.log("getSideUserMenu");
  // console.log(db_menu);
  if (db_menu.length <= 0) return db_menu;

  const data = sidemenu.map((x) => {
    let selezione = db_menu.findIndex((item) => item.id == x.id);

    let y = Object.assign({}, x);
    y.visible = true;
    // x.id = utils.getUID();
    if (selezione === -1) {
      y.visible = false;
    }
    // console.log(selezione);
    return y;
  });
  // console.log(data);
  return data;
};

module.exports = {
  sidemenu,
  usermenu,
  navmenu,
  navmenustudenti,
  getSideUserMenu,
};
