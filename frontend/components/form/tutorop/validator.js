import * as yup from "yup";
const tu_cfg = require("./config");

async function validateForm(formData) {
  // console.log(formData);

  const id = formData.id;
  let data = {};
  let schema = yup.object().shape({});

  switch (id) {
    case tu_cfg.FRM_TUT_STEP_0:
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
