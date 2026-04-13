import { LogIn } from "lucide-react";
import React, { useState } from "react";
import api from "./api";
import { ACCESS, REFRESH } from "./constants";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? "users/" : "token/";

    console.log(`Submitting to ${endpoint}`, formData);
    try {
      const response = await api.post(endpoint, formData);
      console.log("Response:", response.data);
      localStorage.setItem(ACCESS, response.data.access);
      localStorage.setItem(REFRESH, response.data.refresh);
      window.location.href = "/cart";
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative bg-[#f2f2f2] p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="absolute w-15 h-15 rounded-full flex items-center justify-center bg-[#f2f2f2] -top-18 border-4 border-primary left-1/2 right-1/2 translate-1/2 -translate-x-1/2">
          <LogIn className="w-7 h-7 text-secondary " />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username - Required for both */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              placeholder="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Email - Only show for Sign Up */}
          {isSignUp && (
            <div className="transition-all duration-300">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required={isSignUp}
                placeholder="email@provider.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Password - Required for both */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-primary hover:text-secondary transition duration-200"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-secondary font-semibold hover:underline"
            >
              {isSignUp ? "Login here" : "Sign up here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
