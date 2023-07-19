"use server";

import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/dist/client/components/headers";
import deleteSessionCookie from "./delete-session-cookie";

export default async function verifySessionCookie() {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) return false;
  try {
    await getAuth().verifySessionCookie(sessionCookie, true);
    return true;
  } catch (error) {
    console.log(error);
    await deleteSessionCookie();
    return false;
  }
}
