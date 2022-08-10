const utils = require("../../lib/utils");
const cfg = require("../../config");

const cols = [
  {
    field: "col1",
    headerName: "Ruolo",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col2",
    headerName: "Attivo",
    flex: 1,
    minWidth: 50,
    align: "center",
    maxWidth: 90,
  },
];

module.exports = { cols };
