import * as yup from "yup";
const cfg = require("./config");

async function validateForm(formData) {
  // console.log(formData);

  const id = formData.id;
  let data = {};
  let schema = yup.object().shape({});

  switch (id) {
    case cfg.FRM_GSTU_STEP_0:
      break;
    case cfg.FRM_GSTU_STEP_1:
      switch (formData.tab) {
        case 0:
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
            cf: yup.string().required("Inserire un valore per Codice Fiscale."),
            nome: yup.string().required("Inserire un valore per Nome."),
            cognome: yup.string().required("Inserire un valore per Cognome."),
          });
          break;
        case 1:
          data = {
            iscr_istituto: formData.iscr_istituto.id,
            iscr_tipostudente: formData.iscr_tipostudente.id,
            iscr_annofreq: formData.iscr_annofreq.id,
            iscr_accademico: formData.iscr_accademico.id,
          };
          schema = yup.object().shape({
            iscr_istituto: yup
              .number()
              .moreThan(0, "Inserire un valore per Istituto"),
            iscr_tipostudente: yup
              .number()
              .moreThan(0, "Inserire un valore per Tipo Studente"),
            iscr_annofreq: yup
              .number()
              .moreThan(0, "Inserire un valore per Anno Frequenza"),
          });
          break;
      }
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
