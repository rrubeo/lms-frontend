import React from "react";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import { fetchJson, FetchError } from "../lib";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


import jnStyles from "../styles/utils.module.css";
export default function Home() {
  const { user, mutateUser } = useUser({
    redirectTo: "/login",
  });
  console.log("HOME");
  console.log(user);

  const router = useRouter();

  const handleLogin = async (event) => {
    router.push("login");
  };

  return (
    <>
      <Image alt="home" src="/images/login_bkg.png" layout="fill" priority />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Image
            layout="fixed"
            src="/images/janus_logo_login.png"
            height={58}
            width={300}
            priority
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            id="login"
            type="button"
            variant="contained"
            sx={{ borderRadius: 26 }}
            className={jnStyles.shadow}
            onClick={(event) => handleLogin(event)}
          >
            Login
          </Button>
          <Button
            id="logout"
            type="button"
            variant="contained"
            sx={{ borderRadius: 26 }}
            className={jnStyles.shadow}
            onClick={async (e) => {
              e.preventDefault();
              mutateUser(
                await fetchJson("/api/logout", { method: "POST" }),
                false
              );
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
