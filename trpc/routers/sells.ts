import { SellModel } from "@/core/model/Sell";
import { procedure, router } from "../trpc";
import createSell from "@/actions/create-sell";
import updateSell from "@/actions/update-sell";
import getSell from "@/actions/get-sell";
import { z } from "zod";
import listSells from "@/actions/list-sells";

export const sellsRouter = router({
  create: procedure
    .input(SellModel.omit({ id: true }))
    .mutation(async ({ input }) => {
      const sell = await createSell(input);
      return sell.toModel();
    }),
  update: procedure.input(SellModel).mutation(async ({ input }) => {
    const sell = await updateSell(input);
    return sell.toModel();
  }),
  getById: procedure
    .input(SellModel.pick({ id: true }))
    .query(async ({ input }) => {
      const sell = await getSell(input.id);
      return sell.toModel();
    }),
  list: procedure
    .input(z.object({ cursor: SellModel.shape.id.nullable() }))
    .query(async ({ input }) => {
      const sells = await listSells(input.cursor);
      return sells.map((sell) => sell.toModel());
    }),
});
