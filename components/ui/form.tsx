"use client";
import { FormEvent, FormHTMLAttributes, forwardRef, useCallback } from "react";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "./toast";

type FormPros = FormHTMLAttributes<HTMLFormElement> & {
  action: string;
  successTitle?: string;
  successMessage?: string;
  successRedirect?: string;
};

const Form = forwardRef<HTMLFormElement, FormPros>(
  ({ action, successTitle, successMessage, successRedirect, ...rest }, ref) => {
    const { toast } = useToast();
    const router = useRouter();
    const handleSubmit = useCallback(
      async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        try {
          await fetch(action, {
            method: form.method,
            body: formData,
          });
        } catch (error) {
          console.log(error);
          return;
        }
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
      },
      [action, router, successMessage, successRedirect, successTitle, toast]
    );
    return <form method="POST" ref={ref} onSubmit={handleSubmit} {...rest} />;
  }
);

Form.displayName = "Form";

export { Form };
