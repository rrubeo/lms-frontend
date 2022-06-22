const utils = require("../../../lib/utils");

export default async function handler(req, res) {
  await utils.cors(req, res);

  // const { headers, file } = req;
  // const { buffer, originalname: filename } = files[0];

  // console.log(headers);
  // var FormData = require("form-data");
  // var fs = require("fs");
  console.log("SERVER UPLOAD");
  // console.log(req);

  console.log(req.body.originalname);
  
  const formdata = req.body;

  var myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Type", "multipart/form-data");
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlJvbW9sbyIsIm5iZiI6MTY1NTY1NTIyMSwiZXhwIjoxNjU1NjkxMjIxLCJpYXQiOjE2NTU2NTUyMjF9.JHxr_xFeINhDRdM2w8Lue3GkcYDgN1cVMNG9bUs8P_8"
  );
  // var formdata = new FormData();
  // formdata.append(
  //   "file",
  //   fileInput.files[0],
  //   "/F:/GD/Il mio Drive/Romolo Rubeo/Audio/RR - Sub_Linkwitz/14110154.pdf"
  // );
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  console.log("SERVER FETCH");
  await fetch(
    "http://lmswebapidev.cloudandpartners.com/api/ColeContenutoLezioneDats/UploadFile/21",
    requestOptions
  )
    .then((response) => response.text())
    .then((response) => {
      console.log("RESPONSE");
      console.log(response);
    })
    .then((result) => {
      console.log("RESULT");
      console.log(result);
    })
    .catch((error) => {
      console.log("ERROR");
      console.log("error", error);
    });
  console.log("SERVER END");
  res.status(200).json({ status: 200, message: "OK" });
}
