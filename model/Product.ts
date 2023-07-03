import * as z from "zod";

export const ProductType = z.enum([
  "shirt",
  "pants",
  "shoes",
  "hat",
  "socks",
  "underwear",
  "accessories",
  "other",
]);
export type ProductType = z.infer<typeof ProductType>;

export const ProductGender = z.enum(["male", "female", "unisex"]);
export type ProductGender = z.infer<typeof ProductGender>;

export const ProductSize = z.enum([
  "number",
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "xxxl",
  "unique",
]);
export type ProductSize = z.infer<typeof ProductSize>;

export const ProductSchema = z.object({
  id: z.coerce.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string(),
  type: ProductType,
  gender: ProductGender,
  size: ProductSize,
  number: z.number().positive().nullable(),
  price: z.number().positive(),
  stock: z.number().nonnegative(),
});

export type Product = z.infer<typeof ProductSchema>;
