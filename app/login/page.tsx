"use client";

import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  inMemoryPersistence,
} from "firebase/auth";
import { app } from "@/config/firebase";
import { FormEvent, useState } from "react";
import createSessionCookie from "@/actions/create-session-cookie";

import { Button } from "@/components/ui/button";
import { Fieldset } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const auth = getAuth(app);
  setPersistence(auth, inMemoryPersistence);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    if (
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string"
    )
      return;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      await createSessionCookie({ idToken });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <h1 className="">Moroni Store</h1>
      <span className="muted small">Área administrativa</span>
      <hr className="mt-3 mb-8" />
      <form className="flex flex-col gap-4 w-96 m-auto" onSubmit={handleLogin}>
        <h4>Login</h4>
        <Fieldset>
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" name="email" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="password">Senha</Label>
          <Input type="password" name="password" />
        </Fieldset>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Entrar"}
        </Button>
      </form>
    </main>
  );
}
