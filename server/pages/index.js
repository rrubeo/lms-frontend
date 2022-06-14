import useSWR from "swr";
import Person from "../components/Person";
import Endpoint from "../components/Endpoint";
import Head from "next/head";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  // const { data, error } = useSWR("/api/people", fetcher);
  const { data, error } = useSWR(
    `${process.env.basepath}/api/endpoint`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>{process.env.component}</title>
      </Head>
      <ul>
        {data.map((p, i) => (
          <Endpoint key={i} data={p} />
          // <Person key={i} person={p} />
        ))}
      </ul>
    </>
  );
}
