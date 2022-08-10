import * as yup from "yup";
const cfg = require("./config");

async function validateForm(formData) {
  const id = formData.id;
  let data = {};
  let schema = yup.object().shape({});

  switch (id) {
    case cfg.FRM_AR_STEP_0:
      break;
    case cfg.FRM_AR_STEP_1:
      data = {
        username: formData.username,
      };
      schema = yup.object().shape({
        username: yup.string().required("Inserire un valore Username."),
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
