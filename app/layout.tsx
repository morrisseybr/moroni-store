import moment from "moment";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/nextauth";

const inter = Inter({ subsets: ["latin"] });

moment.locale("pt-br");

export const metadata = {
  title: "Moroni Store",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="pt-br" className="dark">
      <body className={inter.className}>
        <h2>{session ? "LOGED" : "NOT LOGED"}</h2>
        <div className="m-auto p-2 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
