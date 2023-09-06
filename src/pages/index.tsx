/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChat } from "ai/react";
import Head from "next/head";
import { MainLayout } from "~/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

import { Html5QrcodePlugin } from "~/components/Html5QrcodeScannerPlugin";
import { Separator } from "~/components/ui/separator";
import { Html5QrcodeResult } from "html5-qrcode";
import { Html5QrcodeError } from "html5-qrcode/esm/core";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Skeleton } from "~/components/ui/skeleton";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "~/components/ui/tabs";
import { type NextLayoutPage } from "~/lib/utils";
import { api } from "~/utils/api";

type FamilyMemberScore = {
  score: string;
  name: string;
};

function ResultTabs() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const productQuery = api.product.readOne.useQuery({
    barcode: "0731199055785",
  });
  const familyQuery = api.familyMember.readAll.useQuery();
  console.log("prod", productQuery.data);
  console.log("family", familyQuery.data);
  return (
    <Tabs defaultValue="family" className="flex h-full flex-col">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="family">Familia</TabsTrigger>
        <TabsTrigger value="product">Producto</TabsTrigger>
      </TabsList>
      <TabsContent value="family" className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Familia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col gap-2">
              {familyQuery.isLoading && (
                <>
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </>
              )}
              {familyQuery.data?.map((member) => (
                <FamilyMemberScoreCard
                  key={member.id}
                  name={member.name}
                  score={"AA"}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="product" className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Información del producto</CardTitle>
            <CardDescription>
              * Información nutricional positiva (1)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function FamilyMemberScoreCard(memberScore: FamilyMemberScore) {
  return (
    <Card>
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
      <Card className="m-3 h-1/2">
        <Html5QrcodePlugin
          config={{
            aspectRatio: 1,
            disableFlip: false,
            fps: 10,
            qrbox: 250
          }}
          qrCodeErrorCallback={(_errorMessage: string, _error: Html5QrcodeError) => undefined}
          qrCodeSuccessCallback={(decodedText: string, _result: Html5QrcodeResult) => {
            alert(decodedText)
          }}
        />
      </Card>
      <div className="flex-1 px-3 pb-3 h-1/2">
        <ResultTabs />
      </div>
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
