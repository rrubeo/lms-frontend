import React from "react";
import useUser from "../../lib/useUser";
import { useRouter } from "next/router";
import { fetchJson, FetchError } from "../../lib";

export default function SgProfile() {
  const { user, mutateUser } = useUser({
    redirectTo: "/login",
  });
  console.log("PAGE");
  console.log(user);
  const router = useRouter();

  return (
    <>
      <a
        href="/api/logout"
        onClick={async (e) => {
          e.preventDefault();
          mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);
          //   router.push("/login");
        }}
      >
        Logout
      </a>
      {user && (
        <>
          <p style={{ fontStyle: "italic" }}>USER</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </>
  );
}
