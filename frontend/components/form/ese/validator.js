import * as yup from "yup";
const ese_cfg = require("./config");

async function validateForm(formData) {
  const id = formData.id;
  let data = {};
  let schema = yup.object().shape({});

  switch (id) {
    case ese_cfg.FRM_ESE_STEP_0:
      break;
    case ese_cfg.FRM_ESE_STEP_1:
      break;
    case ese_cfg.FRM_ESE_STEP_2:
      data = {
        testoGruppo: formData.testoGruppo,
        nomeGruppo: formData.nomeGruppo,
      };
      schema = yup.object().shape({
        nomeGruppo: yup
          .string()
          .required("Inserire un valore per Nome Gruppo."),
        testoGruppo: yup
          .string()
          .required("Inserire il testo per il gruppo di domande."),
      });
      break;
    case ese_cfg.FRM_ESE_STEP_3:
      data = {
        nome: formData.nome,
        limite: formData.limite,
        punteggio: formData.punteggio,
        tipo: formData.tipo.id,
        livello: formData.livello.id,
      };
      schema = yup.object().shape({
        nome: yup
          .string()
          .required("Inserire un valore per Nome Esercitazione."),
        punteggio: yup
          .number()
          .typeError("Inserire il punteggio minimo.")
          .moreThan(
            0,
            "Inserire un valore maggiore di zero per punteggio minimo."
          )
          .required("Inserire un valore per punteggio minimo."),
        limite: yup
          .number()
          .typeError("Inserire il Limite Temporale.")
          .moreThan(
            0,
            "Inserire un valore maggiore di zero per Limite Temporale."
          ),
        tipo: yup
          .number()
          .moreThan(0, "Inserire un valore per Tipo Esercitazione"),
        livello: yup
          .number()
          .moreThan(0, "Inserire un valore per Livello Difficoltà"),
      });
      break;
    case ese_cfg.FRM_ESE_STEP_4:
      data = {
        domanda: formData.domanda,
        numero: formData.numero,
        punteggio: formData.punteggio,
        tipo: formData.tipo.id,
        gruppo: formData.gruppo.id,
      };
      schema = yup.object().shape({
        numero: yup
          .number()
          .typeError("Inserire il numero domanda.")
          .moreThan(
            0,
            "Inserire un valore maggiore di zero per numero domanda."
          )
          .required("Inserire un valore per numero domanda."),
        tipo: yup.number().moreThan(0, "Inserire un valore per Tipo Domanda"),
        punteggio: yup
          .number()
          .typeError("Inserire il punteggio.")
          .moreThan(0, "Inserire un valore maggiore di zero per punteggio.")
          .required("Inserire un valore per punteggio."),
        domanda: yup.string().required("Inserire il testo della domanda."),
      });
      break;
    case ese_cfg.FRM_ESE_STEP_5:
      data = {
        numero: formData.numero,
        risposta: formData.risposta,
        tipo: formData.tipo.id,
      };
      schema = yup.object().shape({
        numero: yup
          .number()
          .typeError("Inserire il numero risposta.")
          .moreThan(
            0,
            "Inserire un valore maggiore di zero per numero risposta."
          )
          .required("Inserire un valore per numero risposta."),
        tipo: yup
          .number()
          .moreThan(0, "Inserire un valore per Risposta Corretta"),
          risposta: yup.string().required("Inserire il testo della risposta."),
      });
      break;
    case ese_cfg.FRM_ESE_STEP_6:
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
