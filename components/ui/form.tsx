"use client";
import { FormHTMLAttributes, forwardRef } from "react";
import { useToast } from "./use-toast";
import { redirect, useRouter } from "next/navigation";
import { ToastAction } from "./toast";

type FormPros = FormHTMLAttributes<HTMLFormElement> & {
  action: (data: FormData) => Promise<void>;
  successTitle?: string;
  successMessage?: string;
  successRedirect?: string;
};

const Form = forwardRef<HTMLFormElement, FormPros>(
  ({ action, successTitle, successMessage, successRedirect, ...rest }, ref) => {
    const { toast } = useToast();
    const router = useRouter();
    const handleAction = async (data: FormData) => {
      await action(data);
      successTitle &&
        toast({
          title: successTitle,
          description: successMessage,
          action: successRedirect ? (
            <ToastAction
              altText="Voltar"
              onClick={() => router.push(successRedirect)}
            >
              Voltar
            </ToastAction>
          ) : undefined,
        });
    };
    return <form ref={ref} action={handleAction} {...rest} />;
  }
);

Form.displayName = "Form";

export { Form };
