import Head from "next/head";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Nutrivision</title>
        <meta name="description" content="By me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[100dvh]">content</main>
    </>
  );
}
