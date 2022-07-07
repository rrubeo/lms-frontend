import React from "react";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import Loader from "../../components/layout/loader";
import DCT_Layout from "../../components/layout/DCT_Layout";
import FRM_Ese_Ricerca from "../../components/form/ese/FRM_Ese_Ricerca";
import FRM_Ese_Dettaglio from "../../components/form/ese/FRM_Ese_Dettaglio";
import FRM_Ese_Esercitazione from "../../components/form/ese/FRM_Ese_Esercitazione";
import FRM_Ese_Visualizza from "../../components/form/ese/FRM_Ese_Visualizza";
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
    // validationMessage(vres.data.message, MSG_ERROR);
    // return;
    // if (vres.valid) {
    //   const res = await utils.postData(apiUrl, formData);
    //   // console.log("RISPOSTA");
    //   // console.log(res);
    //   if (res.status != 200) {
    //     validationMessage(res.message, MSG_ERROR);
    //   } else {
    //     if (formData.id == ese_cfg.FRM_PBASE_STEP_5) {
    //       if (!formData.video) {
    //         const CLOUD_BASE_URL = process.env.API_SERVER;
    //         const CLOUD_API_CLAS_CONTE_UPLOAD =
    //           "api/ColeContenutoLezioneDats/UploadFile";
    //         const ColeContenutoLezioneDatsUpload = `${CLOUD_BASE_URL}/${CLOUD_API_CLAS_CONTE_UPLOAD}`;
    //         const endpoint = `${ColeContenutoLezioneDatsUpload}/${res.id}`;

    //         const res2 = await utils.postFile(endpoint, formData, userInfo);
    //         validationMessage(res2.message, MSG_INFO);
    //       }
    //     }
    //     await reloadData();
    //     validationMessage(res.message, MSG_SUCCESS);
    //   }
    // } else {
    //   // console.log(vres);
    //   validationMessage(vres.data.message, MSG_ERROR);
    // }
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

    
    // if (fallback.pageName == ese_cfg.PBASE_STEP_0) {
    //   if (isAggregato(filter.row.col9)) {
    //     forceNavigateUtil(ese_cfg.PBASE_STEP_1_1, filter, fallback.subIndex);
    //   } else {
    //     forceNavigateUtil(route, filter, fallback.subIndex);
    //   }
    // } else if (fallback.pageName == ese_cfg.PBASE_STEP_1) {
    //   if (isAggregato(filter.row.col3)) {
    //     forceNavigateUtil(ese_cfg.PBASE_STEP_1_1, filter, fallback.subIndex);
    //   } else {
    //     forceNavigateUtil(route, filter, fallback.subIndex);
    //   }
    // } else {
    //   forceNavigateUtil(route, filter, fallback.subIndex);
    // }
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
        {pageName === ese_cfg.ESE_STEP_1 ? (
          <FRM_Ese_Dettaglio
            id={ese_cfg.FRM_ESE_STEP_1}
            activeStep={0}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={ese_cfg.ESE_STEP_1_ACTION}
            query={pageQuery}
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
