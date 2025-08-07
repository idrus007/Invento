import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { ProtectedRoute } from "./middlewares/AuthMiddleware.jsx";
import ListCategories from "./pages/categories/Index.jsx";
import CreateCategory from "./pages/categories/Create.jsx";
import ListProducts from "./pages/products/Index.jsx";
import CreateProduct from "./pages/products/Create.jsx";
import EditCategory from "./pages/categories/Edit.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import EditProduct from "./pages/products/Edit.jsx";
import ListSuppliers from "./pages/suppliers/Index.jsx";
import CreateSupplier from "./pages/suppliers/Create.jsx";
import EditSupplier from "./pages/suppliers/Edit.jsx";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/auth/sign-in" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<ListCategories />} />
            <Route path="/categories/create" element={<CreateCategory />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route path="/products" element={<ListProducts />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/suppliers" element={<ListSuppliers />} />
            <Route path="/suppliers/create" element={<CreateSupplier />} />
            <Route path="/suppliers/edit/:id" element={<EditSupplier />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const Root = () => {
  const token = Cookies.get("token");
  return !token ? (
    <Navigate to="/auth/sign-in" replace />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default App;
