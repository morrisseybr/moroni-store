import verifySessionCookie from "@/actions/verify-session-cookie";
import { redirect } from "next/navigation";

export default async function LoggedTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogged = await verifySessionCookie();
  if (!isLogged) {
    redirect("/login");
  }
  return <>{children}</>;
}
