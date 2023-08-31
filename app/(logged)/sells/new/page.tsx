"use client";

import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Fieldset } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { TRPCInputs, trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import SellBagTable, { SellBag } from "./sell-bag-table";

export default function Sell() {
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

  const [sellBag, setSellBag] = useState<SellBag>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: TRPCInputs["sells"]["create"] = {
      date: new Date(),
      customer: {
        name: formData.get("customerName") as string,
        phone: formData.get("customerPhone") as string,
        email: formData.get("customerEmail") as string,
      },
      bag: [],
      discount: 0,
      tax: 0,
      total: 0,
      payment: {
        method: "cash",
        change: 0,
      },
    };
    mutate(data);
  };

  const handleAddQuantity = (itemId: string) => {
    setSellBag((prev) => {
      const itemIndex = prev.findIndex((item) => item.product.id === itemId);
      const item = prev[itemIndex];
      const newQuantity = item.quantity + 1;
      const newItem = {
        ...item,
        quantity: newQuantity,
      };
      const newSellBag = [...prev];
      newSellBag[itemIndex] = newItem;
      return newSellBag;
    });
  };

  const handleSubtractQuantity = (itemId: string) => {
    setSellBag((prev) => {
      const itemIndex = prev.findIndex((item) => item.product.id === itemId);
      const item = prev[itemIndex];
      const newQuantity = item.quantity - 1;
      const newItem = {
        ...item,
        quantity: newQuantity,
      };
      const newSellBag = [...prev];
      newSellBag[itemIndex] = newItem;
      return newSellBag;
    });
  };

  const handlePriceChange = (itemId: string, value?: string) => {
    setSellBag((prev) => {
      const itemIndex = prev.findIndex((item) => item.product.id === itemId);
      const item = prev[itemIndex];
      const newPrice = Number(value);
      const newItem = {
        ...item,
        price: newPrice,
      };
      const newSellBag = [...prev];
      newSellBag[itemIndex] = newItem;
      return newSellBag;
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setSellBag((prev) => {
      const newSellBag = prev.filter((item) => item.product.id !== itemId);
      return newSellBag;
    });
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
        <h4>Dados do cliente</h4>
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
        <h4>Sacola</h4>
        <SellBagTable
          sellBag={sellBag}
          onAddQuantity={handleAddQuantity}
          onSubtractQuantity={handleSubtractQuantity}
          onPriceChange={handlePriceChange}
          onRemoveItem={handleRemoveItem}
        />
        <Button type="submit" disabled={isLoading} loading={isLoading}>
          Salvar
        </Button>
      </form>
    </div>
  );
}
