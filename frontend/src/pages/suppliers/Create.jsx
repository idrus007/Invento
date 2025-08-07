import React, { useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Label } from "../../components/ui/Label.jsx";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupplier } from "../../services/supplier.js";
import { toast } from "react-hot-toast";

const CreateSupplier = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: createSupplier,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["suppliers"]);
      toast.success(res.message);

      navigate("/suppliers");
    },
    onError: (err) => {
      setError(err.response.data.message);
      toast.error(err.response?.data?.message);
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

  return (
    <DashboardLayout header="Create Supplier">
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-4 p-4 bg-white rounded-xl border border-gray-200"
      >
        <div>
          <Label htmlFor="name">Supplier Name</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Add supplier name"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Add supplier phone number"
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={5}
            placeholder="Add supplier address"
            className="w-full rounded-md border border-gray-300 shadow-xs text-sm px-3 py-2 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/suppliers")}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default CreateSupplier;
