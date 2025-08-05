import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";
import {
  login as loginService,
  logout as logoutService,
} from "../services/user.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = Cookies.get("user");
    const savedToken = Cookies.get("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginService(email, password);
      const { token, user } = res.data;

      Cookies.set("token", token, { expires: 3 });
      Cookies.set("user", JSON.stringify(user), { expires: 3 });
      setUser(user);
      setToken(token);

      toast.success(`Selamat datang, ${user.name}`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login gagal");
      throw err;
    }
  };

  const logout = async () => {
    try {
      const res = await logoutService();
      const message = res.message;

      Cookies.remove("token");
      setUser(null);
      setToken(null);

      toast.success(message);
      navigate("/auth/sign-in");
    } catch (err) {
      const fallback = err?.response?.data?.message;
      toast.error(fallback);
      console.error(fallback);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
