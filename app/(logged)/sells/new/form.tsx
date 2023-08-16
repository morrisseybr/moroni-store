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
import {
  InputCurrency,
  currencyToNumber,
  numberToCurrency,
} from "@/components/ui/input-currency";
import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Combobox } from "@/components/ui/combobox";
import SellBagTable from "../components/sell-bag-table";
import { Sell, SellBag } from "@/model/Sell";
import Form from "@/components/ui/form";
import { CreateSellFormData } from "@/actions/create-sell";
import { formatValue } from "react-currency-input-field";
import { useMutation } from "@tanstack/react-query";

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
  const [sellBag, setSellBag] = useState<CreateSellFormData["bag"]>([]);
  const handleComboSelect = useCallback(
    (value: string) => {
      setSellBag((prev) => {
        const selectedProduct = productsSummary.find(
          (product) => product.id === value
        );
        if (!selectedProduct) return prev;
        return [
          ...prev,
          {
            productId: selectedProduct.id,
            productName: selectedProduct.name,
            quantity: 1,
            price: selectedProduct.price.toString(),
          },
        ];
      });
    },
    [productsSummary]
  );

  const handleRemoveItem = useCallback((itemId: string) => {
    setSellBag((prev) => prev.filter((item) => item.productId !== itemId));
  }, []);

  const handleAddQuantity = useCallback((itemId: string) => {
    setSellBag((prev) =>
      prev.map((item) => {
        if (item.productId === itemId) {
          const newQuantity = item.quantity + 1;
          const newPrice = numberToCurrency(
            (currencyToNumber(item.price) / item.quantity) * newQuantity
          );
          console.log(item.price, newPrice);
          return {
            ...item,
            quantity: newQuantity,
            price: newPrice,
          };
        }
        return item;
      })
    );
  }, []);

  const handleSubtractQuantity = useCallback((itemId: string) => {
    setSellBag((prev) =>
      prev.map((item) => {
        if (item.productId === itemId) {
          const newQuantity = item.quantity - 1;
          const newPrice = numberToCurrency(
            (currencyToNumber(item.price) / item.quantity) * newQuantity
          );
          return {
            ...item,
            quantity: newQuantity,
            price: newPrice,
          };
        }
        return item;
      })
    );
  }, []);

  const handlePriceChange = useCallback((itemId: string, value?: string) => {
    setSellBag((prev) =>
      prev.map((item) => {
        if (item.productId === itemId) {
          return {
            ...item,
            price: value,
          };
        }
        return item;
      })
    );
  }, []);

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
          sellBag={sellBag}
          onAddQuantity={handleAddQuantity}
          onSubtractQuantity={handleSubtractQuantity}
          onPriceChange={handlePriceChange}
          onRemoveItem={handleRemoveItem}
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
