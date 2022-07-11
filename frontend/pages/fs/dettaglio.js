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
  fallback.apiUrl = fs_cfg.FS_FUNZIONI_DETTAGLIO;
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

function Dettaglio() {
  const { user } = useUser({
    redirectTo: "/401",
  });

  const { fallback } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="home" />;
  if (data.status != 200) return <div>{data.message}</div>;

  const materie = [];

  function handleClick(event) {
    event.preventDefault();
    window.location.href = "../fs";
  }

  /*
  var getArrayMaterie = function(){
    if (data.materie.length>0){
      for (var i= 0; i< data.materie.length; i++){
        getArrayMaterie2(data.materie[i].lezioni);
      }
    }
  };

  var getArrayMaterie2 = function(materieArray){
    if (materieArray.length>0){
      for (var i= 0; i< materieArray.length; i++){
        getArrayMaterie3(materieArray[i].materiA1);
      }  
    }
  };

  var getArrayMaterie3 = function(materieArray){
    if (materieArray.length>0){
      for (var i= 0; i< materieArray.length; i++){
        getArrayMaterie4(materieArray[i].classE1);
      }  
    }
  };

  var getArrayMaterie4 = function(materieArray){
    if (materieArray.length>0){
      for (var i= 0; i< materieArray.length; i++){
        getArrayMaterie5(materieArray[i].lezione1);
      }  
    }
  };

  var getArrayMaterie5 = function(materieArray){
    if (materieArray.length>0){
      for (var i= 0; i< materieArray.length; i++){
        materie.push(materieArray[i]);
      }  
    }
  };

  var getLezioneById = function(list, itemId){

  };
  */

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

  //getArrayMaterie();

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
                <FS_Progress type="dettaglio" title="Completato" percentage={100} />
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
      <Dettaglio />
    </SWRConfig>
  );
}
