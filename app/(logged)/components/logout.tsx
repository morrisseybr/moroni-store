"use client";

import deleteSessionCookie from "@/actions/delete-session-cookie";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = useCallback(async () => {
    setLoading(true);
    await deleteSessionCookie();
    setLoading(false);
    router.push("/login");
  }, [router]);

  return (
    <Button onClick={handleLogout} variant="outline">
      {loading ? <Loader2 className="animate-spin" /> : "Sair"}
    </Button>
  );
}
