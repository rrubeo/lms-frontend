import React from "react";
import Image from "next/image";
import DCT_Layout from "../../components/layout/DCT_Layout";
import Loader from "../../components/layout/loader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import safeJsonStringify from "safe-json-stringify";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import { useRouter } from "next/router";
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
}) {
  const authSession = await getAuthSession(req);

  if (!authSession) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: defaultLogin,
      },
    };
  }

  const data = await utils.fetcher(API);
  return {
    props: {
      fallback: {
        title: data.title,
        menu: data.menu,
        usermenu: data.usermenu,
        navmenu: data.navmenu,
        user: authSession,
      },
    },
  };
},
sessionOptions);

function HomeMain() {
  console.log("<Home>");
  const { user } = useUser({
    redirectTo: "/login",
  });
  
  // console.log(user);
  const { fallback } = useSWRConfig();
  const userInfo = fallback.user;

  const { data, error } = useSWR(
    userInfo ? [API, userInfo] : null,
    utils.fetchWithUser
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="home" />;
  // console.log(data);
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
  // console.log({ fallback });
  return (
    <SWRConfig value={{ fallback }}>
      <HomeMain />
    </SWRConfig>
  );
}
