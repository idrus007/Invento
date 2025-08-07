import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/Table.jsx";
import {
  Ellipsis,
  Funnel,
  Pen,
  Plus,
  Search,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { HashLoader } from "react-spinners";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/Popover.jsx";
import { useProducts } from "../../hooks/useProduct.js";

const ListProducts = () => {
  const {
    products,
    message,
    isLoading,
    isError,
    error,
    handleDelete,
    isDeleting,
  } = useProducts();

  if (isLoading) {
    return (
      <DashboardLayout header="Categories">
        <div className="flex h-full w-full items-center justify-center">
          <HashLoader color="#3B82F6" />
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout header="Categories">
        <div className="flex h-full w-full items-center justify-center text-red-500">
          {error.message}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout header="Products">
      <div className="h-full w-full flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="relative w-full max-w-xl">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Search size={16} />
            </span>
            <Input placeholder="Search" className="w-full text-sm pl-9" />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Funnel size={18} />
              <span>Filter</span>
            </Button>
            <Link
              to="/products/create"
              className="bg-blue-500 p-2 rounded-md text-white"
            >
              <Plus size={18} />
            </Link>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Buying Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="*:text-gray-900 *:first:font-medium text-sm"
                  >
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category?.name}</TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>{`Rp${product.selling_price.toLocaleString(
                      "id-ID"
                    )}`}</TableCell>
                    <TableCell>{`Rp${product.purchase_price.toLocaleString(
                      "id-ID"
                    )}`}</TableCell>
                    <TableCell>{product.current_stock}</TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost">
                            <Ellipsis size={18} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit">
                          <div className="w-full flex flex-col items-start gap-2">
                            <Link
                              to={`/products/edit/${product.id}`}
                              className="w-full flex items-center text-sm font-medium px-4 py-2 border border-gray-300 rounded-md"
                            >
                              <Pen size={18} className="mr-3" /> Edit
                            </Link>
                            <Button
                              variant="destructive"
                              className="w-full flex items-center gap-2"
                              disabled={isDeleting}
                              onClick={() => {
                                if (
                                  window.confirm(`Delete "${product.name}"?`)
                                ) {
                                  handleDelete(product.id);
                                }
                              }}
                            >
                              <Trash2 size={18} />
                              <span>
                                {isDeleting ? "Deleting..." : "Delete"}
                              </span>
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="w-full flex items-center gap-2 p-4 rounded-md border border-yellow-300 bg-yellow-50 text-sm text-gray-700">
            <div className="text-yellow-500">
              <TriangleAlert size={18} />
            </div>
            <span>{message}</span>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ListProducts;
