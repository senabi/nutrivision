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
import { type RouterOutputs, api } from "~/utils/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FamilyMemberScore = {
  score: string;
  name: string;
};

function SendMessagesResponse(props: {
  product: RouterOutputs["product"]["readOne"];
}) {
  const scoreQuery = api.openai.getFamilyScore.useQuery(
    {
      product: props.product,
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
  if (scoreQuery.isLoading) {
    return <Skeleton className="h-12 w-full" />;
  }
  return <div className="whitespace-pre">{scoreQuery.data}</div>;
}

function ResultTabs(props: { barcode: string }) {
  const productQuery = api.product.readOne.useQuery({
    barcode: props.barcode,
  });
  useEffect(() => {
    if (productQuery.status === "loading") {
      return;
    }
    if (productQuery.status === "error") {
      toast.error(JSON.stringify(productQuery.error));
    } else if (productQuery.status === "success") {
      toast.success("Producto encontrado");
    }
  }, [productQuery.status, props.barcode]);
  console.log("result tabs ->", productQuery.data);
  return (
    <Tabs defaultValue="family" className="flex h-full flex-col">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="family">Familia</TabsTrigger>
        <TabsTrigger value="product">Producto</TabsTrigger>
        <TabsTrigger value="nutricionista">Nutricionista</TabsTrigger>
      </TabsList>
      <TabsContent value="family" className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Familia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col gap-2">
              {productQuery.data && (
                <Card>
                  <CardContent>
                    <SendMessagesResponse product={productQuery.data} />
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="product" className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Nutricionistas</CardTitle>
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

      <TabsContent value="nutricionista" className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Recomendaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="new">
                {productQuery.data?.nutritionist ??
                  "No hay recomendaciones de un nutricionista."}
              </Label>
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
  const [barcode, setBarcode] = useState<string | undefined>(undefined);
  console.log("barcode ->", barcode);
  return (
    <div className="flex h-screen flex-col">
      <Card className="m-3 flex h-1/2 rounded-lg p-4">
        <Html5QrcodePlugin
          config={{
            aspectRatio: 1,
            disableFlip: false,
            fps: 10,
            qrbox: 250,
          }}
          qrCodeErrorCallback={(
            _errorMessage: string,
            _error: Html5QrcodeError,
          ) => undefined}
          qrCodeSuccessCallback={(
            decodedText: string,
            _result: Html5QrcodeResult,
          ) => {
            console.log("pipipi");
            setBarcode(decodedText);
          }}
        />
      </Card>
      <div className="h-1/2 flex-1 px-3 pb-3">
        {typeof barcode !== "undefined" && <ResultTabs barcode={barcode} />}
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
