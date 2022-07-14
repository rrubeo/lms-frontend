const cols = [
  {
    field: "col1",
    headerName: "Numero",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
    type: "number",
    align: "right",
  },
  { field: "col2", headerName: "Tipo", flex: 1, minWidth: 50, maxWidth: 150 },
  {
    field: "col3",
    headerName: "Domanda",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col4",
    headerName: "Punteggio",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
    type: "number",
    align: "right",
  },
  {
    field: "col5",
    headerName: "Gruppo Domande",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
  },
];

module.exports = { cols };
