import * as z from "zod";

export const PRODUCT_TYPE = [
  "shirt",
  "pants",
  "shoes",
  "hat",
  "socks",
  "underwear",
  "accessories",
  "other",
] as const;

export const PRODUCT_GENDER = ["male", "female", "unisex"] as const;

export const PRODUCT_SIZE = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "xxxl",
  "unique",
] as const;

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  type: z.enum(PRODUCT_TYPE),
  gender: z.enum(PRODUCT_GENDER),
  size: z.enum(PRODUCT_SIZE),
  price: z.number().positive(),
  stock: z.number().nonnegative(),
});

export type Product = z.infer<typeof ProductSchema>;
