const anno_frequenza = [
  { label: "Nessuno", id: 0 },
  { label: "I Anno", id: 1 },
  { label: "II Anno", id: 2 },
  { label: "III Anno", id: 3 },
  { label: "IV Anno", id: 4 },
  { label: "V Anno", id: 5 },
];

const materie = [
  { label: "Italiano", id: 1 },
  { label: "Filosofia", id: 2 },
  { label: "Geografia", id: 3 },
  { label: "Matematica", id: 4 },
  { label: "Fisica", id: 5 },
];

const rows = [
  {
    id: "1",
    col1: "I Anno",
    col2: "Italiano",
  },
  {
    id: "2",
    col1: "II Anno",
    col2: "Matematica",
  },
];

const cols = [
  { field: "col1", headerName: "Anno Frequenza", flex: 1, minWidth: 50 },
  { field: "col2", headerName: "Materia", flex: 1, minWidth: 50 },
];

module.exports = { anno_frequenza, materie, rows, cols };
