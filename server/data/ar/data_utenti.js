const utils = require("../../lib/utils");
const cfg = require("../../config");

const rows = [
  {
    id: utils.getUID(),
    col1: "ASDGFT76H56F343F",
    col2: "Carlo Bianchi",
    col3: "22/11/22",
    col4: "Roma",
  },
  {
    id: utils.getUID(),
    col1: "ASDGFT76H56F343F",
    col2: "Carlo Bianchi",
    col3: "22/11/22",
    col4: "Roma",
  },
  {
    id: utils.getUID(),
    col1: "ASDGFT76H56F343F",
    col2: "Carlo Bianchi",
    col3: "22/11/22",
    col4: "Roma",
  },
  {
    id: utils.getUID(),
    col1: "ASDGFT76H56F343F",
    col2: "Carlo Bianchi",
    col3: "22/11/22",
    col4: "Roma",
  },
];

const cols = [
  {
    field: "col1",
    headerName: "Username",
    flex: 1,
    minWidth: 50,
    maxWidth: 300,
  },
  {
    field: "col2",
    headerName: "Codice Fiscale",
    flex: 1,
    minWidth: 50,
    maxWidth: 180,
    align: "center",
  },
  {
    field: "col3",
    headerName: "Nominativo",
    flex: 1,
    minWidth: 50,
  },
  { field: "col4", headerName: "eMail", flex: 1, minWidth: 50, maxWidth: 190 },
  {
    field: "col5",
    headerName: "Utente Attivo",
    flex: 1,
    minWidth: 50,
    maxWidth: 130,
    align: "center",
  },
];

module.exports = { rows, cols };
