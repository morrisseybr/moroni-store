import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Fieldset } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default async function Sell() {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isLoading } = trpc.sells.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Venda cadastrada",
        description: "A venda foi cadastrada com sucesso.",
      });
      router.push("/sells");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Parameters<typeof mutate>[0] = {
      customer: {
        name: formData.get("customerName") as string,
        phone: formData.get("customerPhone") as string,
        email: formData.get("customerEmail") as string,
      },
    };
    mutate(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="py-2 mb-2 flex justify-between items-center">
        <div className="flex gap-2 items-center justify-start">
          <BackButton />
          <h3>Nova venda</h3>
        </div>
      </header>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2>Dados do cliente</h2>
        <Fieldset>
          <Label htmlFor="customerName">Nome</Label>
          <Input type="text" name="customerName" required />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="customerPhone">Telefone</Label>
          <Input type="text" name="customerPhone" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="customerEmail">E-mail</Label>
          <Input type="text" name="customerEmail" />
        </Fieldset>
        <hr />
        <Button type="submit" disabled={isLoading} loading={isLoading}>
          Salvar
        </Button>
      </form>
    </div>
  );
}
