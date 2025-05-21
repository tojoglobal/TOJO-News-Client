"use client";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AppContext } from "../(component)/context/AppContext";
import { useAxiospublic } from "../(component)/hooks/useAxiospublic";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser, setUser, loginWithGoogle } = useContext(AppContext);
  const axiosPublic = useAxiospublic();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const location = usePathname();

  // Get the desired route or default to home page
  const from = location.state?.from?.pathname || "/";

  //   handle login from
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Validate input
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    // Attempt to log in the user with email and password
    try {
      await loginUser(email, password).then((userCredential) => {
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
        setIsLoading(false);
      });
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
    <div className="flex items-center justify-center bg-gray-100 px-4 py-10 mb-3 dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          User Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 dark:text-white font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full dark:border-gray-600 dark:bg-gray-700  px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="dark:text-white block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full dark:border-gray-600 dark:bg-gray-700  px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
              required
            />
            <div
              className="absolute right-3 top-11 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-600 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer py-3 bg-gradient-to-r from-[#031741] via-[#03d2fc] to-[#022d33] text-white font-bold rounded-lg hover:bg-gradient-to-r transition duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 dark:text-white">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full cursor-pointer py-3 bg-[#031741] text-white font-bold rounded-lg  transition duration-300 flex gap-3 justify-center items-center"
        >
          <FaGoogle /> Continue with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6 dark:text-white">
          Don&lsquo;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 dark:text-teal-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
