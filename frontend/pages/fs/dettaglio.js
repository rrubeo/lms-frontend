import React from "react";
import { useEffect, useState } from "react";

import DCT_Layout from "../../components/layout/DCT_Layout";
import DCT_DownloadButton from "../../components/DCT_DownloadButton";
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
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import ZoomIn from "@mui/icons-material/ZoomIn";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import DTC_Player from "../../components/video/DTC_Player";
import Box from "@mui/material/Box";

const utils = require("../../lib/utils");
const fs_cfg = require("../../components/form/fs/config");
const CLOUD_BASE_URL = process.env.API_SERVER;
const CLOUD_API_TBL_LIST_INIZIO_LEZIONE = "api/Tables/StudenteSetInizioLezione";
const CLOUD_API_TBL_LIST_FINE_LEZIONE = "api/Tables/StudenteSetFineLezione";


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
  fallback.apiUrl =
    fs_cfg.FS_FUNZIONI_DETTAGLIO +
    "/" +
    query.classeArgomento +
    "/" +
    query.lezione;

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
  const [selectedFile, setSelectedFile] = useState();
  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="home" />;
  if (data.status != 200) return <div>{data.message}</div>;
  console.log(data);

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

  function handleOnClick(event, path) {
    console.log(path);
    window.open(path, "page");
    // window.location.href = path;
  }

  //CLICK SU FRECCIA LISTA
  function handleClickArg(clickable, itemId, lessonId) {
    if (clickable) {
      window.location.href =
        "../fs/dettaglio?classeArgomento=" + itemId + "&lezione=" + lessonId;
    }
  }

  //CLICK PROSSIMA LEZIONE
  function handleClickNext(list, index) {
    if (list.length > 0) {
      if (index < list.length - 1) {
        index = index + 1;
        const queryParams = new URLSearchParams(window.location.search);
        const itemId = queryParams.get("classeArgomento");
        window.location.href =
          "../fs/dettaglio?classeArgomento=" +
          itemId +
          "&lezione=" +
          list[index].idArgomento;
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

  function setArrayImages(list) {
    const data = list.map((x, index) => {
      return {
        id: index,
        images: x,
      };
    });

    return data;
  }

  function handleClickImage(index) {
    console.log("handleClickImage");
    for (var i = 0; i < data.immagini.length; i++) {
      document.getElementById("imgCarousel" + i).style.borderColor = "#000000";
      if (i == index) {
        document.getElementById("imgCarousel" + i).style.borderColor =
          "#B34B9E";
      }
    }
    document.getElementById("image").src = data.immagini[index].imagePath;
    setSelectedFile(data.immagini[index].imagePath);
  }

  function getImage(list) {
    if (Array.isArray(list)) {
      if (list.length > 0) {
        return (
          <>
            <img style={{ width: "100%" }} id="image" src={list[0].imagePath} />
            {/* <Image
              layout="responsive"
              height={600}
              width={400}
              id="image"
              src={list[0].imagePath}
            /> */}
          </>
        );
      }
    } else {
      return <Skeleton variant="rounded" width="100%" height="100%" />;
    }
  }

  async function SetFineLezione() {
    console.log(fallback.userInfo.login);
    const queryParams = new URLSearchParams(window.location.search);
    const lezione = queryParams.get("lezione");

    const data = await utils.fetchJson(`${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_FINE_LEZIONE}/${fallback.userInfo.login}/${lezione}`,      
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
        UserId: userInfo.login,
        Token: userInfo.token,
      },
    });
    }

    async function SetInizioLezione() {

      const queryParams = new URLSearchParams(window.location.search);
      const lezione = queryParams.get("lezione");
      console.log(fallback.userInfo.login);
      console.log(lezione);

      const data = await utils.fetchJson(`${CLOUD_BASE_URL}/${CLOUD_API_TBL_LIST_INIZIO_LEZIONE}/${fallback.userInfo.login}/${lezione}`,      
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userInfo.token,
          UserId: userInfo.login,
          Token: userInfo.token,
        },
      });
      }

  function OnVideoEnd(data) {
    console.log("OnVideoEnd");
    console.log(data);
    SetFineLezione();
    
  }

  function OnVideoLoaded(data) {
    console.log("OnVideoLoaded");
    console.log(data);
    SetInizioLezione();
  }

  return (
    <>
      <DCT_Layout id="Layout" data={data} user={user}>
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
              <Typography variant="h3" className={jnStyles.jnA1}>
                {
                  data.argomento[0].lezioniStudenteMATERIA1[0]
                    .lezioniStudenteMateria.lezioniStudenteMateria.descr
                }
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
              <FS_Progress
                type="dettaglio"
                title="Completato"
                percentage={
                  data.argomento[0].lezioniStudenteMATERIA1[0]
                    .lezioniStudenteMateria.lezioniStudenteMateria
                    .percentualeAvanzamento
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <Typography variant="h3" className={jnStyles.jnA1}>
                {
                  data.argomento[0].lezioniStudenteMATERIA1[0]
                    .lezioniStudenteCLASSE1[0].lezioniStudenteClasse.descr
                }
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Container disableGutters maxWidth="false" sx={{ paddingTop: "2%" }}>
          <Stack
            direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
            spacing={{ xs: 0, sm: 0, md: 0, lg: 5 }}
            mt={0}
            mb={0}
            p={0}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <FS_List
              background="#B34B9E"
              arg={
                data.argomento[0].lezioniStudenteMATERIA1[0]
                  .lezioniStudenteCLASSE1[0].lezioniStudenteClasse.id
              }
              array={setArray(
                data.argomento[0].lezioniStudenteMATERIA1[0]
                  .lezioniStudenteCLASSE1[0].lezioniStudenteLezione1
              )}
              clickable={true}
              type="text"
              height="500px"
              width="700px"
              onClickFunction={handleClickArg}
            />
            <Box
              component="div"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {data.contenuti.idVideo != 0 ? (
                <DTC_Player
                  OnVideoEnd={OnVideoEnd}
                  OnVideoLoaded={OnVideoLoaded}
                  video={
                    data.contenuti.pathVideo ? data.contenuti.pathVideo : " "
                  }
                  // title={data.lezione.lezione}
                  width="400"
                  responsive={true}
                />
              ) : (
                <Skeleton variant="rounded" width="100%" height="50%" />
              )}
              {data.contenuti.idPdf != 0 ? (
                <FS_Image_Carousel
                  array={data.immagini ? setArrayImages(data.immagini) : null}
                  index={0}
                  onClickFunction={handleClickImage}
                />
              ) : (
                <></>
              )}{" "}
            </Box>
            {data.contenuti.idPdf != 0 ? (
              <Box
                component="div"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: { xs: 1, sm: 1, md: 1, lg: "60%" },
                }}
              >
                <DCT_DownloadButton
                  id="zoomIgm"
                  src={selectedFile}
                  img="icon-zoom-in"
                />
                <DCT_DownloadButton
                  id="downPdf"
                  src={data.linkpdf}
                  img="icon-file-pdf"
                />
                {getImage(data.immagini)}
              </Box>
            ) : (
              <></>
            )}
          </Stack>
        </Container>

        {/* <Container disableGutters maxWidth="false" sx={{ marginTop: "2%" }}>
          <FS_Footer
            index={data.index}
            array={
              data.argomento[0].lezioniStudenteMATERIA1[0]
                .lezioniStudenteCLASSE1[0].lezioniStudenteLezione1
            }
            onClickNext={handleClickNext}
          />
        </Container> */}
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
