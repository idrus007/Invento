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
