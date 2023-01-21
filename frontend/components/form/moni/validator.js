import * as yup from "yup";
const moni_cfg = require("./config");

async function validateForm(formData) {
  // console.log(formData);
  const id = formData.id;
  let data = {};
  let schema = yup.object().shape({});

  switch (id) {
    case moni_cfg.FRM_MONI_STEP_5:
      data = {
        docente: formData.docente.id == 0 ? "" : formData.docente.id,
        studente: formData.studente.id == 0 ? "" : formData.studente.id,
        titolo: formData.titolo,
        orario: formData.orario,
      };
      schema = yup.object().shape({
        orario: yup.string().required("Inserire l'orario dell'appuntamento."),
        titolo: yup.string().required("Inserire un testo per il titolo."),
        studente: yup.string().required("Selezionare uno studente."),
        docente: yup.string().required("Selezionare un docente."),
      });
      break;
    case moni_cfg.FRM_MONI_STEP_6:
      data = {
        notifica: formData.notifica,
        notifyList: formData.notifyList.length,
      };
      schema = yup.object().shape({
        notifica: yup.string().required("Inserire un testo per la notifica."),
        notifyList: yup.number().moreThan(0, "Selezionare uno studente"),
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
    })
    .catch(function (err) {
      vres = {
        valid: false,
        data: err,
      };
    });
  return vres;
}

module.exports = { validateForm };
