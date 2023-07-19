import * as z from "zod";

export const SellSchema = z.object({
  id: z.coerce.string().nonempty(),
  date: z.date(),
  bag: z.array(
    z.object({
      productId: z.string().nonempty(),
      productName: z.string().nonempty(),
      price: z.number().nonnegative(),
      quantity: z.number().positive(),
    })
  ),
});

export type Sell = z.infer<typeof SellSchema>;

export const SellSummarySchema = SellSchema.pick({
  id: true,
  date: true,
});

export type SellSummary = z.infer<typeof SellSummarySchema>;
