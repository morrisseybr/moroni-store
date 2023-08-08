"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import CurrencyInput from "react-currency-input-field";

export interface InputCurrencyProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string | undefined) => void;
  onValueBlur?: (value: string | undefined) => void;
  type?: never;
  defaultValue?: string | number;
  step?: number;
}

export function currencyToNumber(value?: string): number {
  if (!value) return 0;
  return parseFloat(value.replace(".", "").replace(",", "."));
}

export function numberToCurrency(value: number): string {
  return value.toFixed(2).replace(",", "").replace(".", ",");
}

const InputCurrency = React.forwardRef<HTMLInputElement, InputCurrencyProps>(
  ({ className, onValueChange, onValueBlur, onBlur, ...props }, ref) => {
    const [value, setValue] = React.useState<string | undefined>(
      props.defaultValue?.toString()
    );
    const handleValueChange = React.useCallback(
      (value: string | undefined) => {
        setValue(value);
        onValueChange?.(value);
      },
      [onValueChange]
    );
    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onValueBlur?.(value);
        onBlur?.(e);
      },
      [onBlur, onValueBlur, value]
    );
    return (
      <CurrencyInput
        ref={ref}
        value={value}
        onValueChange={handleValueChange}
        onBlur={handleBlur}
        decimalScale={2}
        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
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
