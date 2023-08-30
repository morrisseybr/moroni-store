import { z } from "zod";
import { procedure, router } from "../trpc";
import getProduct from "@/actions/get-product";
import { ProductModel } from "@/core/model/Product";
import createProduct from "@/actions/create-product";
import updateProduct from "@/actions/update-product";
import listProducts from "@/actions/list-products";

export const productsRouter = router({
  list: procedure
    .input(z.object({ cursor: ProductModel.shape.id.nullable() }))
    .query(async ({ input }) => {
      const products = await listProducts(input.cursor);
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
