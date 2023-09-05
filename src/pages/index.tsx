import Head from "next/head";
import { MainLayout } from "~/components/layout";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { NextLayoutPage } from "~/lib/utils";

function HomeContent() {
  return (
    <div>
      <div>camera</div>
      <div>information</div>
    </div>
  );
}

const Home: NextLayoutPage = () => {
  return (
    <>
      <Head>
        <title>Nutrivision</title>
        <meta name="description" content="By me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContent />
    </>
  );
};

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
