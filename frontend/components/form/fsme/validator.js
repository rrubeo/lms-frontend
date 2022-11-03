import * as yup from "yup";
const tu_cfg = require("./config");

async function validateForm(formData) {
  // console.log(formData);

  const id = formData.id;
  let data = {};
  let schema = yup.object().shape({});

  switch (id) {
    case tu_cfg.FRM_FSME_STEP_4:
      data = {
        fascia: formData.fascia.fasciaOraria
          ? formData.fascia.fasciaOraria
          : "",
        oggetto: formData.oggetto,
      };
      schema = yup.object().shape({
        fascia: yup
          .string()
          .required("Selezionare una fascia oraria disponibile."),
        oggetto: yup.string().required("Inserire un valore per Oggetto."),
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
