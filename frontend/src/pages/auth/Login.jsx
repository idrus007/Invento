import React, { useState } from "react";
import { Button } from "../../components/ui/Button.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { Label } from "../../components/ui/Label.jsx";
import { KeyRound, LogIn, Mail } from "lucide-react";
import { Logo } from "../../components/ui/Logo.jsx";
import { useAuth } from "../../hooks/useAuth.js";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-gray-50">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center gap-4 bg-white">
          <div className="flex flex-col gap-4">
            <Logo />
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-gray-800">
                Sign In To Your Account
              </h2>
              <p className="text-sm text-gray-500">
                Please sign in with your email and password
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Mail size={15} />
                </span>
                <Input
                  type="email"
                  id="email"
                  placeholder="john@rhcp.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-8"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <KeyRound size={15} />
                </span>
                <Input
                  type="password"
                  id="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-8"
                />
              </div>
            </div>

            <div className="flex items-center justify-between -mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-gray-800 hover:text-black">
                Forgot your password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="flex w-full items-center justify-center py-2.5"
            >
              {loading ? (
                <>Signing in...</>
              ) : (
                <>
                  Sign In
                  <LogIn size={20} className="ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="hidden lg:block w-1/2 relative bg-blue-500">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='64' viewBox='0 0 48 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M48 28v-4L36 12 24 24 12 12 0 24v4l4 4-4 4v4l12 12 12-12 12 12 12-12v-4l-4-4 4-4zM8 32l-6-6 10-10 10 10-6 6 6 6-10 10L2 38l6-6zm12 0l4-4 4 4-4 4-4-4zm12 0l-6-6 10-10 10 10-6 6 6 6-10 10-10-10 6-6zM0 16L10 6 4 0h4l4 4 4-4h4l-6 6 10 10L34 6l-6-6h4l4 4 4-4h4l-6 6 10 10v4L36 8 24 20 12 8 0 20v-4zm0 32l10 10-6 6h4l4-4 4 4h4l-6-6 10-10 10 10-6 6h4l4-4 4 4h4l-6-6 10-10v-4L36 56 24 44 12 56 0 44v4z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundColor: "#2196f3",
              backgroundRepeat: "repeat",
            }}
          />
          <div className="relative z-10 flex h-full w-full flex-col items-start justify-end text-start p-8 text-white bg-indigo-700/20"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
