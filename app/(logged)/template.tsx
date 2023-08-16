"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, useEffect } from "react";
import LoadingPage from "./loading";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function LoggedTemplate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isLoading, isError, isSuccess } = useQuery(
    ["session"],
    () => {
      return axios.get("/api/session");
    },
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (isError) {
      router.push("/login");
      toast({
        title: "Erro!",
        description: "Você não está logado.",
        variant: "destructive",
      });
    }
  }, [isError, router]);

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isSuccess) {
    return <>{children}</>;
  }
}
