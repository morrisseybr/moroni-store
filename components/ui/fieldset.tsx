import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("flex flex-col gap-2");

const Fieldset = React.forwardRef<
  HTMLFieldSetElement,
  React.HTMLAttributes<HTMLFieldSetElement> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <fieldset ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Fieldset.displayName = "Fieldset";

export { Fieldset };
