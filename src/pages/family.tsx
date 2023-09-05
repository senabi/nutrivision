import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Drawer } from 'vaul';
import { NewMemberDialog } from "~/components/newMemberDialog";
import { api } from "~/utils/api";

type FamilyMember = {
  name: string;
  goals: string;
  diseases: string;
}

const Family = () => {
  const { data } = api.familyMember.readAll.useQuery()

  return <>
    <div className="m-5">
      {data?.map((e, i) =>
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
        </Card>)}
      <div className="w-full sticky bottom-5 flex justify-end">
        <NewMemberDialog />
      </div>
    </div >

  </>
}

export default Family;