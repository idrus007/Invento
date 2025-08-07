import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById, updateProduct } from "../../services/product";
import { useCategories } from "../../hooks/useCategory";
import { DashboardLayout } from "../../layouts/DashboardLayout.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Label } from "../../components/ui/Label.jsx";
import { toast } from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    unit: "",
    purchase_price: "",
    selling_price: "",
  });

  const [error, setError] = useState("");

  const { categories, isLoading: isLoadingCategories } = useCategories();

  const {
    data: productResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  useEffect(() => {
    if (productResponse?.data) {
      const product = productResponse.data;
      setFormData({
        name: product.name,
        category_id: product.category_id,
        unit: product.unit,
        purchase_price: product.purchase_price,
        selling_price: product.selling_price,
      });
    }
  }, [productResponse]);

  const mutation = useMutation({
    mutationFn: (payload) => updateProduct(id, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries(["products"]);
      toast.success(res.message);
      navigate("/products");
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
      <DashboardLayout header="Edit Product">
        <p className="text-center py-4 text-sm text-gray-500">Loading...</p>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout header="Edit Product">
        <p className="text-center py-4 text-sm text-red-500">
          Gagal memuat data produk.
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout header="Edit Product">
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-4 p-4 bg-white rounded-xl border border-gray-200"
      >
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama produk"
          />
        </div>

        <div>
          <Label htmlFor="category_id">Category</Label>
          {isLoadingCategories ? (
            <p className="text-sm text-gray-500">Loading categories...</p>
          ) : (
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-xs text-sm px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled hidden>
                Pilih kategori
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <Label htmlFor="unit">Unit</Label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 shadow-xs text-sm px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled hidden>
              Pilih satuan
            </option>
            <option value="cart">Carton</option>
            <option value="box">Box</option>
            <option value="pack">Pack</option>
            <option value="wrap">Wrap</option>
            <option value="pcs">Piece</option>
            <option value="dozen">Dozen</option>
            <option value="strip">Strip Pack</option>
            <option value="kg">Kilogram</option>
            <option value="gram">Gram</option>
            <option value="ton">Ton</option>
            <option value="liter">Liter</option>
            <option value="ml">Milliliter</option>
            <option value="sack">Sack</option>
            <option value="bottle">Bottle</option>
            <option value="can">Can</option>
            <option value="set">Set</option>
            <option value="unit">Unit</option>
            <option value="sheet">Sheet</option>
            <option value="roll">Roll</option>
            <option value="bundle">Bundle</option>
          </select>
        </div>

        <div>
          <Label htmlFor="purchase_price">Purchase Price</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-800 text-sm">
              Rp
            </span>
            <Input
              type="number"
              name="purchase_price"
              value={formData.purchase_price}
              onChange={handleChange}
              placeholder="Harga beli"
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="selling_price">Selling Price</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-800 text-sm">
              Rp
            </span>
            <Input
              type="number"
              name="selling_price"
              value={formData.selling_price}
              onChange={handleChange}
              placeholder="Harga jual"
              className="pl-9"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/products")}
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

export default EditProduct;
