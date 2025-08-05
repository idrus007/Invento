import React from "react";
import { cn } from "../../lib/utils";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    outline:
      "bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-100",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    ghost: "bg-transparent hover:bg-gray-100",
    link: "bg-transparent text-gray-800 hover:underline",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
