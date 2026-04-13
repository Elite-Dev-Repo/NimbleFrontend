import { LogIn } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Need this
import { Toaster, toast } from "sonner"; // Or your preferred toast lib
import api from "./api";
import { ACCESS, REFRESH } from "./constants";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false); // Added missing loading state

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const [signUpFormData, setSignUpFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isSignUp) {
      setSignUpFormData({ ...signUpFormData, [name]: value });
    } else {
      setLoginFormData({ ...loginFormData, [name]: value });
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Fixed naming: using isSignUp instead of isLogin
    const endpoint = isSignUp ? "/users/" : "/token/";

    // Correctly accessing nested data
    const payload = isSignUp
      ? signUpFormData
      : { username: loginFormData.username, password: loginFormData.password };

    try {
      localStorage.clear();
      const res = await api.post(endpoint, payload);

      if (!isSignUp) {
        // Login Logic
        localStorage.setItem(ACCESS, res.data.access);
        localStorage.setItem(REFRESH, res.data.refresh);
        toast.success("Login Successful!");
        navigate("/");
      } else {
        // Sign Up Logic
        toast.success("Account Created! Please Login.");
        setIsSignUp(false); // Switch to login view
      }
    } catch (error) {
      console.log(error);
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.username ||
        error.response?.data?.email ||
        "Something went wrong";
      toast.error(isSignUp ? errorMsg : "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative bg-[#f2f2f2] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Changed handleSubmit to handleAuth */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              placeholder="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={
                isSignUp ? signUpFormData.username : loginFormData.username
              }
              onChange={handleChange}
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required={isSignUp}
                placeholder="email@provider.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={signUpFormData.email}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={
                isSignUp ? signUpFormData.password : loginFormData.password
              }
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-primary transition"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-secondary font-semibold"
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
