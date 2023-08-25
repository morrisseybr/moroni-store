import { app } from "@/config/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/dist/client/components/headers";

export default async function createSessionCookie({
  idToken,
}: {
  idToken: string;
}) {
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  const sessionCookie = await getAuth(app).createSessionCookie(idToken, {
    expiresIn,
  });
  const options = { maxAge: expiresIn, httpOnly: true, secure: true };
  cookies().set("session", sessionCookie, options);
}
