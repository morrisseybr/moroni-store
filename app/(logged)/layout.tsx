"use client";

import deleteSessionCookie from "@/actions/delete-session-cookie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleLogout = useCallback(async () => {
    await deleteSessionCookie();
    router.push("/login");
  }, [router]);
  return (
    <>
      <header className="py-2 mb-2 border-b flex justify-between items-center">
        <Link href="/" className="lead link">
          Moroni Store
        </Link>
        <nav className="flex gap-4">
          <Button onClick={handleLogout} variant="link">
            Sair
          </Button>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
