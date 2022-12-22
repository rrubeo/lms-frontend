import React from "react";
import useSWR, { useSWRConfig, SWRConfig } from "swr";
import Loader from "../../components/layout/loader";
import Wip from "../../components/layout/wip";
import DCT_Layout from "../../components/layout/DCT_Layout";
import FRM_Studente_Home from "../../components/form/fsme/FRM_Studente_Home";
import FRM_Studente_Aula from "../../components/form/fsme/FRM_Studente_Aula";
import FRM_Studente_Richiesta from "../../components/form/fsme/FRM_Studente_Richiesta";
import FRM_Dettaglio_Lezione from "../../components/form/fsme/FRM_Dettaglio_Lezione";
import { validateForm } from "../../components/form/fsme/validator";
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
} from "../../lib";

import { withIronSessionSsr } from "iron-session/next";

const utils = require("../../lib/utils");
const fsme_cfg = require("../../components/form/fsme/config");

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

  fallback.pageName = utils.getPageName(query);
  fallback.apiUrl = fsme_cfg.getApiUrl(query);
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
  const { user } = useUser({
    redirectTo: PAGE_401,
  });
  //Recupera info utente
  const { fallback, mutate } = useSWRConfig();
  const { userInfo, pageName, apiUrl, pageQuery, subIndex } = fallback;

  let { data, error } = useSWR(apiUrl, utils.getData);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="fsme" />;
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
    // console.log(filter);
    // console.log(route);
    if (
      fallback.pageName == fsme_cfg.FSME_STEP_0 ||
      fallback.pageName == fsme_cfg.FSME_STEP_1
    ) {
      fallback.subIndex = [filter.lessonId];
      forceNavigateUtil(route, filter, fallback.subIndex);
    } else {
      fallback.subIndex = [filter.id, filter.startDate];
      forceNavigateUtil(route, filter.item, fallback.subIndex);
    }
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
        {pageName === fsme_cfg.FSME_STEP_0 ? (
          <FRM_Studente_Home
            id={fsme_cfg.FRM_FSME_STEP_0}
            userInfo={userInfo}
            data={data}
            query={pageQuery}
            onClick={handleNextStep}
          />
        ) : (
          <></>
        )}
        {pageName === fsme_cfg.FSME_STEP_1 ? (
          <FRM_Dettaglio_Lezione
            id={fsme_cfg.FRM_FSME_STEP_1}
            userInfo={userInfo}
            data={data}
            query={pageQuery}
            onClick={handleNextStep}
          />
        ) : (
          <></>
        )}
        {pageName === fsme_cfg.FSME_STEP_2 ? (
          <FRM_Studente_Aula
            id={fsme_cfg.FRM_FSME_STEP_2}
            data={data}
            query={pageQuery}
            onClick={handleNextStep}
          />
        ) : (
          <></>
        )}
        {pageName === fsme_cfg.FSME_STEP_4 ? (
          <FRM_Studente_Richiesta
            id={fsme_cfg.FRM_FSME_STEP_4}
            data={data}
            query={pageQuery}
            onClick={handleNextStep}
            onSubmit={handleSubmit}
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
