import * as React from "react";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const InputPhone = React.forwardRef<any, any>(
  ({ className, ...props }, ref) => {
    const [value, setValue] = React.useState();
    return (
      <PhoneInput
        ref={ref}
        value={value}
        onChange={setValue}
        defaultCountry="BR"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent [&>input]:bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
InputPhone.displayName = "InputPhone";

export { InputPhone };
