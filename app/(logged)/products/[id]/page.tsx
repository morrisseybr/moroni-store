"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Fieldset } from "@/components/ui/fieldset";
import { ProductType, ProductGender, ProductSize } from "@/core/model/Product";
import { InputCurrency } from "@/components/ui/input-currency";
import { BackButton } from "@/components/ui/back-button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent } from "react";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: product } = useQuery(["product", params.id], async () => {
    const response = await axios.get(`/api/products/${params.id}`);
    return response.data;
  });
  const { mutate } = useMutation({
    mutationFn: (data: any) => {
      return axios.put("/api/products", data);
    },
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
    const data = Object.fromEntries(formData.entries());
    mutate(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="py-2 mb-2 flex justify-between items-center">
        <div className="flex gap-2 items-center justify-start">
          <BackButton />
          <h3>Editar produto</h3>
        </div>
      </header>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Fieldset>
          <Label htmlFor="name">Nome</Label>
          <Input type="text" name="name" required defaultValue={product.name} />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="description">Descrição</Label>
          <Input
            type="text"
            name="description"
            defaultValue={product.description}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="type">Tipo</Label>
          <Select name="type" required defaultValue={product.type}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um" />
            </SelectTrigger>
            <SelectContent>
              {ProductType.options.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Fieldset>
        <Fieldset>
          <Label htmlFor="gender">Gênero</Label>
          <Select name="gender" required defaultValue={product.gender}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um" />
            </SelectTrigger>
            <SelectContent>
              {ProductGender.options.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Fieldset>
        <Fieldset>
          <Label htmlFor="size">Tamanho</Label>
          <Select name="size" required defaultValue={product.size}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um" />
            </SelectTrigger>
            <SelectContent>
              {ProductSize.options.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Fieldset>
        <Fieldset>
          <Label htmlFor="number">Número</Label>
          <Input
            type="text"
            name="number"
            defaultValue={product.number || undefined}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="stock">Estoque</Label>
          <Input
            type="number"
            step={1}
            name="stock"
            required
            defaultValue={product.stock}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="price">Preço</Label>
          <InputCurrency name="price" required defaultValue={product.price} />
        </Fieldset>
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
}
