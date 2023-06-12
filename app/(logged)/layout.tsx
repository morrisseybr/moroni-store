import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="py-2 mb-2 border-b flex justify-between items-center">
        <Link href="/" className="lead link">
          Moroni Store
        </Link>
        <nav className="flex gap-4">
          <Link href="/login" className="link">
            Sair
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
