import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(function Input(
  { className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md border border-gray-300 shadow-xs text-sm px-3 py-2 focus:outline-none focus:border-blue-500",
        className
      )}
      {...props}
    />
  );
});

export { Input };
