import { Drawer } from "vaul";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useZodForm } from "~/lib/zod-form";
import { type FamilyMemberSchema, familyMemberSchema } from "~/lib/validators";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { api } from "~/utils/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function NewMemberDialog() {
  const mut = api.familyMember.create.useMutation({
    onSuccess: () => {
      toast.success("Miembro de familia agregado");
    },
    onError: () => {
      toast.error("Error al agregar miembro de familia");
    },
  });
  const form = useZodForm({
    schema: familyMemberSchema,
  });

  function onSubmit(data: FamilyMemberSchema) {
    mut.mutate(data);
  }

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button>+</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col rounded-t-[10px]">
          <div className="flex-1 rounded-t-[10px] bg-background p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
            <div className="mx-auto flex max-w-md flex-col">
              <Drawer.Title className="mb-4 font-medium">
                Agregar nuevo integrante de familia
              </Drawer.Title>
              {/* <Input type="text" placeholder="Nombre" className="my-2" /> */}
              {/* <Textarea placeholder="Objetivos" className="my-2" /> */}
              {/* <Textarea placeholder="Enfermedades" className="my-2" /> */}
              {/* <Button className="my-2 ml-auto">Confirmar</Button> */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="John Doe" />
                          </FormControl>
                          <FormDescription>
                            Nombre de tu familiar
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Objetivos</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Bajar de peso" />
                          </FormControl>
                          <FormDescription>
                            Objetivos nutricionales de tu familiar
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="diseases"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enfermedades</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Diabetes" />
                          </FormControl>
                          <FormDescription>
                            Enfermedades de tu familiar
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={mut.isLoading}>
                      {mut.isLoading && (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      )}
                      Confirmar
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
