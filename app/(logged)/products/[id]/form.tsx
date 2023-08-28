"use client";

import { Button } from "@/components/ui/button";
import { currencyToNumber } from "@/components/ui/input-currency";
import { useToast } from "@/components/ui/use-toast";
import { ProductGender, ProductSize, ProductType } from "@/core/model/Product";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function ProductDetailsForm({
  productId,
  children,
}: {
  productId: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isLoading } = trpc.products.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso.",
      });
      router.push("/products");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Parameters<typeof mutate>[0] = {
      id: productId,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as ProductType,
      gender: formData.get("gender") as ProductGender,
      size: formData.get("size") as ProductSize,
      number: Number(formData.get("number")),
      stock: Number(formData.get("stock")),
      price: currencyToNumber(formData.get("price") as string),
    };
    mutate(data);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {children}
      <Button type="submit" loading={isLoading} disabled={isLoading}>
        Salvar
      </Button>
    </form>
  );
}
