import React from "react";
import { useRouter } from "next/router";

const utils = require("../../lib/utils");

export async function getServerSideProps(context) {
  console.dir(context);
  let ssdata = {};
  let data = {};
  console.dir(context.query.param);
  if (context.query.param != undefined) {
    const p = context.query.param[0];
    data = await utils.fetcher(`${process.env.server}/api/pbase/${p}`);
    ssdata = {
      props: {
        [context.query.param[0]]: data,
      },
    };
  } else {
    data = await utils.fetcher(`${process.env.server}/api/pbase`);
    ssdata = {
      props: {
        ricerca: data,
      },
    };
  }

  return ssdata;
}

export default function Main(props) {
  // console.log(props);
  const router = useRouter();
  // console.log(router.query);
  return (
    <div>
      <pre>{JSON.stringify(props, null, 4)}</pre>
    </div>
  );
}
