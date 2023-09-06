import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Drawer } from "vaul";
import { NewMemberDialog } from "~/components/newMemberDialog";
import { api } from "~/utils/api";
import { NextLayoutPage } from "~/lib/utils";
import { MainLayout } from "~/components/layout";

type FamilyMember = {
  name: string;
  goals: string;
  diseases: string;
};

const Family: NextLayoutPage = () => {
  const { data } = api.familyMember.readAll.useQuery();

  return (
    <>
      <div className="m-5">
        {data?.map((e, i) => (
          <Card key={i} className="m-2">
            <CardHeader>
              <CardTitle>{e.name}</CardTitle>
              <CardDescription>{e.goals}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{e.diseases}</p>
            </CardContent>
            <CardFooter>
              <p>10-10-10s</p>
            </CardFooter>
          </Card>
        ))}
        <div className="sticky bottom-5 flex w-full justify-end">
          <NewMemberDialog />
        </div>
      </div>
    </>
  );
};

Family.getLayout = (page) => {
   return <MainLayout>{page}</MainLayout>;
};

export default Family;
