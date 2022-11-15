import React from "react";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import Loader from "../../components/layout/loader";
import Wip from "../../components/layout/wip";
import DCT_Layout from "../../components/layout/DCT_Layout";
import FRM_GestStud_Ricerca from "../../components/form/gstu/FRM_GestStud_Ricerca";
import FRM_GestStud_Dettaglio from "../../components/form/gstu/FRM_GestStud_Dettaglio";
import FRM_GestStud_Iscrizione from "../../components/form/gstu/FRM_GestStud_Iscrizione";
import { validateForm } from "../../components/form/gstu/validator";
import useUser from "../../lib/useUser";
import { PAGE_401 } from "../../lib/redirect";

import {
  sessionOptions,
  getFallback,
  validationMessage,
  MSG_SUCCESS,
  MSG_ERROR,
  MSG_INFO,
  forceNavigateUtil,
  forceSearchUtil,
} from "../../lib";

import { withIronSessionSsr } from "iron-session/next";

const utils = require("../../lib/utils");
const gs_cfg = require("../../components/form/gstu/config");

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  let fallback = await getFallback(req, res, query);
  if (fallback.authenticated) {
    fallback.apiUrl = gs_cfg.getApiUrl(query);
  }
  return {
    props: {
      fallback: fallback,
    },
  };
},
sessionOptions);

function Main() {
  const { user } = useUser({
    redirectTo: PAGE_401,
  });
  //Recupera info utente
  const { fallback, mutate } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery, subIndex } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="gs" />;
  if (data.status != 200) return <Wip>{data.message}</Wip>;

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

    const vres = await validateForm(formData);

    if (vres.valid) {
      const res = await utils.postData(apiUrl, formData);
      if (res.status != 200) {
        validationMessage(res.message, MSG_ERROR);
      } else {
        await reloadData();
        validationMessage(res.message, MSG_SUCCESS);
        if (formData.idPersona) {
          if (formData.idPersona == -1) {
            forceSearchUtil(gs_cfg.GSTU_STEP_0);
          }
        }
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
    // console.log(route);
    forceNavigateUtil(route, filter, fallback.subIndex);
  };

  const onActionRow = async (id, data) => {
    // console.log(id);
    // console.log(data);

    const res = await utils.postData(apiUrl, data);
    if (res.status != 200) {
      validationMessage(res.message, MSG_ERROR);
    } else {
      await reloadData();
      validationMessage(res.message, MSG_SUCCESS);
    }
  };

  return (
    <DCT_Layout id="Layout" data={data} user={user}>
      <section>
        <h1>{data.title}</h1>
        {pageName === gs_cfg.GSTU_STEP_0 ? (
          <FRM_GestStud_Ricerca
            id={gs_cfg.FRM_GSTU_STEP_0}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={gs_cfg.GSTU_STEP_0_ACTION}
            query={pageQuery}
          />
        ) : (
          <></>
        )}
        {pageName === gs_cfg.GSTU_STEP_1 ? (
          <FRM_GestStud_Dettaglio
            id={gs_cfg.FRM_GSTU_STEP_1}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={gs_cfg.GSTU_STEP_1_ACTION}
            query={pageQuery}
            onFireAction={onActionRow}
          />
        ) : (
          <></>
        )}
        {pageName === gs_cfg.GSTU_STEP_2 ? (
          <FRM_GestStud_Iscrizione
            id={gs_cfg.FRM_GSTU_STEP_2}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            query={pageQuery}
            onFireAction={onActionRow}
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
