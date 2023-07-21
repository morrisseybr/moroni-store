import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/dist/client/components/headers";
import deleteSessionCookie from "./delete-session-cookie";

export default async function verifySessionCookie() {
  const sessionCookie = cookies().get("session")?.value || "";
  try {
    await getAuth().verifySessionCookie(sessionCookie, true);
  } catch (error) {
    await deleteSessionCookie();
    throw error;
  }
}
