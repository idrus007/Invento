import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts } from "../services/product.js";
import toast from "react-hot-toast";

export const useProducts = () => {
  const queryClient = useQueryClient();

  const {
    data: productsResponse = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const { mutate: handleDelete, isLoading: isDeleting } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["products"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete product");
    },
  });

  const products = productsResponse?.data ?? [];
  const message = productsResponse?.message ?? "";

  return {
    products,
    message,
    isLoading,
    isError,
    error,
    handleDelete,
    isDeleting,
  };
};
