import React from "react";
import DCT_Layout from "../../components/layout/DCT_Layout";
import Loader from "../../components/layout/loader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import safeJsonStringify from "safe-json-stringify";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import DTC_Calendar from "../../components/calendar/calendar";
import { withIronSessionSsr } from "iron-session/next";
import { defaultLogin, sessionOptions, getAuthSession } from "../../lib/";
import useUser from "../../lib/useUser";

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

function HomeMain() {
  const { user } = useUser({
    redirectTo: "/401",
  });

  const { fallback } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="home" />;
  if (data.status != 200) return <div>{data.message}</div>;

  return (
    <>
      <DCT_Layout id="Layout" data={data}>
        <Container component="span" maxWidth="lg" disableGutters={true}>
          <Box sx={{ flexGrow: 1, bgcolor: "#ffffff" }}>
            <DTC_Calendar />
          </Box>
        </Container>
      </DCT_Layout>
    </>
  );
}

export default function Home({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <HomeMain />
    </SWRConfig>
  );
}
