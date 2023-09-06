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
  return (
    <div className="flex h-screen flex-col">
      <Card className="m-3 h-1/3">camera</Card>
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
  const mut = api.product.create.useMutation({
    onSuccess: () => {
      toast.success("Miembro de familia agregado");
    },
    onError: () => {
      toast.error("Error al agregar miembro de familia");
    },
  });
  return (
    <>
      <Head>
        <title>Nutrivision</title>
        <meta name="description" content="By me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContent />
      <button
        onClick={() => {
          mut.mutate({
            name: "Tiyapuy Potato Chips",
            barcode: "0731199055785",
            category: "Alimentos",
            carbohydrates: "18 g",
            fats: "7.8 g",
            saturated_fats: "0.8 g",
            trans_fats: "0",
            proteins: "0.7 g",
            calories: "145",
            vitamins: "N.D.",
            minerals: "N.D.",
            // Los campos opcionales se pueden incluir o excluir según sea necesario.
            dangerous_ingredients: "Lista de ingredientes peligrosos",
            allergens: "Lista de alérgenos",
            serving_sizes: "Tamaño de la porción",
            danger_medical: "Información médica sobre riesgos",
          });
        }}
      >
        press me to create a dummy dummy
      </button>
    </>
  );
};

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
