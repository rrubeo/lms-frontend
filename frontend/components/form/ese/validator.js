import * as yup from "yup";
const ese_cfg = require("./config");

async function validateForm(formData) {
  const id = formData.id;
  let data = {};
  let schema = yup.object().shape({});

  switch (id) {
    case pb_cfg.FRM_ESE_STEP_0:
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
