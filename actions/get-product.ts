"use server";

import { Product, ProductSchema } from "@/model/Product";
import { PrismaClient } from "@prisma/client";

export default async function getProduct(id: string): Promise<Product> {
  const prisma = new PrismaClient();
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return ProductSchema.parse(product);
}
