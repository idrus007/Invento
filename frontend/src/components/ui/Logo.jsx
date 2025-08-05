import { Warehouse } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="bg-blue-200 p-2 rounded text-blue-600 flex items-center justify-center"
        aria-label="Logo"
      >
        <Warehouse className="w-5 h-5" />
      </span>
      <span className="text-xl font-bold text-gray-800">Invento</span>
    </div>
  );
}
