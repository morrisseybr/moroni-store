import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  transformer: SuperJSON,
});

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
