import React from "react";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import Loader from "../../components/layout/loader";
import DCT_Layout from "../../components/layout/DCT_Layout";
import FRM_Ese_Ricerca from "../../components/form/ese/FRM_Ese_Ricerca";
import FRM_Ese_Visualizza from "../../components/form/ese/FRM_Ese_Visualizza";
import FRM_Ese_Esercitazione from "../../components/form/ese/FRM_Ese_Esercitazione";
import FRM_Ese_Domande from "../../components/form/ese/FRM_Ese_Domande";
import FRM_Ese_Risposte from "../../components/form/ese/FRM_Ese_Risposte";
import { validateForm } from "../../components/form/ese/validator";

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
} from "../../lib";

import { withIronSessionSsr } from "iron-session/next";

const utils = require("../../lib/utils");
const ese_cfg = require("../../components/form/ese/config");

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

  fallback.pageName = utils.getPageName(query);
  fallback.apiUrl = ese_cfg.getApiUrl(query);
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
  const { userInfo, pageName, apiUrl, pageQuery, subIndex } = fallback;
  // console.log("pageQuery", pageQuery);
  // console.log("subIndex", subIndex);
  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="pb" />;
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
    // data.lezione = formData.lezione;
  };

  const handleSubmit = async (event, formData) => {
    event.preventDefault();

    const vres = await validateForm(formData);

    console.log(formData);
    if (vres.valid) {
      const res = await utils.postData(apiUrl, formData);
      if (res.status != 200) {
        validationMessage(res.message, MSG_ERROR);
      } else {
        await reloadData();
        validationMessage(res.message, MSG_SUCCESS);
      }
    } else {
      validationMessage(vres.data.message, MSG_ERROR);
    }
  };

  const handleDelete = async (rowData) => {
    const res = await utils.deleteData(apiUrl, rowData);
    if (res.status != 200) {
      validationMessage(res.message, MSG_ERROR);
    } else {
      await reloadData();
      validationMessage(res.message, MSG_INFO);
    }
  };

  const handleNextStep = async (event, filter, route) => {
    event.preventDefault();
    console.log(route);
    forceNavigateUtil(route, filter, fallback.subIndex);
  };

  return (
    <DCT_Layout id="Layout" data={data}>
      <section>
        <h1>{data.title}</h1>
        {pageName === ese_cfg.ESE_STEP_0 ? (
          <FRM_Ese_Ricerca
            id={ese_cfg.FRM_ESE_STEP_0}
            activeStep={0}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={ese_cfg.ESE_STEP_0_ACTION}
          />
        ) : (
          <></>
        )}
        {pageName === ese_cfg.ESE_STEP_2 ? (
          <FRM_Ese_Esercitazione
            id={ese_cfg.FRM_ESE_STEP_2}
            activeStep={1}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={ese_cfg.ESE_STEP_2_ACTION}
            query={pageQuery}
          />
        ) : (
          <></>
        )}
        {pageName === ese_cfg.ESE_STEP_3 ? (
          <FRM_Ese_Visualizza
            id={ese_cfg.FRM_ESE_STEP_3}
            activeStep={0}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={ese_cfg.ESE_STEP_3_ACTION}
            query={pageQuery}
          />
        ) : (
          <></>
        )}
        {pageName === ese_cfg.ESE_STEP_4 ? (
          <FRM_Ese_Domande
            id={ese_cfg.FRM_ESE_STEP_4}
            activeStep={2}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={ese_cfg.ESE_STEP_4_ACTION}
            query={pageQuery}
          />
        ) : (
          <></>
        )}
        {pageName === ese_cfg.ESE_STEP_5 ? (
          <FRM_Ese_Risposte
            id={ese_cfg.FRM_ESE_STEP_5}
            activeStep={0}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={ese_cfg.ESE_STEP_5_ACTION}
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
