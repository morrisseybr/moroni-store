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
import {
  ProductType,
  ProductGender,
  ProductSize,
  ProductSummary,
} from "@/model/Product";
import { InputCurrency } from "@/components/ui/input-currency";
import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Combobox } from "@/components/ui/combobox";
import SellBagTable from "../components/sell-bag-table";
import { Sell } from "@/model/Sell";
import Form from "@/components/ui/form";

type NewSellFormProps = {
  productsSummary: ProductSummary[];
};

export default function NewSellForm({ productsSummary }: NewSellFormProps) {
  const items = useMemo(
    () =>
      productsSummary.map((products) => ({
        label: products.name,
        value: products.id,
      })),
    [productsSummary]
  );
  const { mutate, isLoading } = useMutation(async (data: FormData) => {
    await axios.post("/api/sells", data);
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutate(formData);
  };
  const [bagItems, setBagItems] = useState<Sell["bag"]>([]);
  const handleComboSelect = useCallback(
    (value: string) => {
      console.log(
        value,
        items.find((item) => item.value === "BgtRAxq5mTYrN0cse3oJ")
      );
      setBagItems((prev) => [
        ...prev,
        {
          productId: value,
          productName:
            items.find((item) => item.value === value)?.label || "aaa",
          quantity: 1,
          price: 0,
        },
      ]);
    },
    [items]
  );

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      setBagItems((prev) => prev.filter((item) => item.productId !== itemId));
    },
    [setBagItems]
  );

  const handleAddQuantity = useCallback(
    (itemId: string) => {
      console.log(itemId);
      setBagItems((prev) =>
        prev.map((item) =>
          item.productId === itemId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    },
    [setBagItems]
  );

  const handleSubtractQuantity = useCallback(
    (itemId: string) => {
      setBagItems((prev) =>
        prev.map((item) =>
          item.productId === itemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
      );
    },
    [setBagItems]
  );

  const handlePriceChange = useCallback(
    (itemId: string, price: number) => {
      setBagItems((prev) =>
        prev.map((item) =>
          item.productId === itemId
            ? {
                ...item,
                price,
              }
            : item
        )
      );
    },
    [setBagItems]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <Label htmlFor="bag">Sacola</Label>
        <Combobox
          items={items}
          onSelect={handleComboSelect}
          placeholder="Selecione um produto"
          searchPlaceholder="Pesquisar produto"
        />
        <SellBagTable
          productsSummary={productsSummary}
          bagItems={bagItems}
          onRemoveItem={handleRemoveItem}
          onAddQuantity={handleAddQuantity}
          onSubtractQuantity={handleSubtractQuantity}
          onPriceChange={handlePriceChange}
        />
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
  );
}
