import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, deleteCategory } from "../services/category.js";
import { toast } from "react-hot-toast";

export const useCategories = () => {
  const queryClient = useQueryClient();

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
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const { mutate: handleDelete, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete category");
    },
  });

  const categories = categoriesResponse?.data ?? [];
  const message = categoriesResponse?.message ?? "";

  return {
    categories,
    message,
    isLoading,
    isError,
    error,
    handleDelete,
    isDeleting,
  };
};
