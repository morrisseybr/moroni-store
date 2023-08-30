import { productsRouter } from "./routers/products";
import { sellsRouter } from "./routers/sells";
import { router } from "./trpc";

export const appRouter = router({
  products: productsRouter,
  sells: sellsRouter,
});

export const trpcCaller = appRouter.createCaller({});

// export type definition of API
export type AppRouter = typeof appRouter;
