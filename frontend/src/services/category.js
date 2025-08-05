import axiosInstance from "../utils/axiosInstance";

export const getCategories = async () => {
  try {
    const res = await axiosInstance.get("/categories");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCategory = async (payload) => {
  try {
    const res = await axiosInstance.post("/categories", payload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const res = await axiosInstance.get(`/categories/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCategory = async (id, payload) => {
  try {
    const res = await axiosInstance.put(`/categories/${id}`, payload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await axiosInstance.delete(`/categories/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
