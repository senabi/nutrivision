import { Apple, Menu, Users2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { cn } from "~/lib/utils";

function SideMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-5">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side={"left"} onClick={() => setOpen(false)}>
          <h1 className="font-semibold">Nutrivision</h1>
          <div className="pt-6">
            <Link
              href={"/family"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-full justify-start",
              )}
            >
              <Users2 className="mr-2 h-5 w-5" />
              Grupo familiar
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-1 flex-col">
      <div className="flex justify-between border-b">
        <Link href={"/"} className="p-5">
          <Apple className="h-6 w-6 text-green-800 dark:text-green-500" />
        </Link>
        <SideMenu />
      </div>
      <main className="flex flex-1 flex-col">{props.children}</main>
    </div>
  );
}
