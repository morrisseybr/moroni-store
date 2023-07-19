"use server";

import { cookies } from "next/dist/client/components/headers";

export default async function deleteSessionCookie() {
  console.log("deleteSessionCookie");
  cookies().delete("session");
}
