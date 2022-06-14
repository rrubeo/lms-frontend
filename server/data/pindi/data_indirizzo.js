const indirizzo_istituto = [
  { label: "Liceo Scientifico Tradizionale", id: 1 },
  { label: "Liceo Scientifico Sportivo", id: 2 },
];

const programma_base = [
  { label: "Italiano - I Anno", id: 1 },
  { label: "Italiano - II Anno", id: 2 },
  { label: "Italiano - III Anno", id: 3 },
  { label: "Italiano - IV Anno", id: 4 },
  { label: "Italiano - V Anno", id: 5 },
];

const rows = [
  {
    id: "1",
    col1: "Liceo Scientifico Tradizionale",
    col2: "Italiano - I Anno",
  },
  {
    id: "2",
    col1: "Liceo Scientifico Tradizionale",
    col2: "Italiano - II Anno",
  },
];

const cols = [
  { field: "col1", headerName: "Indirizzo Istituto", flex: 1, minWidth: 50 },
  { field: "col2", headerName: "Programma Base", flex: 1, minWidth: 50 },
];

module.exports = { indirizzo_istituto, programma_base, rows, cols };
