import React from "react";
import DCT_Layout from "../../components/layout/DCT_Layout";
import Loader from "../../components/layout/loader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import { withIronSessionSsr } from "iron-session/next";
import { defaultLogin, sessionOptions, getAuthSession } from "../../lib";
import useUser from "../../lib/useUser";
import FS_ProfileStudent from "../../components/form/fs/FS_ProfileStudent";
import FS_Progress from "../../components/form/fs/FS_Progress.js";
import FS_Accordion_Home from "../../components/form/fs/FS_Accordion_Home.js";
import FS_LastLessons from "../../components/form/fs/FS_LastLessons";

import fsStyle from "../../styles/Fs.module.css";

const utils = require("../../lib/utils");
const fs_cfg = require("../../components/form/fs/config");

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
  fallback.apiUrl = fs_cfg.FS_FUNZIONI_API;
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

function HomepageStudent() {
  const { user } = useUser({
    redirectTo: "/401",
  });

  const { fallback, mutate } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="home" />;
  if (data.status != 200) return <div>{data.message}</div>;

  return (
    <>
      <DCT_Layout id="Layout" data={data}>
        <Container disableGutters maxWidth="false">
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <FS_ProfileStudent />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={4}
              xl={4}
              className={fsStyle.progressContentGrid}
            >
              <FS_Progress title="Avanzamento corso" percentage="100" />
            </Grid>
          </Grid>
        </Container>

        <Container disableGutters maxWidth="false" sx={{ paddingTop: "2%" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <FS_LastLessons
                secondary={false}
                elementNumber={data.activeCourses.courses.length}
                background="#B2499B"
                title={data.activeCourses.title}
                array={data.activeCourses.courses}
              />
              <FS_LastLessons
                secondary={true}
                background="#798CB4"
                title={data.recentLessons.title}
                array={data.recentLessons.lessons}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <FS_Accordion_Home
                title={data.accordionElements.title}
                array={data.accordionElements.subjects}
              />
            </Grid>
          </Grid>
        </Container>
      </DCT_Layout>
    </>
  );
}

export default function Home({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <HomepageStudent />
    </SWRConfig>
  );
}
