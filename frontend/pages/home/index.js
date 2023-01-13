import React from "react";
import DCT_Layout from "../../components/layout/DCT_Layout";
import Loader from "../../components/layout/loader";
import Wip from "../../components/layout/wip";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import Image from "next/image";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions, getFallback } from "../../lib/";
import useUser from "../../lib/useUser";
import { PAGE_401 } from "../../lib/redirect";

const utils = require("../../lib/utils");
const API = `${process.env.server}/menu`;

export const pageTitle = "Home";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  let fallback = await getFallback(req, res, query);
  if (fallback.authenticated) {
    fallback.apiUrl = API;
  }
  return {
    props: {
      fallback: fallback,
    },
  };
},
sessionOptions);

function HomeMain() {
  const { user } = useUser({
    // redirectTo: PAGE_401,
  });
  // console.log(user);
  const { fallback } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="home" />;
  if (data.status != 200) return <Wip>{data.message}</Wip>;

  return (
    <>
      <DCT_Layout id="Layout" data={data} user={user}>
        <Container component="span" maxWidth="lg" disableGutters={true}>
          <Box sx={{ flexGrow: 1, bgcolor: "#ffffff" }}>
            <Image
              alt="home"
              src="/images/search_bkg.png"
              layout="responsive"
              width={1200}
              height={650}
              priority
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
