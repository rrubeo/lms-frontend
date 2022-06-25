import React from "react";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import Loader from "../../components/layout/loader";
import DCT_Layout from "../../components/layout/DCT_Layout";
import FRM_ProgIndi_ProgBase from "../../components/form/pindi/FRM_ProgIndi_ProgBase";
import FRM_ProgIndi_Lezione from "../../components/form/pindi/FRM_ProgIndi_Lezione";

import { validateForm } from "../../components/form/pindi/validator";

import {
  defaultLogin,
  sessionOptions,
  getAuthSession,
  validationMessage,
  MSG_SUCCESS,
  MSG_ERROR,
  MSG_INFO,
  MSG_WARNING,
  forceReloadUtil,
  forceNavigateUtil,
  forceSearchUtil,
} from "../../lib";

import { withIronSessionSsr } from "iron-session/next";

const utils = require("../../lib/utils");
const pi_cfg = require("../../components/form/pindi/config");

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  // console.dir(query);
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

  fallback.pageName = pi_cfg.getPageName(query);
  fallback.apiUrl = pi_cfg.getApiUrl(query);
  fallback.authenticated = true;
  fallback.userInfo = authSession;
  fallback.subIndex = utils.getPageIds(query);
  fallback.pageQuery = query;

  return {
    props: {
      fallback: fallback,
    },
  };
},
sessionOptions);

function Main() {
  //Recupera info utente
  const { fallback, mutate } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="pi" />;
  if (data.status != 200) return <div>{data.message}</div>;

  const reloadData = async () => {
    console.log("data changed");
    const options = {
      revalidate: true,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    };
    await mutate(apiUrl, utils.getData(apiUrl), options);
  };

  const handleSearch = async (event, formData) => {
    data.lezione = formData.lezione;
  };

  const handleSubmit = async (event, formData) => {
    event.preventDefault();
    const res = await utils.postData(apiUrl, formData);
    if (res.status != 200) {
      validationMessage(res.message, MSG_ERROR);
    } else {
      validationMessage(res.message, MSG_SUCCESS);
      await reloadData();
    }
  };

  const handleDelete = async (rowData) => {
    const res = await utils.deleteData(apiUrl, rowData);
    if (res.status != 200) {
      validationMessage(res.message, MSG_ERROR);
    } else {
      validationMessage(res.message, MSG_INFO);
      await reloadData();
    }
  };

  const handleNextStep = async (event, filter, route) => {
    event.preventDefault();    
    forceNavigateUtil(route, filter, fallback.subIndex);
  };

  return (
    <DCT_Layout id="Layout" data={data}>
      <section>
        <h1>{data.title}</h1>
        {pageName === pi_cfg.PINDI_STEP_0 ? (
          <FRM_ProgIndi_ProgBase
            id={pi_cfg.FRM_PINDI_STEP_0}
            activeStep={0}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={pi_cfg.PINDI_STEP_0_ACTION}
            query={pageQuery}
          />
        ) : (
          <></>
        )}
        {pageName === pi_cfg.PINDI_STEP_1 ? (
          <FRM_ProgIndi_Lezione
            id={pi_cfg.FRM_PINDI_STEP_1}
            activeStep={1}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            onSearch={handleSearch}
            data={data}
            onNextStep={handleNextStep}
            action={pi_cfg.PINDI_STEP_1_ACTION}
            selection={pageQuery.param}
            query={pageQuery}
          />
        ) : (
          <></>
        )}
      </section>
    </DCT_Layout>
  );
}

export default function Home({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Main />
    </SWRConfig>
  );
}
