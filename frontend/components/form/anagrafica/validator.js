import * as yup from "yup";

const frm_SEC_Servizi = "SEC_Servizi";
const frm_SEC_Pagamenti = "SEC_Pagamenti";
const frm_SEC_Tutor = "SEC_Tutor";
const frm_SEC_Docenti = "SEC_Docenti";

async function validateForm(formData) {
  console.log("validateForm");
  console.log(formData);
  const id = formData.id;
  let data = {};
  let schema = yup.object().shape({});

  switch (id) {
    case frm_SEC_Servizi:
      data = {
        servizio: formData.servizio.id,
        sottoscritto: formData.sottoscritto,
      };
      schema = yup.object().shape({
        servizio: yup
          .number()
          .moreThan(0, "Selezionare un Servizio Aggiuntivo"),
      });
      break;
    case frm_SEC_Pagamenti:
      data = {
        pagamento: formData.pagamento,
        importo: formData.importo,
      };
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

module.exports = {
  validateForm,
  frm_SEC_Servizi,
  frm_SEC_Pagamenti,
  frm_SEC_Tutor,
  frm_SEC_Docenti,
};
