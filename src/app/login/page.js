"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/src/components/hooks/useAuth";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";

const Login = () => {
  const { loginUser, setUser, loginWithGoogle } = useAuth();
  const axiosPublic = useAxiospublic();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const location = usePathname();

  // Get the desired route or default to home page
  const from = location.state?.from?.pathname || "/";

  //   handle login from
  const handleLogin = (e) => {
    e.preventDefault();
    // Validate input
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    // Attempt to log in the user with email and password
    loginUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "No Name",
          photoURL: user.photoURL || "https://via.placeholder.com/150",
        };
        setUser(userData);
        localStorage.setItem("authToken", user.accessToken);
        toast.success("Login successful!");
        router.push(from, { replace: true });
      })
      .catch((error) => {
        // Handle errors based on Firebase error codes
        const errorMessage = error.code;
        if (errorMessage === "auth/user-not-found") {
          toast.error("User not found. Please check the email.");
        } else if (errorMessage === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else if (errorMessage === "auth/invalid-email") {
          toast.error("Invalid email format.");
        } else {
          toast.error("Login failed. Please try again.");
        }
      });
  };

  const handleGoogleLogin = async () => {
    try {
      // Log in with Google
      const userCredential = await loginWithGoogle();
      const user = userCredential?.user;

      // Extract user data
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      console.log(userData);

      // Send user data to the server for registration/check
      const response = await axiosPublic.post("/api/register", userData);

      if (response.status === 201 && response.data.newUser) {
        // New user registered
        setUser(response.data.newUser);
        toast.success("Google account registered successfully!");
      } else if (response.data.existingUser) {
        // User already exists
        setUser(response.data.existingUser);
        toast.success("Login successful!");
      }

      // Redirect user after successful login
      router.push(from || "/", { replace: true });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please login.");
      } else {
        toast.error("Google login failed!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 md:px-4 py-8 bg-white dark:bg-gray-900">
      <div className="w-full max-w-md p-3 md:p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />
          </div>
          {/* Password Field */}
          <div className="relative">
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white pr-10"
              required
            />
            <button
              type="button"
              className="absolute cursor-pointer right-3 top-11 text-gray-500 dark:text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full cursor-pointer py-3 bg-gradient-to-r from-[#031741] via-[#03d2fc] to-[#022d33] text-white font-bold rounded-lg hover:opacity-90 transition duration-300"
          >
            Login
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-3 text-gray-500 dark:text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full cursor-pointer py-3 bg-[#031741] text-white font-bold rounded-lg hover:bg-[#0e1422] transition duration-300 flex gap-3 justify-center items-center"
        >
          <FaGoogle /> Continue with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 dark:text-teal-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
