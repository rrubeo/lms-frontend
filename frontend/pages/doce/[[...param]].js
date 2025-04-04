import React from "react";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import Loader from "../../components/layout/loader";
import Wip from "../../components/layout/wip";
import DCT_Layout from "../../components/layout/DCT_Layout";
import FRM_Docenti_Ricerca from "../../components/form/doce/FRM_Docenti_Ricerca";
import FRM_Docenti_Materie from "../../components/form/doce/FRM_Docenti_Materie";
import FRM_Docenti_Orario from "../../components/form/doce/FRM_Docenti_Orario";
import FRM_Tutor_Studenti from "../../components/form/tutorop/FRM_Tutor_Studenti";
import FRM_Tutor_Dettaglio from "../../components/form/tutorop/FRM_Tutor_Dettaglio";
import FRM_Tutor_Lezioni from "../../components/form/tutorop/FRM_Tutor_Lezioni";
import FRM_Tutor_Appuntamenti from "../../components/form/tutorop/FRM_Tutor_Appuntamenti";

import { validateForm } from "../../components/form/doce/validator";
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
const do_cfg = require("../../components/form/doce/config");

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  let fallback = await getFallback(req, res, query);
  if (fallback.authenticated) {
    fallback.apiUrl = do_cfg.getApiUrl(query);
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
  if (!data) return <Loader id="do" />;
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
        {pageName === do_cfg.DOCE_STEP_0 ? (
          <FRM_Docenti_Ricerca
            id={do_cfg.FRM_DOCE_STEP_0}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={do_cfg.DOCE_STEP_0_ACTION}
            query={pageQuery}
          />
        ) : (
          <></>
        )}
        {pageName === do_cfg.DOCE_STEP_1 ? (
          <FRM_Docenti_Materie
            id={do_cfg.FRM_DOCE_STEP_1}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={do_cfg.DOCE_STEP_1_ACTION}
            query={pageQuery}
          />
        ) : (
          <></>
        )}
        {pageName === do_cfg.DOCE_STEP_2 ? (
          <FRM_Docenti_Orario
            id={do_cfg.FRM_DOCE_STEP_2}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            query={pageQuery}
          />
        ) : (
          <></>
        )}
        {pageName === do_cfg.DOCE_STEP_3 ? (
          <FRM_Tutor_Studenti
            id={do_cfg.FRM_DOCE_STEP_3}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={do_cfg.DOCE_STEP_3_ACTION}
            query={pageQuery}
          />
        ) : (
          <></>
        )}
        {pageName === do_cfg.DOCE_STEP_4 ? (
          <FRM_Tutor_Lezioni
            id={do_cfg.FRM_DOCE_STEP_4}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={do_cfg.DOCE_STEP_4_ACTION}
            query={pageQuery}
            docenti={true}
          />
        ) : (
          <></>
        )}
        {pageName === do_cfg.DOCE_STEP_5 ? (
          <FRM_Tutor_Appuntamenti
            id={do_cfg.FRM_DOCE_STEP_5}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={do_cfg.DOCE_STEP_5_ACTION}
            query={pageQuery}
            docenti={true}
          />
        ) : (
          <></>
        )}
        {pageName === do_cfg.DOCE_STEP_6 ? (
          <FRM_Tutor_Dettaglio
            id={do_cfg.FRM_DOCE_STEP_6}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            data={data}
            onNextStep={handleNextStep}
            action={do_cfg.DOCE_STEP_6_ACTION}
            query={pageQuery}
            docenti={true}
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
