import React from "react";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import Loader from "../../components/layout/loader";
import Wip from "../../components/layout/wip";
import DCT_Layout from "../../components/layout/DCT_Layout";
import FRM_Tutor_Studenti from "../../components/form/tutorop/FRM_Tutor_Studenti";
import FRM_Tutor_Dettaglio from "../../components/form/tutorop/FRM_Tutor_Dettaglio";
import FRM_Tutor_Lezioni from "../../components/form/tutorop/FRM_Tutor_Lezioni";
import FRM_Tutor_Appuntamenti from "../../components/form/tutorop/FRM_Tutor_Appuntamenti";
import FRM_Moni_Ricerca from "../../components/form/moni/FRM_Moni_Ricerca";
import FRM_Moni_Lezzap from "../../components/form/moni/FRM_Moni_Lezzap";
import FRM_Moni_Notify from "../../components/form/moni/FRM_Moni_Notify";
import { validateForm } from "../../components/form/moni/validator";
import useUser from "../../lib/useUser";
import { PAGE_401 } from "../../lib/redirect";

import {
  getFallback,
  sessionOptions,
  validationMessage,
  MSG_SUCCESS,
  MSG_ERROR,
  MSG_INFO,
  forceNavigateUtil,
} from "../../lib";

import { withIronSessionSsr } from "iron-session/next";

const utils = require("../../lib/utils");
const moni_cfg = require("../../components/form/moni/config");

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  let fallback = await getFallback(req, res, query);
  if (fallback.authenticated) {
    fallback.apiUrl = moni_cfg.getApiUrl(query);
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
  if (!data) return <Loader id="tuop" />;
  if (data.status != 200) return <Wip>{data.message}</Wip>;

  const reloadData = async () => {
    const options = {
      revalidate: true,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    };
    await mutate(apiUrl, utils.getData(apiUrl), options);
  };

  const handleSubmit = async (event, formData) => {
    event.preventDefault();

    const vres = await validateForm(formData);

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

    return vres.valid;
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
    forceNavigateUtil(route, filter, fallback.subIndex);
  };

  const onActionRow = async (id, data) => {
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
        {pageName === moni_cfg.MONI_STEP_4 ? (
          <FRM_Moni_Ricerca
            id={moni_cfg.FRM_MONI_STEP_4}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={moni_cfg.MONI_STEP_4_ACTION}
            query={pageQuery}
          />
        ) : (
          <></>
        )}
        {pageName === moni_cfg.MONI_STEP_0 ? (
          <FRM_Tutor_Studenti
            id={moni_cfg.FRM_MONI_STEP_0}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={moni_cfg.MONI_STEP_0_ACTION}
            query={pageQuery}
            monitor={true}
          />
        ) : (
          <></>
        )}
        {pageName === moni_cfg.MONI_STEP_1 ? (
          <FRM_Tutor_Lezioni
            id={moni_cfg.FRM_MONI_STEP_1}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={moni_cfg.MONI_STEP_1_ACTION}
            query={pageQuery}
            monitor={true}
          />
        ) : (
          <></>
        )}
        {pageName === moni_cfg.MONI_STEP_2 ? (
          <FRM_Tutor_Appuntamenti
            id={moni_cfg.FRM_MONI_STEP_2}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={moni_cfg.MONI_STEP_2_ACTION}
            query={pageQuery}
            monitor={true}
          />
        ) : (
          <></>
        )}
        {pageName === moni_cfg.MONI_STEP_3 ? (
          <FRM_Tutor_Dettaglio
            id={moni_cfg.FRM_MONI_STEP_3}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={moni_cfg.MONI_STEP_3_ACTION}
            query={pageQuery}
            monitor={true}
          />
        ) : (
          <></>
        )}
        {pageName === moni_cfg.MONI_STEP_5 ? (
          <FRM_Moni_Lezzap
            id={moni_cfg.FRM_MONI_STEP_5}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={moni_cfg.MONI_STEP_5_ACTION}
            query={pageQuery}
          />
        ) : (
          <></>
        )}
        {pageName === moni_cfg.MONI_STEP_6 ? (
          <FRM_Moni_Notify
            id={moni_cfg.FRM_MONI_STEP_6}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={moni_cfg.MONI_STEP_6_ACTION}
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
