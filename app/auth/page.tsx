"use client";

import { signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  return (
    <main>
      <h1 className="">Moroni Store</h1>
      <span className="muted small">Área administrativa</span>
      <hr className="mt-3 mb-8" />
      <section>
        <button onClick={() => signIn()}>Login</button>
        <button onClick={() => signOut()}>Logout</button>
      </section>
    </main>
  );
}
