import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

type FamilyMember = {
  name: string;
  goals: string;
  diseases: string;
}

const members: FamilyMember[] = [
  { name: 'gabriel', goals: 'ganar peso', diseases: 'gastritis' },
  { name: 'gabriel', goals: 'ganar peso', diseases: 'gastritis' },
  { name: 'gabriel', goals: 'ganar peso', diseases: 'gastritis' },
  { name: 'gabriel', goals: 'ganar peso', diseases: 'gastritis' },
  { name: 'gabriel', goals: 'ganar peso', diseases: 'gastritis' },
]

const Family = () => {


  return <div className="m-5 flex flex-col">
    <div className="overflow-y-scroll max-h-fit">
      {members.map((e) =>
        <Card>
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

    </div>
    <Button className="ml-auto">+</Button>
  </div>
}

export default Family;