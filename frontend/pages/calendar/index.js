import React from "react";
import DCT_Layout from "../../components/layout/DCT_Layout";
import Loader from "../../components/layout/loader";
import Wip from "../../components/layout/wip";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import safeJsonStringify from "safe-json-stringify";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import DTC_Calendar from "../../components/calendar/calendar";
import { withIronSessionSsr } from "iron-session/next";
import useUser from "../../lib/useUser";
import { PAGE_401 } from "../../lib/redirect";

import {
  defaultLogin,
  sessionOptions,
  getAuthSession,
  validationMessage,
  MSG_SUCCESS,
  MSG_ERROR,
  MSG_INFO,
  forceNavigateUtil,
  forceReloadUtil,
} from "../../lib";

const utils = require("../../lib/utils");
const API = `${process.env.server}/calendar`;

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

  fallback.pageName = "calendar";
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
    redirectTo: PAGE_401,
  });

  const { fallback, mutate } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="home" />;
  if (data.status != 200) return <Wip>{data.message}</Wip>;
  // console.log(data);
  const reloadData = async () => {
    // console.log("reloadData");
    const options = {
      revalidate: true,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    };
    await mutate(apiUrl, utils.getData(apiUrl), options);
  };
  const handleSubmit = async (event, formData) => {
    // console.log("handleSubmit");
    // console.log(formData);
    event.preventDefault();

    const res = await utils.postData(apiUrl, formData);
    if (res.status != 200) {
      validationMessage(res.message, MSG_ERROR);
    } else {
      await reloadData();
      validationMessage(res.message, MSG_SUCCESS);
      forceReloadUtil();
    }
  };
  return (
    <>
      <DCT_Layout id="Layout" data={data} user={user}>
        <Container component="span" maxWidth="lg" disableGutters={true}>
          <Box sx={{ flexGrow: 1, bgcolor: "#ffffff" }}>
            <DTC_Calendar
              id="FRM_Calendario"
              data={data}
              onSubmit={handleSubmit}
            />
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
