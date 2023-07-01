"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import CurrencyInput from "react-currency-input-field";

export interface InputCurrencyProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: never;
  defaultValue?: string | number;
  step?: number;
}

const InputCurrency = React.forwardRef<HTMLInputElement, InputCurrencyProps>(
  ({ className, ...props }, ref) => {
    return (
      <CurrencyInput
        ref={ref}
        decimalScale={2}
        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
        onValueChange={(value, name) => console.log(value, name)}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
InputCurrency.displayName = "InputCurrency";

export { InputCurrency };
