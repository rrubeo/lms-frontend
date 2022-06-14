const rows = [
  {
    id: "1",
    col1: "Italiano I Anno",
    col2: "Grammatica",
    col3: "Verbi",
  },
  {
    id: "2",
    col1: "Italiano I Anno",
    col2: "Epica",
    col3: "Iliade",
  },
  {
    id: "3",
    col1: "Italiano I Anno",
    col2: "Letteratura",
    col3: "Manzoni",
  },
];

const cols = [
  { field: "col1", headerName: "Programma-Base", flex: 1, minWidth: 50 },
  { field: "col2", headerName: "Classe Argomento", flex: 1, minWidth: 50 },
  { field: "col3", headerName: "Argomento", flex: 1, minWidth: 50 },
];

module.exports = { rows, cols };
