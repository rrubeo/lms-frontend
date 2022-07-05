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
    icon: "icon-user-tie",
    link: "#",
  },
  {
    id: utils.getUID(),
    text: "Tutor",
    icon: "icon-user-tie",
    link: `${process.env.frontend}/gs/${cfg.GSTU_STEP_0}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: utils.getUID(),
    text: "Gestione Utenti",
    icon: "icon-teacher-assignment",
    link: "#",
  },
  {
    id: utils.getUID(),
    text: "Reset Password",
    icon: "icon-reset-password",
    link: `${process.env.frontend}/${cfg.HOME_0}`,
  },
  {
    id: utils.getUID(),
    text: "Assegnazione Ruoli",
    icon: "icon-role-assignment",
    link: `${process.env.frontend}/${cfg.HOME_0}`,
  },
  {
    id: utils.getUID(),
    text: "Anagrafica Utenti",
    icon: "icon-registry",
    link: `${process.env.frontend}/${cfg.HOME_0}`,
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
    link: `${process.env.frontend}/${cfg.HOME_0}`,
  },
  {
    id: utils.getUID(),
    link: "br",
  },
  {
    id: utils.getUID(),
    text: "Monitoraggio",
    icon: "icon-dashboard-subscribers",
    link: "#",
  },
  {
    id: utils.getUID(),
    text: "Cruscotto Iscritti",
    icon: "icon-dashboard-subscribers",
    link: `${process.env.frontend}/${cfg.HOME_0}`,
  },
];

const navmenu = [
  {
    id: utils.getUID(),
    text: "Student",
    icon: "icon-student-teacher-assignment",
    link: `${process.env.frontend}/${cfg.HOME_STUDENT}`,
  },
  {
    id: utils.getUID(),
    text: "Profile",
    icon: "icon-headphones",
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
};
