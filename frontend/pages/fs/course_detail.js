import React from "react";
import { useEffect, useState } from "react";
import DCT_Layout from "../../components/layout/DCT_Layout";
import Loader from "../../components/layout/loader";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import { withIronSessionSsr } from "iron-session/next";
import { defaultLogin, sessionOptions, getAuthSession } from "../../lib";
import useUser from "../../lib/useUser";
import FS_Accordion_Lesson from "../../components/form/fs/FS_Accordion_Lesson.js";
import FS_Progress from "../../components/form/fs/FS_Progress.js";
import fsStyle from "../../styles/Fs.module.css";
import jnStyles from "../../styles/utils.module.css";

const utils = require("../../lib/utils");
const API = `${process.env.server}/menu`;

export const pageTitle = "Home";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  let fallback = {
    authenticated: false,
    userInfo: defaultLogin,
  };

  const authSession = await getAuthSession(req);

  if (!authSession) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        fallback: fallback,
      },
    };
  }

  fallback.pageName = "home";
  fallback.apiUrl = API;
  fallback.authenticated = true;
  fallback.userInfo = authSession;
  fallback.pageQuery = query;

  return {
    props: {
      fallback: fallback,
    },
  };
},
sessionOptions);

function LessonDetail() {
  const { user } = useUser({
    redirectTo: "/401",
  });

  const { fallback } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="home" />;
  if (data.status != 200) return <div>{data.message}</div>;

  function handleClick(event) {
    event.preventDefault();
    window.location.href = "../fs";
  }

  const breadcrumbs = [
    <Link
      className={jnStyles.jnP1}
      underline="hover"
      key="1"
      href="/fs"
      onClick={handleClick}
    >
      HOME
    </Link>,
    <Link className={jnStyles.jnP1} underline="none" key="2">
      INFORMATICA
    </Link>,
  ];

  return (
    <>
      <DCT_Layout id="Layout" data={data}>
        <Container disableGutters maxWidth="false">
          <Breadcrumbs
            color="#A7A7A7"
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
          <Container disableGutters maxWidth="false">
            <Grid container style={{ alignItems: "center" }}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Typography variant="h1" className={jnStyles.jnA1}>
                  Informatica (n)
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                className={fsStyle.progressContentGrid}
              >
                <FS_Progress title="Completato" percentage="100" />
              </Grid>
            </Grid>
          </Container>
          <Container disableGutters maxWidth="false">
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <FS_Accordion_Lesson />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                Ciao
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                Ciao
              </Grid>
            </Grid>
          </Container>
        </Container>
      </DCT_Layout>
    </>
  );
}

export default function Home({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <LessonDetail />
    </SWRConfig>
  );
}
