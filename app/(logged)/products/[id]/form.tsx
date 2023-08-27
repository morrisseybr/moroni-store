"use client";

import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function ProductDetailsForm({
  productId,
  children,
}: {
  productId: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationFn: (data: any) => {
      return axios.put(`/api/products/${productId}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso.",
      });
      router.push("/products");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    mutate(data);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
