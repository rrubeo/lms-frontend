import "../styles/globals.css";
import * as React from "react";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import Router from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Loader from "../components/layout/loader";
import { Toaster } from "react-hot-toast";
import useUser from "../lib/useUser";
import ErrorBoundary from "../components/ErrorBoundary";
import { PAGE_LOGIN } from "../lib/redirect";
import { LicenseInfo } from '@mui/x-license-pro';

LicenseInfo.setLicenseKey(process.env.MUI_LICENCE);

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [loading, setLoading] = React.useState(false);

  const { user } = useUser({
    redirectTo: PAGE_LOGIN,
  });

  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? (
          <Loader id="app" />
        ) : (
          <>
            <ErrorBoundary>
              <Component {...pageProps} />{" "}
            </ErrorBoundary>
            <Toaster
              position="bottom-right"
              duration={100}
              containerStyle={{
                top: 120,
                left: 20,
                bottom: 40,
                right: 20,
              }}
            />
          </>
        )}
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
