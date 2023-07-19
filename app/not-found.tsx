"use client";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GlobalNotFound() {
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: "Page not found",
      description: "The page you are looking for does not exist.",
      variant: "destructive",
    });
    router.push("/");
  }, [router, toast]);
  return null;
}
