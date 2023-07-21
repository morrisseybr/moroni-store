"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = useCallback(async () => {
    setLoading(true);
    await fetch("/api/session", {
      method: "DELETE",
    });
    router.push("/login");
    setLoading(false);
  }, [router]);

  return (
    <Button onClick={handleLogout} variant="outline" disabled={loading}>
      {loading ? <Loader2 className="animate-spin" /> : "Sair"}
    </Button>
  );
}
