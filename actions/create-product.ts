"use server";
import { ProductSchema, ProductSummarySchema } from "@/model/Product";
import * as z from "zod";
import { PrismaClient, Prisma } from "@prisma/client";

const createProductSchema = z.object({
  name: z.coerce.string().nonempty(),
  description: z.coerce.string(),
  type: z.coerce.string().nonempty(),
  gender: z.coerce.string().nonempty(),
  size: z.coerce.string().nonempty(),
  number: z.coerce.number().nonnegative().nullable(),
  price: z.coerce
    .string()
    .nonempty()
    .transform((value) =>
      Number(
        value
          .replace(".", "")
          .replace(",", ".")
          .replace(/[^0-9.-]+/g, "")
      )
    )
    .pipe(z.number().nonnegative()),
  stock: z.coerce.number().nonnegative(),
});

export default async function createProduct(formData: FormData) {
  const data = createProductSchema.parse(
    Object.fromEntries(formData.entries())
  );
  const prisma = new PrismaClient();
  const newProduct = ProductSchema.omit({ id: true }).parse(data);
  await prisma.product.create({
    data: {
      ...newProduct,
    },
  });
}
