const rows = [
  {
    id: "1",
    col1: "Italiano I Anno",
    col2: "Grammatica",
  },
  {
    id: "2",
    col1: "Italiano I Anno",
    col2: "Epica",
  },
  {
    id: "3",
    col1: "Italiano I Anno",
    col2: "Letteratura",
  },
];

const cols = [
  { field: "col1", headerName: "Programma-Base", flex: 1, minWidth: 50 },
  { field: "col2", headerName: "Classe Argomento", flex: 1, minWidth: 50 },
];

module.exports = { rows, cols };
