import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/dist/client/components/headers";
import deleteSessionCookie from "./delete-session-cookie";
import { app } from "@/config/firebase-admin";

export default async function verifySessionCookie() {
  const sessionCookie = cookies().get("session")?.value || "";
  try {
    await getAuth(app).verifySessionCookie(sessionCookie, true);
  } catch (error) {
    await deleteSessionCookie();
    throw error;
  }
}
