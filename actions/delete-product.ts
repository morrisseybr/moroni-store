"use server";

import { PrismaClient } from "@prisma/client";

export default async function deleteProduct(id: string) {
  const prisma = new PrismaClient();
  await prisma.product.delete({
    where: {
      id,
    },
  });
}
