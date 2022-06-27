import React from "react";
import DCT_Layout from "../../components/layout/DCT_Layout";
import Loader from "../../components/layout/loader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import { withIronSessionSsr } from "iron-session/next";
import { defaultLogin, sessionOptions, getAuthSession } from "../../lib/";
import useUser from "../../lib/useUser";
import FS_ProfileStudent from "../../components/fs/FS_ProfileStudent.js";
import FS_Progress from "../../components/fs/FS_Progress.js";
import FS_Accordion_Home from "../../components/fs/FS_Accordion_Home.js";
import FS_LastLessons from "../../components/fs/FS_LastLessons";
import fsStyle from '../../styles/Fs.module.css';

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

function HomepageStudent() {
  const { user } = useUser({
    redirectTo: "/401",
  });

  const { fallback } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="home" />;
  if (data.status != 200) return <div>{data.message}</div>;

  const accordionElements = {
    title: "Materie Anno II",
    subjects: [
      {
        id: 1,
        title: "Accordion1",
        contentText: "Text1"
      },
      {
        id: 2,
        title: "Accordion2",
        contentText: "Text2"
      },
      {
        id: 3,
        title: "Accordion3",
        contentText: "Text3"
      },
      {
        id: 4,
        title: "Accordion4",
        contentText: "Text4"
      },
      {
        id: 5,
        title: "Accordion5",
        contentText: "Text5"
      },
      {
        id: 6,
        title: "Accordion6",
        contentText: "Text6"
      },
      {
        id: 7,
        title: "Accordion7",
        contentText: "Text7"
      },
      {
        id: 8,
        title: "Accordion8",
        contentText: "Text8"
      }
    ]
  }

  const activeCourses = {
    title: "Corsi attivi",
    courses: [
      {id: 1, name: "Corsi anno I"},{id: 2, name: "Corsi anno II"},{id: 3, name: "Corsi anno III"}
    ]
  }

  const recentLessons = {
    title: "Ultime lezioni viste",
    lessons: [
      {id: 1, name: "La struttura delle pagine web", time: 50},{id: 2, name: "La struttura delle pagine web", time:45},
      {id: 3, name: "La struttura delle pagine web", time: 50},{id: 4, name: "La struttura delle pagine web", time:45},
      {id: 5, name: "La struttura delle pagine web", time: 50},{id: 6, name: "La struttura delle pagine web", time:45},
      {id: 7, name: "La struttura delle pagine web", time: 50},{id: 8, name: "La struttura delle pagine web", time:45},
      {id: 9, name: "La struttura delle pagine web", time: 50},{id: 10, name: "La struttura delle pagine web", time:45}
    ]
  }

  return (
    <>
      <DCT_Layout id='Layout' data={data}>
        <Container disableGutters maxWidth='false' sx={{minHeight: '30vh'}}>
          <Grid container style={{alignItems: 'center'}}>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <FS_ProfileStudent/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4} className={fsStyle.progressContentGrid}>
              <FS_Progress title='Avanzamento corso' percentage='100'/>
            </Grid>
          </Grid>
        </Container>

        <Container disableGutters maxWidth='false' sx={{paddingTop: '2%', minHeight: '70vh'}}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <FS_LastLessons secondary={false} height={'30vh'} elementNumber={activeCourses.courses.length} background='#B2499B' title={activeCourses.title} array={activeCourses.courses}/>
              <FS_LastLessons secondary={true} height={'70vh'} heightCard={'65vh'} background='#798CB4' title={recentLessons.title} array={recentLessons.lessons}/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <FS_Accordion_Home title={accordionElements.title} array={accordionElements.subjects}/>
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
