import { FormHTMLAttributes, forwardRef } from "react";

const Form = forwardRef<HTMLFormElement, FormHTMLAttributes<HTMLFormElement>>(
  (props, ref) => {
    return <form ref={ref} className="flex flex-col gap-4" {...props} />;
  }
);

Form.displayName = "Form";

export default Form;
