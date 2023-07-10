import { authOptions } from "@/config/nextauth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <header className="py-2 mb-2 border-b flex justify-between items-center">
        <Link href="/" className="lead link">
          Moroni Store
        </Link>
        <nav className="flex gap-4">
          <Link href="/login" className="link">
            {session ? "Logout" : "Login"}
            {session?.user?.allowed && " (admin)"}
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
