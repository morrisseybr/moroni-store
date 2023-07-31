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
import { ProductType, ProductGender, ProductSize } from "@/model/Product";
import { InputCurrency } from "@/components/ui/input-currency";
import { BackButton } from "@/components/ui/back-button";
import Form from "@/components/ui/form";
import { FormEvent, useRef, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Combobox } from "@/components/ui/combobox";
import SellBagTable from "../components/sell-bag-table";
import { Sell } from "@/model/Sell";

export default function Sell() {
  const { mutate, isLoading } = useMutation(async (data: FormData) => {
    await axios.post("/api/sells", data);
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutate(formData);
  };
  const items = useRef([
    { label: "Camisa 1", value: "1" },
    { label: "Camisa 2", value: "2" },
  ]);
  const [bagItems, setBagItems] = useState<Sell["bag"]>([]);
  const handleComboSelect = (value: string) => {
    setBagItems((prev) => [
      ...prev,
      {
        productId: value,
        productName:
          items.current.find((item) => item.value === value)?.label || "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="py-2 mb-2 flex justify-between items-center">
        <div className="flex gap-2 items-center justify-start">
          <BackButton />
          <h3>Nova venda</h3>
        </div>
      </header>
      <Form onSubmit={handleSubmit}>
        <Fieldset>
          <Label htmlFor="bag">Sacola</Label>
          <Combobox
            items={items.current}
            onSelect={handleComboSelect}
            placeholder="Selecione um produto"
            searchPlaceholder="Pesquisar produto"
          />
          <SellBagTable bagItems={bagItems} />
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
      </Form>
    </div>
  );
}
