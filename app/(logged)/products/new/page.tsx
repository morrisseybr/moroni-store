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
import axios from "axios";
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function Product() {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => {
      return axios.post("/api/products", data);
    },
    onSuccess: () => {
      toast({
        title: "Produto cadastrado",
        description: "O produto foi cadastrado com sucesso.",
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
          <h3>Novo produto</h3>
        </div>
      </header>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Fieldset>
          <Label htmlFor="name">Nome</Label>
          <Input type="text" name="name" required />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="description">Descrição</Label>
          <Input type="text" name="description" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="type">Tipo</Label>
          <Select name="type" required>
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
          <Select name="gender" required>
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
          <Select name="size" required>
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
          <Input type="number" step={1} min={0} name="number" />
        </Fieldset>

        <Fieldset>
          <Label htmlFor="stock">Estoque</Label>
          <Input type="number" step={1} name="stock" required />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="price">Preço</Label>
          <InputCurrency name="price" required />
        </Fieldset>
        <Button type="submit" disabled={isLoading} loading={isLoading}>
          Salvar
        </Button>
      </form>
    </div>
  );
}
