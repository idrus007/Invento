import React from "react";

export function Table({ children }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  );
}

export function TableHeader({ children }) {
  return (
    <thead className="ltr:text-left rtl:text-right bg-gray-100 rounded-md">
      {children}
    </thead>
  );
}

export function TableRow({ children }) {
  return <tr className="*:font-medium *:text-gray-800 text-sm">{children}</tr>;
}

export function TableBody({ children }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  );
}

export function TableCell({ children, className = "" }) {
  return (
    <td className={`px-4 py-2.5 whitespace-nowrap ${className}`}>{children}</td>
  );
}

export function TableHead({ children, className = "" }) {
  return (
    <th className={`px-4 py-2.5 whitespace-nowrap ${className}`}>{children}</th>
  );
}
