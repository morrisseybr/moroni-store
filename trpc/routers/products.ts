import { z } from "zod";
import { procedure, router } from "../trpc";
import getProducts from "@/actions/get-products";
import getProduct from "@/actions/get-product";
import { ProductModel } from "@/core/model/Product";
import createProduct from "@/actions/create-product";
import updateProduct from "@/actions/update-product";

export const productsRouter = router({
  list: procedure
    .input(z.object({ cursor: z.string().nullable() }))
    .query(async ({ input }) => {
      const products = await getProducts(input.cursor);
      return products.map((product) => product.toModel());
    }),
  getById: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const product = await getProduct(input.id);
      return product.toModel();
    }),
  create: procedure
    .input(ProductModel.omit({ id: true }))
    .mutation(async ({ input }) => {
      const product = await createProduct(input);
      return product.toModel();
    }),
  update: procedure.input(ProductModel).mutation(async ({ input }) => {
    const product = await updateProduct(input);
    return product.toModel();
  }),
});
