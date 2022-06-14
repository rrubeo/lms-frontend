const utils = require("../lib/utils");

const l_endpoint = [
  {
    id: utils.getUID(),
    name: "sidemenu",
    href: "/api/menu",
  },
  {
    id: utils.getUID(),
    name: "programma_base - ricerca",
    href: "/api/pbase",
    page: "/pbase",
  },
  {
    id: utils.getUID(),
    name: "programma_base - materie",
    href: "/api/pbase/materie",
    page: "/pbase/materie",
  },
  {
    id: utils.getUID(),
    name: "programma_base - classe",
    href: "/api/pbase/classe",
    page: "/pbase/classe",
  },
  {
    id: utils.getUID(),
    name: "programma_base - argomento",
    href: "/api/pbase/argomento",
    page: "/pbase/argomento",
  },
  {
    id: utils.getUID(),
    name: "programma_base - lezione",
    href: "/api/pbase/lezione",
    page: "/pbase/lezione",
  },
  {
    id: utils.getUID(),
    name: "programma_base - contenuto",
    href: "/api/pbase/contenuto",
    page: "/pbase/contenuto",
  },
  {
    id: utils.getUID(),
    name: "programma_indirizzo - selezione",
    href: "/api/pindi",
    page: "/pindi",
  },
  {
    id: utils.getUID(),
    name: "programma_indirizzo - lezione",
    href: "/api/pindi/lezione",
    page: "/pindi/lezione",
  },
];

module.exports = {
  l_endpoint,
};
