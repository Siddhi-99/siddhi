import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .refine((email) => email.endsWith("@pccoer.in"), {
      message: "Only @pccoer.in emails are allowed",
    }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const AdminSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signupAdmin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await signupAdmin(data.name, data.email, data.password);
      
      if (result.success) {
        alert("Admin account created successfully! 🎉");
        navigate("/admin/admin-login", { replace: true });
      } else {
        setError(result.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">Admin Sign Up</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-600">Full Name</label>
              <input
                {...register("name")}
                type="text"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter your full name"
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-gray-600">Admin Email</label>
              <input
                {...register("email")}
                type="email"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="admin@pccoer.in"
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-gray-600">Password</label>
              <input
                {...register("password")}
                type="password"
                className={`w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Enter password"
                required
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center">
            Already have an admin account?{" "}
            <Link to="/admin/login" className="text-blue-500 font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSignup;
