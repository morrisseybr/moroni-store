import { cookies } from "next/dist/client/components/headers";

export default async function deleteSessionCookie() {
  cookies().delete("session");
}
