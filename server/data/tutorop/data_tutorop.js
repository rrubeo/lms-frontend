const utils = require("../../lib/utils");
const cfg = require("../../config");

const cols_studenti = [
  {
    field: "col1",
    headerName: "Anno Frequenza",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
  },
  { field: "col2", headerName: "Istituto", flex: 1, minWidth: 50 },
  {
    field: "col3",
    headerName: "Indirizzo",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
  },
  {
    field: "col4",
    headerName: "Anno Accademico",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
  },
  { field: "col5", headerName: "Studente", flex: 1, minWidth: 50 },
  {
    field: "col6",
    type: "number",
    align: "right",
    headerName: "Avanzamento Corso",
    flex: 1,
    minWidth: 50,
    maxWidth: 120,
  },
  {
    field: "col7",
    headerName: "Note",
    flex: 1,
    minWidth: 50,
  },
];

const cols_dettaglio = [
  {
    field: "col1",
    headerName: "Materia",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
  },
  {
    field: "col2",
    type: "number",
    align: "right",
    headerName: "Avanzamento Materia",
    flex: 1,
    minWidth: 50,
    maxWidth: 120,
  },
  {
    field: "col3",
    headerName: "Classe Argomento",
    flex: 1,
    minWidth: 50,
  },
  { field: "col4", headerName: "Lezione", flex: 1, minWidth: 50 },
  {
    field: "col5",
    type: "boolean",
    headerName: "Completata",
    flex: 1,
    minWidth: 50,
    maxWidth: 100,
  },
];

const cols_dettaglio_mat = [
  {
    field: "col1",
    headerName: "Materia",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col2",
    type: "number",
    align: "right",
    headerName: "Avanzamento Materia",
    flex: 1,
    minWidth: 50,
    maxWidth: 120,
  },
];

const cols_dettaglio_mat_det = [
  {
    field: "col1",
    headerName: "Materia",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
  },
  {
    field: "col2",
    headerName: "Classe Argomento",
    flex: 1,
    minWidth: 50,
  },
  { field: "col3", headerName: "Lezione", flex: 1, minWidth: 50 },
  {
    field: "col4",
    type: "boolean",
    headerName: "Completata",
    flex: 1,
    minWidth: 50,
    maxWidth: 100,
  },
];

const cols_appuntamenti = [
  {
    field: "col1",
    headerName: "Data",
    align: "center",
    flex: 1,
    minWidth: 50,
    maxWidth: 100,
  },
  {
    field: "col2",
    headerName: "Ora Inizio",
    align: "center",
    flex: 1,
    minWidth: 50,
    maxWidth: 90,
  },
  {
    field: "col3",
    headerName: "Ora Fine",
    align: "center",
    flex: 1,
    minWidth: 50,
    maxWidth: 90,
  },
  {
    field: "col4",
    headerName: "Stato",
    flex: 1,
    minWidth: 50,
    maxWidth: 120,
  },
  {
    field: "col5",
    headerName: "Oggetto",
    flex: 1,
    minWidth: 50,
    maxWidth: 210,
  },
  {
    field: "col6",
    headerName: "Commento",
    flex: 1,
    minWidth: 50,
  },
];

const cols_lezioni = [
  {
    field: "col1",
    headerName: "Docente",
    flex: 1,
    minWidth: 50,
    maxWidth: 190,
  },
  {
    field: "col2",
    headerName: "Data",
    align: "center",
    flex: 1,
    minWidth: 50,
    maxWidth: 100,
  },
  {
    field: "col3",
    headerName: "Ora Inizio",
    align: "center",
    flex: 1,
    minWidth: 50,
    maxWidth: 90,
  },
  {
    field: "col4",
    headerName: "Ora Fine",
    align: "center",
    flex: 1,
    minWidth: 50,
    maxWidth: 90,
  },
  { field: "col5", headerName: "Stato", flex: 1, minWidth: 50, maxWidth: 120 },
  {
    field: "col6",
    headerName: "Oggetto",
    flex: 1,
    minWidth: 50,
    maxWidth: 120,
  },
  {
    field: "col7",
    headerName: "Commento",
    flex: 1,
    minWidth: 50,
  },
];

module.exports = {
  cols_studenti,
  cols_dettaglio,
  cols_lezioni,
  cols_appuntamenti,
  cols_dettaglio_mat,
  cols_dettaglio_mat_det,
};
