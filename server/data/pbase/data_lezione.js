const rows = [
  {
    id: "1",
    col1: "Lezione1 - Verbi Transitivi",
    col2: "Italiano I Anno",
    col3: "Grammatica",
    col4: "Verbi",
  },
  {
    id: "2",
    col1: "Lezione1 - Prologo Iliade",
    col2: "Italiano I Anno",
    col3: "Epica",
    col4: "Iliade",
  },
  {
    id: "3",
    col1: "Lezione1 - Brano dei Malavoglia",
    col2: "Italiano I Anno",
    col3: "Letteratura",
    col4: "Compresione del testo",
  },
];

const cols = [
  { field: "col1", headerName: "Lezione", flex: 1, minWidth: 50 },
  { field: "col2", headerName: "Programma-Base", flex: 1, minWidth: 50 },
  { field: "col3", headerName: "Classe Argomento", flex: 1, minWidth: 50 },
  { field: "col4", headerName: "Argomento", flex: 1, minWidth: 50 },
];

module.exports = { rows, cols };
