import React from "react";
import useUser from "../../lib/useUser";
import { useRouter } from "next/router";
import { fetchJson, FetchError } from "../../lib";

export default function SgProfile() {
  const { user, mutateUser } = useUser({
    redirectTo: "/login",
  });
  // console.log("PAGE");
  // console.log(user);
  const router = useRouter();

  const handleRead = async () => {
    const endpoint = `${process.env.frontend}/api/apicors`;

    // myHeaders.append("Accept", "application/json");
    // myHeaders.append("Access-Control-Allow-Origin", "*");
    // myHeaders.append(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept"
    // );
    // myHeaders.append("Content-Type", "multipart/form-data");

    let myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + user.token);
    myHeaders.append("UserId", user.login);
    myHeaders.append("Token", user.token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: { id: "Ciao" },
      redirect: "follow",
    };

    const response = await fetch(endpoint, requestOptions);
    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <pre>
        <a
          href="/api/logout"
          onClick={async (e) => {
            e.preventDefault();
            mutateUser(
              await fetchJson("/api/logout", { method: "POST" }),
              false
            );
            //   router.push("/login");
          }}
        >
          Logout
        </a>
      </pre>
      {user && (
        <>
          <p style={{ fontStyle: "italic" }}>USER</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
      <div>
        <button onClick={handleRead}>CALL CORS</button>
      </div>
    </>
  );
}
