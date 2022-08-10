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
    headerName: "Codice fiscale",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
  },
  { field: "col2", headerName: "Nominativo", flex: 1, minWidth: 50 },
  {
    field: "col3",
    headerName: "Data di nascita",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
  },
  { field: "col4", headerName: "Luogo di nascita", flex: 1, minWidth: 50 },
  {
    field: "col5",
    headerName: "Anagr.Attivo",
    flex: 1,
    minWidth: 50,
    maxWidth: 120,
    align: "center",
  },
];

module.exports = { rows, cols };
