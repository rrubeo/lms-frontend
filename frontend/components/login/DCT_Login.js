import React from "react";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import jnStyles from "../../styles/utils.module.css";
import Image from "next/image";
import Grid from "@mui/material/Grid";

function Copyright() {
  return (
    <Typography
      elevation={1}
      minWidth="150pt"
      align="center"
      noWrap={true}
      variant="body2"
      classes={{
        body2: jnStyles.jnL1Copy,
      }}
      sx={{ zIndex: "tooltip" }}
    >
      {"© Copyright  "}
      <Link color="inherit" href="https://mui.com/">
        Janus
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function FooterText({ text }) {
  return (
    <Typography
      elevation={1}
      minWidth="90pt"
      align="center"
      noWrap={true}
      variant="body2"
      classes={{
        body2: jnStyles.jnL1,
      }}
      sx={{ zIndex: "tooltip" }}
    >
      {text}
    </Typography>
  );
}

export default function DCT_Login({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={process.env.sitetitle} />
        <title>{process.env.component}</title>
      </Head>
      <CssBaseline />
      <Image
        alt="home"
        src="/images/login_bkg.png"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3} style={{ minHeight: "20vh" }}></Grid>
        <Grid item xs={3} style={{ minHeight: "70vh" }}>
          {children}
        </Grid>
        <Grid item xs={3} style={{ minHeight: "10vh", zIndex: "tooltip" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              alignItems: "center",
            }}
          >
            <FooterText text="Termini e condizioni" />
            <FooterText text="Privacy" />
            <FooterText text="Chi siamo" />
            <FooterText text="Contattaci" />
            <FooterText text="Supporto" />
            <Copyright />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
