import * as z from "zod";
import { FirebaseError } from "firebase-admin";

function isFirebaseAuthError(error: unknown): error is FirebaseError {
  return (
    (error as FirebaseError).code !== undefined &&
    (error as FirebaseError).code.startsWith("auth")
  );
}

export default function handleApiError(error: unknown) {
  if (error instanceof z.ZodError) {
    return new Response(JSON.stringify(error), {
      status: 400,
    });
  }
  if (isFirebaseAuthError(error)) {
    return new Response(JSON.stringify(error), { status: 401 });
  }
  return new Response(JSON.stringify(error), { status: 500 });
}
