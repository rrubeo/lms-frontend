const utils = require("../../lib/utils");
const cfg = require("../../config");

const rows = [
  {
    id: utils.getUID(),
    col1: "ASDGFT76H56F343F",
    col2: "Carlo Bianchi",
    col3: "22/11/22",
    col4: "Roma",
  },
  {
    id: utils.getUID(),
    col1: "ASDGFT76H56F343F",
    col2: "Carlo Bianchi",
    col3: "22/11/22",
    col4: "Roma",
  },
  {
    id: utils.getUID(),
    col1: "ASDGFT76H56F343F",
    col2: "Carlo Bianchi",
    col3: "22/11/22",
    col4: "Roma",
  },
  {
    id: utils.getUID(),
    col1: "ASDGFT76H56F343F",
    col2: "Carlo Bianchi",
    col3: "22/11/22",
    col4: "Roma",
  },
];

const cols = [
  {
    field: "col1",
    headerName: "Codice fiscale",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
  },
  { field: "col2", headerName: "Nominativo", flex: 1, minWidth: 50 },
  {
    field: "col3",
    headerName: "Data di nascita",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
  },
  { field: "col4", headerName: "Luogo di nascita", flex: 1, minWidth: 50 },
];

const cols_iscrizioni = [
  {
    field: "col1",
    headerName: "Anno Frequenza",
    flex: 1,
    minWidth: 50,
    maxWidth: 100,
  },
  {
    field: "col2",
    headerName: "Indirizzo Istituto",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "col3",
    headerName: "Anno Accademico",
    flex: 1,
    minWidth: 50,
    maxWidth: 100,
  },
  {
    field: "col4",
    headerName: "Data Iscrizione",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
  },
  {
    field: "col5",
    headerName: "Tipo Studente",
    flex: 1,
    minWidth: 50,
    maxWidth: 100,
  },
  {
    field: "col6",
    headerName: "Attivazione",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
  },
  {
    field: "col7",
    headerName: "Disattivazione",
    flex: 1,
    minWidth: 50,
    maxWidth: 150,
  },
  {
    field: "col8",
    headerName: "Crediti",
    flex: 1,
    minWidth: 50,
    maxWidth: 90,
    type: "number",
    align: "right",
  },
  {
    field: "col9",
    headerName: "Importo",
    flex: 1,
    minWidth: 50,
    maxWidth: 90,
    type: "number",
    align: "right",
  },
];

const cols_servizi = [
  {
    field: "col1",
    headerName: "Servizio Sottoscritto",
    flex: 1,
    minWidth: 50,
    maxWidth: 250,
  },
  {
    field: "col2",
    headerName: "Data Sottoscrizione",
    flex: 1,
    minWidth: 50,
  },
];

const cols_pagamenti = [
  {
    field: "col1",
    headerName: "Importo Pagato",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
    type: "number",
    align: "right",
  },
  {
    field: "col2",
    headerName: "Data Pagamento",
    flex: 1,
    minWidth: 50,
  },
];

const cols_tutor = [
  {
    field: "col1",
    headerName: "Cognome",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
  },
  {
    field: "col2",
    headerName: "Nome",
    flex: 1,
    minWidth: 50,
  },
];

const cols_docenti = [
  {
    field: "col1",
    headerName: "Materia",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
  },
  {
    field: "col2",
    headerName: "Cognome",
    flex: 1,
    minWidth: 50,
    maxWidth: 200,
  },
  {
    field: "col3",
    headerName: "Nome",
    flex: 1,
    minWidth: 50,
  },
];

module.exports = {
  rows,
  cols,
  cols_iscrizioni,
  cols_servizi,
  cols_pagamenti,
  cols_tutor,
  cols_docenti,
};
