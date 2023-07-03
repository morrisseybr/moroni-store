import moment from "moment";
import { Inter } from "next/font/google";
import "@/config/firebase";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

moment.locale("pt-br");

export const metadata = {
  title: "Moroni Store",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="dark">
      <body className={inter.className}>
        <div className="m-auto p-2 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
