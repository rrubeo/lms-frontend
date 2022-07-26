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
import FS_List from "../../components/form/fs/FS_List";
import FS_Progress from "../../components/form/fs/FS_Progress.js";
import FS_Video_Player from "../../components/form/fs/FS_Video_Player";
import FS_Image_Carousel from "../../components/form/fs/FS_Image_Carousel";
import FS_Footer from "../../components/form/fs/FS_Footer";
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
  
  fallback.authenticated = true;
  fallback.userInfo = authSession;
  fallback.pageQuery = query;
  fallback.apiUrl = fs_cfg.FS_FUNZIONI_DETTAGLIO+"/"+query.classeArgomento+"/"+query.lezione;


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
      {data.argomento[0].lezioniStudenteMATERIA1[0].lezioniStudenteMateria.lezioniStudenteMateria.descr.toUpperCase()}
    </Link>,
  ];

  
  //CLICK SU BREADCRUMBS
  function handleClick() {
    window.location.href = "../fs";
  }

  //CLICK SU FRECCIA LISTA
  function handleClickArg(clickable, itemId, lessonId){
    if (clickable){
      window.location.href = "../fs/dettaglio?classeArgomento="+itemId+"&lezione="+lessonId;
    }   
  };

  //CLICK PROSSIMA LEZIONE
  function handleClickNext(list, index) {
    if (list.length>0){
      if (index < (list.length-1)){
        index = index+1;
        const queryParams = new URLSearchParams(window.location.search);
        const itemId = queryParams.get('classeArgomento');
        window.location.href = "../fs/dettaglio?classeArgomento="+itemId+"&lezione="+list[index].idLezione;
      }
    }
  }


  function setArray(list) {
    const data = list.map((x) => {
      return {
        id: x.idLezione,
        name: x.lezione,
      };
    });

    return data;
  }


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
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <Typography variant="h1" className={jnStyles.jnA1}>
                {data.argomento[0].lezioniStudenteMATERIA1[0].lezioniStudenteMateria.lezioniStudenteMateria.descr}
              </Typography>
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
              <FS_Progress type="dettaglio" title="Completato" percentage={data.argomento[0].lezioniStudenteMATERIA1[0].lezioniStudenteMateria.lezioniStudenteMateria.percentualeAvanzamento} />
            </Grid>
          </Grid>
        </Container>

        <Container disableGutters maxWidth="false" sx={{ paddingTop: "2%" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
              <FS_List
                background="#B34B9E"
                class="lessonsCard"
                title={data.argomento[0].lezioniStudenteMATERIA1[0].lezioniStudenteCLASSE1[0].lezioniStudenteClasse.descr}
                arg={data.argomento[0].lezioniStudenteMATERIA1[0].lezioniStudenteCLASSE1[0].lezioniStudenteClasse.id}
                array={setArray(data.argomento[0].lezioniStudenteMATERIA1[0].lezioniStudenteCLASSE1[0].lezioniStudenteLezione1)}
                clickable={true}
                type="text"
                height="510px"
                onClickFunction={handleClickArg}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
              <FS_Video_Player
                title={data.lezione.lezione}
                url={data.contenutoVideo ? data.contenutoVideo.contenutoPercorso : ' '}
              />

              <FS_Image_Carousel/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            </Grid>
          </Grid>
        </Container>

        <Container disableGutters maxWidth="false" sx={{marginTop: '2%'}}>
          <FS_Footer
            index={data.index}
            array={data.argomento[0].lezioniStudenteMATERIA1[0].lezioniStudenteCLASSE1[0].lezioniStudenteLezione1}
            onClickNext={handleClickNext}
          />
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
