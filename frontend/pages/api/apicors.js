import { cors } from "../../lib/init-cors";

const CLOUD_BASE_URL = process.env.API_SERVER;
const CLOUD_API_CLAS_CONTE_UPLOAD = "api/ColeContenutoLezioneDats/UploadFile";
const ColeContenutoLezioneDatsUpload = `${CLOUD_BASE_URL}/${CLOUD_API_CLAS_CONTE_UPLOAD}`;

export default async function handler(req, res) {
  await cors(req, res);
  // const upl_endpoint = `${ColeContenutoLezioneDatsUpload}/1`;
  console.log("APICORS", req.method);

  const userLogin = {
    userID: req.headers.userid,
    token: req.headers.token,
  };

  const destination = req.headers.destination;

  console.log(userLogin);
  console.log(destination);

  // console.log(req.body);

  console.log("TIPO", typeof req.body);

  // const endpoint = `${process.env.API_SERVER}/api/apicors`;

  //   var myHeaders = new Headers();
  //   // myHeaders.append("Accept", "application/json");
  //   // myHeaders.append("Access-Control-Allow-Origin", "*");
  //   // myHeaders.append(
  //   //   "Access-Control-Allow-Headers",
  //   //   "Origin, X-Requested-With, Content-Type, Accept"
  //   // );
  //   // myHeaders.append("Content-Type", "multipart/form-data");
  //   myHeaders.append("Authorization", "Bearer " + user.token);

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     // body: formData,
  //     // redirect: "follow",
  //   };

  //   await fetch(endpoint, {
  //     requestOptions,
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("Success:", result);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });

  res.status(200).json({ status: 200, message: "USING CORS API" });
}
