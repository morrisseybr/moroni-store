"use server";
import { ProductSchema } from "@/model/Product";
import * as z from "zod";

const createProductSchema = ProductSchema.omit({ id: true });

export default async function createProduct(formData: FormData) {
  console.log(formData);
  // const data = createProductSchema.parse(formData);
}
