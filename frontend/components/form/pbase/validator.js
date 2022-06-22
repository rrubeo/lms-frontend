import * as yup from "yup";
const pb_cfg = require("./config");

async function validateForm(formData) {
  // console.log(formData);

  const id = formData.id;
  let data = {};
  let schema = yup.object().shape({});

  switch (id) {
    case pb_cfg.FRM_PBASE_STEP_0:
      break;
    case pb_cfg.FRM_PBASE_STEP_1:
      data = {
        anno: formData.anno.id,
        materie: formData.materie.length,
      };
      schema = yup.object().shape({
        anno: yup.number().moreThan(0, "Inserire un valore per Anno Frequenza"),
        materie: yup.number().moreThan(0, "Inserire un valore per Materie"),
      });
      break;
    case pb_cfg.FRM_PBASE_STEP_2:
      data = {
        classe: formData.classe,
      };
      schema = yup.object().shape({
        classe: yup
          .string()
          .required("Inserire un valore per Classe Argomento."),
      });
      break;
    case pb_cfg.FRM_PBASE_STEP_3:
      data = {
        argomento: formData.argomento,
      };
      schema = yup.object().shape({
        argomento: yup.string().required("Inserire un valore per Argomento."),
      });
      break;
    case pb_cfg.FRM_PBASE_STEP_4:
      data = {
        lezione: formData.lezione,
      };
      schema = yup.object().shape({
        lezione: yup.string().required("Inserire un valore per Lezione."),
      });
      break;
    case pb_cfg.FRM_PBASE_STEP_5:
      data = {
        percorso: formData.percorso,
        nome: formData.nome,
        durata: formData.durata,
      };
      schema = yup.object().shape({
        // percorso: yup
        //   .string()
        //   .required("Inserire un valore per Percorso file."),
        nome: yup.string().required("Inserire un valore per Nome contenuto."),
        durata: yup
          .number()
          .typeError("Inserire la durata in minuti")
          .moreThan(0, "Inserire un valore maggiore di zero")
          .required("Inserire un valore per Durata."),
      });
      break;
  }
  let vres = {};
  await schema
    .validate(data)
    .then(function (value) {
      vres = {
        valid: true,
        data: value,
      };
      //   console.log(vres); // returns car object
    })
    .catch(function (err) {
      vres = {
        valid: false,
        data: err,
      };
      //   console.log(vres);
    });
  return vres;
}

module.exports = { validateForm };
