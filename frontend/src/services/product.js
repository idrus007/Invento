import axiosInstance from "../utils/axiosInstance";

export const getProducts = async () => {
  try {
    const res = await axiosInstance.get("/products");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createProduct = async (payload) => {
  try {
    const res = await axiosInstance.post("/products", payload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (id, payload) => {
  try {
    const res = await axiosInstance.put(`/products/${id}`, payload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axiosInstance.delete(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
