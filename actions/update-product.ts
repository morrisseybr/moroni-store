"use server";
import { ProductSchema, ProductSummarySchema } from "@/model/Product";
import { PrismaClient } from "@prisma/client";
import * as z from "zod";

const updateProductSchema = z.object({
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

export default async function updateProduct(id: string, formData: FormData) {
  const data = updateProductSchema.parse(
    Object.fromEntries(formData.entries())
  );
  const prisma = new PrismaClient();
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      ...ProductSchema.omit({ id: true }).parse(data),
    },
  });
}
