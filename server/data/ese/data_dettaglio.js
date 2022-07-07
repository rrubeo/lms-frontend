const rows = [
  {
    id: "1",
    col1: "Lezione 1",
    col2: "Esercitazione 1",
  },
  {
    id: "2",
    col1: "Lezione 2",
    col2: "Esercitazione 2",
  },
  {
    id: "3",
    col1: "Lezione 3",
    col2: "Esercitazione 3",
  },
];

const cols = [
  { field: "col1", headerName: "Lezione", flex: 1, minWidth: 50 },
  { field: "col2", headerName: "Esercitazione", flex: 1, minWidth: 50 },
];

module.exports = { rows, cols };
