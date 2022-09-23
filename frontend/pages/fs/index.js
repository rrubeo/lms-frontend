import React from "react";
import DCT_Layout from "../../components/layout/DCT_Layout";
import Loader from "../../components/layout/loader";
import Wip from "../../components/layout/wip";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import { withIronSessionSsr } from "iron-session/next";
import { defaultLogin, sessionOptions, getAuthSession } from "../../lib";
import useUser from "../../lib/useUser";
import FS_ProfileStudent from "../../components/form/fs/FS_ProfileStudent";
import FS_Progress from "../../components/form/fs/FS_Progress.js";
import FS_Accordion_Home from "../../components/form/fs/FS_Accordion_Home.js";
import FS_List from "../../components/form/fs/FS_List";
import { PAGE_401 } from "../../lib/redirect";
import fsStyle from "../../styles/Fs.module.css";
import jnStyles from "../../styles/utils.module.css";

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
  fallback.apiUrl = fs_cfg.FS_FUNZIONI_HOME_STUDENTE;
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

function HomepageStudente() {
  const { user } = useUser({
    redirectTo: PAGE_401,
  });

  const { fallback, mutate } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="fs" />;  
  if (data.status != 200) return <Wip>{data.message}</Wip>;

  const handleSubmit = async (event, formData) => {};

  const handleDelete = async (rowData) => {};

  const handleNextStep = async (event, filter, route) => {};

  return (
    <>
      <DCT_Layout id="Layout" data={data} user={user}>
        <Container disableGutters maxWidth="false">
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <FS_ProfileStudent
                profile={data.profilo}
                urlPath={fs_cfg.IMAGE_BASE_URL}
              />
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
              <FS_Progress
                type="home"
                title="Avanzamento corso"
                profile={data.profilo}
              />
            </Grid>
          </Grid>
        </Container>

        <Container disableGutters maxWidth="false" sx={{ paddingTop: "2%" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <FS_List
                background="#B34B9E"
                class="lessonsCard"
                title="Corsi attivi"
                array={[{ id: 1, name: data.profilo.iscrizione }]}
                type="text"
                height="120px"
                clickable={false}
              />

              <FS_List
                background="#798CB4"
                class="lessonsCard"
                title="Ultime lezioni viste"
                array={data.lezioniViste.splice(0, 5)}
                type="text"
                height="510px"
                clickable={false}
              />

              <Button
                sx={{ marginTop: "3%" }}
                variant="contained"
                classes={{ root: jnStyles.jnBT }}
                href="../fs/aula"
              >
                Classe virtuale
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              {data.materie.map((item) => (
                <FS_Accordion_Home
                  key={item.lezioniStudenteAnno.id}
                  title={item.lezioniStudenteAnno.descr}
                  array={item.lezioniStudenteMATERIA1}
                />
              ))}
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
      <HomepageStudente />
    </SWRConfig>
  );
}
