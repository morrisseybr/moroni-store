"use server";

import { ProductSummary, ProductSummarySchema } from "@/model/Product";
import { PrismaClient } from "@prisma/client";

export default async function getProductsSummary(): Promise<ProductSummary[]> {
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
    },
  });
  return products.map((product) => ProductSummarySchema.parse(product));
}
