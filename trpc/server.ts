import { productsRouter } from "./routers/products";
import { router } from "./trpc";

export const appRouter = router({
  products: productsRouter,
});

export const caller = appRouter.createCaller({});

// export type definition of API
export type AppRouter = typeof appRouter;
