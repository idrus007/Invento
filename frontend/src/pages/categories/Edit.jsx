import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryById, updateCategory } from "../../services/category.js";
import { DashboardLayout } from "../../layouts/DashboardLayout.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Label } from "../../components/ui/Label.jsx";
import { toast } from "react-hot-toast";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [error, setError] = useState("");

  const {
    data: categoryResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
  });

  useEffect(() => {
    if (categoryResponse?.data) {
      setFormData({
        name: categoryResponse.data.name,
        description: categoryResponse.data.description,
      });
    }
  }, [categoryResponse]);

  const mutation = useMutation({
    mutationFn: (payload) => updateCategory(id, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries(["categories"]);
      toast.success(res.message);
      navigate("/categories");
    },
    onError: (err) => {
      const msg = err?.response?.data?.message;
      setError(msg);
      toast.error(msg);
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <DashboardLayout header="Edit Category">
        <p className="text-center py-4 text-sm text-gray-500">Loading...</p>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout header="Edit Category">
        <p className="text-center py-4 text-sm text-red-500">
          Gagal memuat data kategori.
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout header="Edit Category">
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-4 p-4 bg-white rounded-xl border border-gray-200"
      >
        <div>
          <Label htmlFor="name">Category Name</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama kategori"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Masukkan deskripsi"
            className="w-full rounded-md border border-gray-300 shadow-xs text-sm px-3 py-2 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/categories")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default EditCategory;
