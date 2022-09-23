const utils = require("../lib/utils");
const cfg = require("../config");

const sidemenu = [
  {
    id: utils.getUID(),
    text: "Gestione Studenti",
    icon: "icon-users",
    link: "#",
  },
  {
    id: utils.getUID(),
    text: "Anagrafica Studenti",
    icon: "icon-registry",
    link: `${process.env.frontend}/gs/${cfg.GSTU_STEP_0}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: utils.getUID(),
    text: "Gestione Tutor",
    icon: "icon-tutor-assignment",
    link: "#",
  },
  {
    id: utils.getUID(),
    text: "Tutor",
    icon: "icon-tutor-assignment",
    link: `${process.env.frontend}/tutor/${cfg.TUT_STEP_0}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: utils.getUID(),
    text: "Gestione Docenti",
    icon: "icon-teacher-assignment",
    link: "#",
  },
  {
    id: utils.getUID(),
    text: "Docenti",
    icon: "icon-teacher-assignment",
    link: `${process.env.frontend}/doce/${cfg.DOCE_STEP_0}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: utils.getUID(),
    text: "Gestione Utenti",
    icon: "icon-users",
    link: "#",
  },
  {
    id: utils.getUID(),
    text: "Assegnazione Ruoli",
    icon: "icon-role-assignment",
    link: `${process.env.frontend}/ar/${cfg.AR_STEP_0}`,
  },
  {
    id: utils.getUID(),
    text: "Anagrafica Utenti",
    icon: "icon-registry",
    link: `${process.env.frontend}/gu/${cfg.GU_STEP_0}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: utils.getUID(),
    text: "Gestione Configurazione",
    icon: "icon-library",
    link: "#",
  },

  {
    id: utils.getUID(),
    text: "Gestione Programma Base",
    icon: "icon-program-management",
    link: `${process.env.frontend}/pb/${cfg.PBASE_STEP_0}`,
  },
  {
    id: utils.getUID(),
    text: "Gestione Programma di Indirizzo",
    icon: "icon-program-management",
    link: `${process.env.frontend}/pi/${cfg.PINDI_STEP_0}`,
  },
  {
    id: utils.getUID(),
    text: "Gestione Esercitazioni",
    icon: "icon-lesson-management",
    link: `${process.env.frontend}/ese/${cfg.ESE_STEP_0}`,
  },
  {
    id: utils.getUID(),
    text: "Studente",
    icon: "icon-library",
    link: "#",
  },
  {
    id: utils.getUID(),
    text: "Studente Home",
    icon: "icon-lesson-management",
    link: `${process.env.frontend}/fsme/${cfg.FSME_STEP_0}`,
  },
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
    link: `${process.env.frontend}/${cfg.STUDENT_AULA}`,
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

module.exports = {
  sidemenu,
  usermenu,
  navmenu,
  navmenustudenti,
};
