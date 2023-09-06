import Head from "next/head";
import { toast } from "sonner";
import { MainLayout } from "~/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Html5QrcodePlugin } from "~/components/Html5QrcodeScannerPlugin";
import { NextLayoutPage } from "~/lib/utils";
import { api } from "~/utils/api";

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
  const onNewScanResult = (decodedText, decodedResult) => {
    alert(decodedResult);
  };

  return (
    <div className="flex h-screen flex-col">
      <Card className="m-3 h-1/3">  <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
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
