import axiosInstance from "../utils/axiosInstance";

export const getSuppliers = async () => {
  try {
    const res = await axiosInstance.get("/suppliers");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createSupplier = async (payload) => {
  try {
    const res = await axiosInstance.post("/suppliers", payload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSupplierById = async (id) => {
  try {
    const res = await axiosInstance.get(`/suppliers/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateSupplier = async (id, payload) => {
  try {
    const res = await axiosInstance.put(`/suppliers/${id}`, payload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const res = await axiosInstance.delete(`/suppliers/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
