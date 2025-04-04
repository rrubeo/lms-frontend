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

const cols_moni_appuntamenti = [
  {
    field: "col1",
    headerName: "Docente/Tutor",
    align: "left",
    flex: 1,
    minWidth: 50,
    maxWidth: 300,
  },
  {
    field: "col2",
    headerName: "Studente",
    align: "left",
    flex: 1,
    minWidth: 50,
    maxWidth: 300,
  },
  {
    field: "col3",
    type: "date",
    headerName: "Data",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
    align: "center",
  },
  {
    field: "col4",
    type: "dateTime",
    headerName: "Inizio",
    flex: 1,
    minWidth: 50,
    maxWidth: 90,
    align: "center",
  },
  {
    field: "col5",
    type: "dateTime",
    headerName: "Fine",
    flex: 1,
    minWidth: 50,
    maxWidth: 90,
    align: "center",
  },
  {
    field: "col6",
    headerName: "Durata (ore)",
    flex: 1,
    minWidth: 50,
    maxWidth: 80,
    type: "number",
    align: "right",
  },
  {
    field: "col7",
    headerName: "Stato",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
  },
  {
    field: "col8",
    headerName: "Tipo",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
  },
  {
    field: "col9",
    headerName: "Titolo",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col10",
    headerName: "Commento",
    flex: 1,
    minWidth: 50,
  },
];

const cols_mon_lezz_app = [
  {
    field: "col1",
    headerName: "Lezione",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col2",
    type: "date",
    headerName: "Data",
    flex: 1,
    minWidth: 50,
    maxWidth: 100,
    align: "center",
  },
  {
    field: "col3",
    headerName: "Oggetto",
    align: "left",
    flex: 1,
    minWidth: 50,
  },
  {
    field: "col4",
    type: "dateTime",
    headerName: "Inizio",
    flex: 1,
    minWidth: 50,
    maxWidth: 90,
    align: "center",
  },
  {
    field: "col5",
    type: "dateTime",
    headerName: "Fine",
    flex: 1,
    minWidth: 50,
    maxWidth: 90,
    align: "center",
  },
];

module.exports = {
  cols_studenti,
  cols_dettaglio,
  cols_lezioni,
  cols_appuntamenti,
  cols_moni_appuntamenti,
  cols_mon_lezz_app,
};
