import React from "react";
import useSWR, { SWRConfig } from "swr";
import { useRouter } from "next/router";
import Loader from "../../components/layout/loader";
import DCT_Layout from "../../components/layout/DCT_Layout";
import FRM_GestStud_Ricerca from "../../components/form/gstu/FRM_GestStud_Ricerca";

import { validateForm } from "../../components/form/gstu/validator";

import {
  validationMessage,
  MSG_SUCCESS,
  MSG_ERROR,
  MSG_INFO,
  MSG_WARNING,
} from "../../lib";

const utils = require("../../lib/utils");
const gs_cfg = require("../../components/form/gstu/config");

export async function getServerSideProps(context) {
  // console.dir(context);
  const mask = utils.getPageName(context.query);
  const PAGE_API = gs_cfg.getAPI(mask);

  let ssdata = {
    props: {
      fallback: {
        title: gs_cfg.NO_DATA_DESC,
      },
    },
  };
  try {
    const data = await utils.fetcher(PAGE_API);
    ssdata = {
      props: {
        fallback: data,
      },
    };
    return ssdata;
  } catch (err) {
    return ssdata;
  }
}

function Main() {
  const router = useRouter();
  const mask = utils.getPageName(router.query);
  const PAGE_API = gs_cfg.getAPI(mask);

  console.log(`<Main ='${mask}'>`);

  const [cRow, setRows] = React.useState([]);
  const { data, error } = useSWR(PAGE_API, utils.fetcher);

  if (error) return <div>{error.message}</div>;
  if (!data) return <Loader id="pb" />;

  const handleSubmit = async (event, formData) => {};

  const handleNextStep = async (event, filter, route) => {};
  return (
    <DCT_Layout id="Layout" data={data}>
      <section>
        <h1>{data.title}</h1>
        {mask === gs_cfg.GSTU_STEP_0 ? (
          <FRM_GestStud_Ricerca
            id={gs_cfg.FRM_GSTU_STEP_0}
            activeStep={0}
            onSubmit={handleSubmit}
            data={data}
            onNextStep={handleNextStep}
            action={gs_cfg.GSTU_STEP_0_ACTION}
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
