"use server";
import { ProductSchema, ProductSummarySchema } from "@/model/Product";
import * as z from "zod";
import { getFirestore } from "firebase-admin/firestore";

const createProductSchema = z.object({
  name: z.coerce.string().nonempty(),
  description: z.coerce.string(),
  type: z.coerce.string().nonempty(),
  gender: z.coerce.string().nonempty(),
  size: z.coerce.string().nonempty(),
  number: z.coerce.number().positive().nullable(),
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
    .pipe(z.number().positive()),
  stock: z.coerce.number().nonnegative(),
});

export default async function createProduct(formData: FormData) {
  const data = createProductSchema.parse(
    Object.fromEntries(formData.entries())
  );
  const db = getFirestore();
  const docRef = db.collection("products").doc();
  const newProduct = ProductSchema.parse({ id: docRef.id, ...data });
  await docRef.set(newProduct);
  const newProductSummary = ProductSummarySchema.parse(newProduct);
  const productsSummaryRef = db.collection("products").doc("summary");
  await productsSummaryRef.update({
    [newProductSummary.id]: newProductSummary,
  });
}
