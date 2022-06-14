const classe_select = [
  { label: "Grammatica - Verbi - Lezione 1", id: 1 },
  { label: "Grammatica - Verbi - Lezione 2", id: 2 },
  { label: "Grammatica - Verbi Transitivi - Lezione 1", id: 3 },
  { label: "Grammatica - Verbi Transitivi - Lezione 2", id: 4 },
  { label: "Grammatica - Forma Passiva - Lezione 1", id: 5 },
];

const rows = [
  {
    id: "1",
    col1: "Grammatica",
    col2: "Verbi",
    col3: "Lezione 1",
  },
  {
    id: "2",
    col1: "Epica",
    col2: "Iliade",
    col3: "Lezione 1",
  },
];

const cols = [
  { field: "col1", headerName: "Classe Argomento", flex: 1, minWidth: 50 },
  { field: "col2", headerName: "Argomento", flex: 1, minWidth: 50 },
  { field: "col3", headerName: "Lezione", flex: 1, minWidth: 50 },
];

module.exports = { rows, cols, classe_select };
