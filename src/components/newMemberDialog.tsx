import { Drawer } from "vaul";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "~/components/ui/textarea"

export function NewMemberDialog() {
    return (
        <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
                <Button>+</Button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0" />
                <Drawer.Content className="flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                    <div className="p-4 bg-background rounded-t-[10px] flex-1">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                        <div className="max-w-md mx-auto">
                            <Drawer.Title className="font-medium mb-4">
                                Agregar nuevo integrante de familia
                            </Drawer.Title>
                            <Input type="text" placeholder="Nombre" className="my-2" />
                            <Textarea />
                            <Textarea />

                            <Button variant={"secondary"}>Confirmar</Button>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
