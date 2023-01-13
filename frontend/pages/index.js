import React from "react";
import { useRouter } from "next/router";
import { useSWRConfig, SWRConfig } from "swr";
import Image from "next/image";
import Button from "@mui/material/Button";
import MW_LayoutCenter from "../components/layout/MW_LayoutCenter";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions, getAuthSession } from "../lib";

import jnStyles from "../styles/utils.module.css";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  //   let fallback = await getFallback(req, res, query);
  const authSession = await getAuthSession(req);

  if (authSession) {
    req.session.destroy();
  }

  return {
    props: {
      fallback: {},
    },
  };
},
sessionOptions);

function HomeMain() {
  //   const { user, mutateUser } = useUser({
  //     redirectTo: PAGE_HOME,
  //     redirectIfFound: true,
  //   });
  let user;

  const { fallback } = useSWRConfig();
  // console.log(fallback);

  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    router.push("login");
  };
  return (
    <MW_LayoutCenter user={user}>
      <Image alt="home" src="/images/login_bkg.png" layout="fill" priority />
      <Image
        layout="fixed"
        src="/images/janus_logo_login.png"
        height={58}
        width={300}
        priority
      />
      <Button
        id="login"
        type="button"
        variant="contained"
        sx={{ borderRadius: 26 }}
        className={jnStyles.shadow}
        onClick={(event) => handleLogin(event)}
      >
        Login
      </Button>
    </MW_LayoutCenter>
  );
}

export default function Home({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <HomeMain />
    </SWRConfig>
  );
}
