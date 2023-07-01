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
import createProduct from "@/actions/create-product";
import { PRODUCT_GENDER, PRODUCT_SIZE, PRODUCT_TYPE } from "@/model/Product";
import { InputCurrency } from "@/components/ui/input-currency";
// import getTranslation from "@/components/i18n";

export default async function Product() {
  return (
    <form className="flex flex-col gap-4" action={createProduct}>
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
            {PRODUCT_TYPE.map((type) => (
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
            {PRODUCT_GENDER.map((gender) => (
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
            {PRODUCT_SIZE.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Fieldset>
      <Fieldset>
        <Label htmlFor="number">Número</Label>
        <Input type="text" name="number" />
      </Fieldset>
      <Fieldset>
        <Label htmlFor="stock">Estoque</Label>
        <Input type="number" step={1} name="stock" required />
      </Fieldset>
      <Fieldset>
        <Label htmlFor="price">Preço</Label>
        <InputCurrency name="price" required />
      </Fieldset>
      <Button type="submit">Salvar</Button>
    </form>
  );
}
