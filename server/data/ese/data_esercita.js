const rows = [
  {
    id: "1",
    col1: "Esercitazione 1",
    col2: "Verifica",
    col3: "120 minuti",
    col4: "60%",
  },
  {
    id: "2",
    col1: "Esercitazione 2",
    col2: "Verifica",
    col3: "120 minuti",
    col4: "60%",
  },
  {
    id: "3",
    col1: "Esercitazione 3",
    col2: "Esercitazione",
    col3: "",
    col4: "",
  },
];

const cols = [
  { field: "col1", headerName: "Nome Gruppo", flex: 1, minWidth: 50 },
  { field: "col2", headerName: "Nome File", flex: 1, minWidth: 50 },
  { field: "col3", headerName: "Tipologia File", flex: 1, minWidth: 50 },
];

module.exports = { rows, cols };
