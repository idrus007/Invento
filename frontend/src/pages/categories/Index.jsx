import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { Button } from "../../components/ui/Button.jsx";
import {
  Ellipsis,
  Pen,
  Plus,
  Search,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/Table.jsx";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/category.js";
import { HashLoader } from "react-spinners";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/Popover.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../services/category.js";
import { toast } from "react-hot-toast";

const ListCategories = () => {
  const {
    data: categoriesResponse = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  const queryClient = useQueryClient();

  const { mutate: handleDelete, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  if (isLoading)
    return (
      <DashboardLayout header="Categories">
        <div className="flex h-full w-full items-center justify-center">
          <HashLoader color="#3B82F6" />
        </div>
      </DashboardLayout>
    );

  if (isError)
    return (
      <DashboardLayout header="Categories">
        <div className="flex h-full w-full items-center justify-center text-red-500">
          {error.message}
        </div>
      </DashboardLayout>
    );

  const categories = categoriesResponse?.data ?? [];

  return (
    <DashboardLayout header="Categories">
      <div className="h-full w-full flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="relative w-full max-w-xl">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Search size={16} />
            </span>
            <Input placeholder="Search" className="w-full text-sm pl-9" />
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/categories/create"
              className="bg-blue-500 p-2 rounded-md text-white"
            >
              <Plus size={18} />
            </Link>
          </div>
        </div>

        {categories.length > 0 ? (
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="*:text-gray-900 *:first:font-medium text-sm"
                  >
                    <TableCell>{category.name}</TableCell>
                    <TableCell className="text-gray-500">
                      {category.description}
                    </TableCell>
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
                              to={`/categories/edit/${category.id}`}
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
                                  window.confirm(
                                    `Hapus kategori "${category.name}"?`
                                  )
                                ) {
                                  handleDelete(category.id);
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
            <span>{categoriesResponse.message}</span>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ListCategories;
