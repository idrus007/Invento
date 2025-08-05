import axiosInstance from "../utils/axiosInstance";

export const login = async (email, password) => {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const res = await axiosInstance.get("/auth/profile");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
