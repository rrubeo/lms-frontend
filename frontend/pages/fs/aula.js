import React from "react";
import DCT_Layout from "../../components/layout/DCT_Layout";
import Loader from "../../components/layout/loader";
import Wip from "../../components/layout/wip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import { withIronSessionSsr } from "iron-session/next";
import { defaultLogin, sessionOptions, getAuthSession } from "../../lib";
import useUser from "../../lib/useUser";
import FS_List from "../../components/form/fs/FS_List";

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

  fallback.pageName = "aula";
  fallback.apiUrl = fs_cfg.FS_FUNZIONI_AULA;
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

function Aula() {
  const { user } = useUser({
    redirectTo: "/401",
  });

  const { fallback, mutate } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="aula" />;
  if (data.status != 200) return <Wip>{data.message}</Wip>;

  return (
    <>
      <DCT_Layout id="Layout" data={data} user={user}>
        <Container disableGutters maxWidth="false" sx={{ minHeight: "800px" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
              <FS_List
                title="I miei insegnanti"
                array={data.docenti}
                type="avatar"
                showImage={true}
                imageLink="/fs/calendarreservation?destType=docente"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2} xl={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
              <FS_List
                title="Il mio tutor"
                array={data.tutor}
                type="avatar"
                showImage={true}
                imageLink="/fs/calendarreservation?destType=tutor"
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
      <Aula />
    </SWRConfig>
  );
}
