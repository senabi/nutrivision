/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "next/head";
import { MainLayout } from "~/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

import { Html5QrcodePlugin } from "~/components/Html5QrcodeScannerPlugin";
import {
  Card,
  CardContent
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { NextLayoutPage } from "~/lib/utils";
import { Html5QrcodeResult } from "html5-qrcode";
import { Html5QrcodeError } from "html5-qrcode/esm/core";

type FamilyMemberScore = {
  score: string;
  name: string;
};

const mockup: FamilyMemberScore[] = [
  { score: "😃", name: "gabriel" },
  { score: "😄", name: "charo" },
  { score: "🥲", name: "charo" },
];

function FamilyMemberScoreCard(memberScore: FamilyMemberScore) {
  return (
    <Card className="my-3">
      <CardContent className="py- flex flex-row justify-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="mx-4">{memberScore.name}</p>
        <p className="mx-4">{memberScore.score}</p>
      </CardContent>
    </Card>
  );
}

function HomeContent() {
  return (
    <div className="flex h-screen flex-col">
      <Card className="m-3 h-1/3">  <Html5QrcodePlugin
        config={{
          aspectRatio: 1,
          disableFlip: false,
          fps: 10,
          qrbox: 250
        }}
        qrCodeErrorCallback={(errorMessage: string, _error: Html5QrcodeError) => {
          alert(errorMessage)
        }}
        qrCodeSuccessCallback={(decodedText: string, _result: Html5QrcodeResult) => {
          alert(decodedText)
        }}
      />
      </Card>
      <Card className="m-3 h-1/2">
        <Button>familia</Button> <Button>producto</Button>
        <Separator className="mb-10 mt-2" />
        {mockup.map((e) => (
          <FamilyMemberScoreCard key={e.name} name={e.name} score={e.score} />
        ))}
      </Card>
    </div>
  );
}

const Home: NextLayoutPage = () => {
  return (
    <>
      <Head>
        <title>NutriScan</title>
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
