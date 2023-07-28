"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useToast } from "./ui/use-toast";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        mutations: {
          onError: (error) => {
            if (error instanceof AxiosError) {
              if (error.response?.status === 401) {
                toast({
                  title: "Sessão expirada",
                  description: "Faça login novamente.",
                  variant: "destructive",
                });
                router.push("/login");
              }
              if (error.response?.status === 400) {
                console.log(error.response);
                toast({
                  title: "Erro de validação",
                  description:
                    "Os dados enviados são inválidos. Verifique os campos e tente novamente.",
                  variant: "destructive",
                });
              }
              if (error.response?.status === 500) {
                toast({
                  title: "Erro interno",
                  description:
                    "Ocorreu um erro interno. Tente novamente mais tarde.",
                  variant: "destructive",
                });
              }
            }
          },
        },
      },
    })
  );
  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
