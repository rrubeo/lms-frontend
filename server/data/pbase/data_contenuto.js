const contenuto = [
  { label: "Video", id: 1 },
  { label: "Audio", id: 2 },
  { label: "Testo", id: 3 },
  { label: "Esercitazione", id: 4 },
  { label: "Verifica", id: 5 },
];

const rows = [
  {
    id: "1",
    col1: "Lezione1 - Verbi Transitivi",
    col2: "Video",
    col3: "15",
    col4: "Italiano I Anno/Grammatica/Verbi",
    col5: "Italiano",
  },
  {
    id: "2",
    col1: "Lezione1 - Verbi Transitivi",
    col2: "Testo",
    col3: "",
    col4: "Italiano I Anno/Grammatica/Verbi",
    col5: "Italiano",
  },
];

const cols = [
  { field: "col1", headerName: "Lezione", flex: 1, minWidth: 50 },
  { field: "col2", headerName: "Contenuto", flex: 1, minWidth: 100 },
  { field: "col3", headerName: "Tipo", flex: 1, minWidth: 50, maxWidth: 120 },
  { field: "col4", headerName: "Durata", flex: 1, minWidth: 50, maxWidth: 90 },
  { field: "col5", headerName: "Percorso", flex: 1, minWidth: 50 },
];

module.exports = { contenuto, rows, cols };
