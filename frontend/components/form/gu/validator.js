import * as yup from "yup";
const cfg = require("./config");

async function validateForm(formData) {
  // console.log(formData);

  const id = formData.id;
  let data = {};
  let schema = yup.object().shape({});

  switch (id) {
    case cfg.FRM_GU_STEP_0:
      break;
    case cfg.FRM_GU_STEP_1:
      data = {
        email: formData.email,
        cell: formData.cell,
        fisso: formData.fisso,
        cf: formData.cf,
        nome: formData.nome,
        cognome: formData.cognome,
        nascita: formData.nascita,
        nas_paese: formData.nas_paese.id,
        nas_regione: formData.nas_regione.id,
        nas_provincia: formData.nas_provincia.id,
        nas_comune: formData.nas_comune.id,
      };
      schema = yup.object().shape({
        email: yup.string().required("Inserire un valore per eMail."),
        cognome: yup.string().required("Inserire un valore per Cognome."),
        nome: yup.string().required("Inserire un valore per Nome."),
        cf: yup.string().required("Inserire un valore per Codice Fiscale."),
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
