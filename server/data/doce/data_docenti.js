const utils = require("../../lib/utils");
const cfg = require("../../config");

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
    type: "date",
    headerName: "Data di nascita",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
  },
  { field: "col4", headerName: "Luogo di nascita", flex: 1, minWidth: 50 },
];

const cols_materie = [
  {
    field: "col1",
    headerName: "Materia",
    flex: 1,
    minWidth: 50,
  },
];

module.exports = { cols, cols_materie };
