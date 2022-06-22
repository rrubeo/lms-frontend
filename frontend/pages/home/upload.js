import React, { useState } from "react";
const utils = require("../../lib/utils");
function getAuthorization(token) {
  let auth = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  // console.log(auth);
  return auth;
}

export default function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    console.log(event.target.files);
    console.log(event.target.files[0]);

    
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleRead = async () => {
    const endpoint = "http://localhost:3002/school/api/pbase/contenuto";

    // const res = await utils.getData(endpoint);
    // console.log(res);
    var requestOptions = {
      method: "GET",
      headers: getAuthorization(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlJvbW9sbyIsIm5iZiI6MTY1NTc2Mzg1NywiZXhwIjoxNjU1Nzk5ODU3LCJpYXQiOjE2NTU3NjM4NTd9.o58yTj0YemtJ0hG0hklfdcWaP625J4J4o59pLOLUv3s"
      ),
    };

    await fetch(endpoint, {
      requestOptions,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmission = async () => {
    const formData = new FormData();

    const { name } = selectedFile;
    formData.append("file", selectedFile, name);
    // formData.append("file", selectedFile, selectedFile.name);

    for (const value of formData.values()) {
      console.log(value);
    }
    //   "file",
    //   fileInput.files[0],
    //   "/F:/GD/Il mio Drive/Romolo Rubeo/Audio/RR - Sub_Linkwitz/14110154.pdf"

    var myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlJvbW9sbyIsIm5iZiI6MTY1NTY1NTIyMSwiZXhwIjoxNjU1NjkxMjIxLCJpYXQiOjE2NTU2NTUyMjF9.JHxr_xFeINhDRdM2w8Lue3GkcYDgN1cVMNG9bUs8P_8"
    );

    var requestOptions = {
      method: "POST",
      mode: "cors",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };

    const endpoint =
      "http://lmswebapidev.cloudandpartners.com/api/ColeContenutoLezioneDats/UploadFile/21";
    // const endpoint=`${process.env.server}/upload/21`

    await fetch(endpoint, {
      requestOptions,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Filetype: {selectedFile.p}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
      <div>
        <button onClick={handleRead}>Read</button>
      </div>
    </div>
  );
}
