import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSuppliers, deleteSupplier } from "../services/supplier.js";
import toast from "react-hot-toast";

export const useSuppliers = () => {
  const queryClient = useQueryClient();

  const {
    data: suppliersResponse = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["suppliers"],
    queryFn: getSuppliers,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const { mutate: handleDelete, isLoading: isDeleting } = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["suppliers"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to delete supplier");
    },
  });

  const suppliers = suppliersResponse?.data ?? [];
  const message = suppliersResponse?.message ?? "";

  return {
    suppliers,
    message,
    isLoading,
    isError,
    error,
    handleDelete,
    isDeleting,
  };
};
