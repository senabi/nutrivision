import { Menu, Users2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { useState } from "react";

function SideMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-5">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <h1 className="font-semibold">Nutrivision</h1>
          <Link
            href={"/family"}
            className={buttonVariants({
              variant: "ghost",
            })}
          >
            <Users2 className="mr-2 h-5 w-5" />
            Grupo familiar
          </Link>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-1 flex-col">
      <div className="flex justify-end">
        <SideMenu />
      </div>
      <main className="flex flex-1 flex-col">
        {props.children}
      </main>
    </div>
  );
}
