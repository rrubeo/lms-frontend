const rows = [
  {
    id: "1",
    col1: "Italiano I Anno",
    col2: "Grammatica",
    col3: "Grammatica",
    col4: "Verbi",
  },
  {
    id: "2",
    col1: "Italiano I Anno",
    col2: "Epica",
    col3: "Grammatica",
    col4: "Verbi",
  },
  {
    id: "3",
    col1: "Italiano I Anno",
    col2: "Letteratura",
    col3: "Grammatica",
    col4: "Verbi",
  },
];

const cols = [
  { field: "col1", headerName: "Programma-Base", flex: 1, minWidth: 50 },
  { field: "col2", headerName: "Classe Argomento", flex: 1, minWidth: 50 },
  { field: "col3", headerName: "Argomento", flex: 1, minWidth: 50 },
  { field: "col4", headerName: "Lezione", flex: 1, minWidth: 50 },
  {
    field: "col5",
    headerName: "Esercitazioni",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
    type: "number",
    align: "right",
  },
];

module.exports = { rows, cols };
