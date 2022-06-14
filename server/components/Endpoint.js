import Link from "next/link";

export default function Endpoint({ data }) {
  // console.log(data);
  return (
    <li>
      <div>
        {data.name} (
        <Link href={`${data.href}`} as={`${data.href}`}>
          <a>API</a>
        </Link>
        -
        <Link api={`${data.href}`} href={`${data.page}`} as={`${data.page}`}>
          <a>JSON</a>
        </Link>
        )
      </div>
    </li>
  );
}
