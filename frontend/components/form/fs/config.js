const FS_FUNZIONI_HOME_STUDENTE = `${process.env.server}/fs/funzioni/1`;
const FS_FUNZIONI_AULA = `${process.env.server}/fs/aula/1`;
const FS_FUNZIONI_DETTAGLIO = `${process.env.server}/fs/dettaglio/1`;

//ROWS ACTION
const FS_STEP_5_ACTION = [
    {
      id: "1",
      title: "Elimina",
      icon: "icon-delete2",
      route: "",
    },
  ];

module.exports = { 
  FS_FUNZIONI_HOME_STUDENTE,
  FS_FUNZIONI_AULA,
  FS_FUNZIONI_DETTAGLIO,
  FS_STEP_5_ACTION 
};
