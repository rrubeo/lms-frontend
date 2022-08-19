import * as yup from "yup";

const frm_SEC_Servizi = "SEC_Servizi";
const frm_SEC_Pagamenti = "SEC_Pagamenti";
const frm_SEC_Tutor = "SEC_Tutor";
const frm_SEC_Docenti = "SEC_Docenti";
const frm_SEC_PianoStudi = "SEC_PianoStudi";

async function validateForm(formData) {
  // console.log("validateForm");
  // console.log(formData);
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
      schema = yup.object().shape({
        importo: yup.number().moreThan(0, "Inserire un Importo"),
      });
      break;
    case frm_SEC_Tutor:
      data = {
        tutor: formData.tutor.id,
      };
      schema = yup.object().shape({
        tutor: yup.number().moreThan(0, "Selezionare un Tutor"),
      });
      break;
    case frm_SEC_Docenti:
      data = {
        materie: formData.materie.id,
        nominativo: formData.nominativo.id,
      };
      schema = yup.object().shape({
        nominativo: yup.number().moreThan(0, "Selezionare un Docente"),
        materie: yup.number().moreThan(0, "Selezionare la Materia"),
      });
      break;
    case frm_SEC_PianoStudi:
      data = {
        prgbase: formData.prgbase.id,
        classe: formData.classe.id,
        argomento: formData.argomento.id,
      };
      schema = yup.object().shape({
        argomento: yup.number().moreThan(0, "Selezionare un Argomento"),
        classe: yup.number().moreThan(0, "Selezionare la Classe Argomento"),
        prgbase: yup.number().moreThan(0, "Selezionare un Programma Base"),
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

module.exports = {
  validateForm,
  frm_SEC_Servizi,
  frm_SEC_Pagamenti,
  frm_SEC_Tutor,
  frm_SEC_Docenti,
  frm_SEC_PianoStudi,
};
