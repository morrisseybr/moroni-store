import moment from "moment";
import "./globals.css";
import { Inter } from "next/font/google";

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
