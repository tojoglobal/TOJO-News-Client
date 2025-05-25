"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/src/components/hooks/useAuth";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";

const Registration = () => {
  const { RegisterUser, setUser, loginWithGoogle } = useAuth();
  const axiosPublic = useAxiospublic();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const minLength = 6;
    const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;

    if (!specialCharacter.test(password)) {
      return "Password must contain at least one special character.";
    }
    if (!uppercase.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!lowercase.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (password.length < minLength) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const passwordValidationMessage = validatePassword(password);

    if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage);
      toast.error(passwordValidationMessage);
      return;
    }

    try {
      const userCredential = await RegisterUser(email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photoUrl,
      });

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: name,
        photoURL: photoUrl,
      };

      const response = await axiosPublic.post("/api/register", userData);
      if (response.status === 201 && response.data.newUser) {
        setUser(response.data.newUser);
        toast.success("Registration successful!");
        router.push("/");
      } else if (response.data.existingUser) {
        setUser(response.data.existingUser);
        toast.info("Welcome back! You are already registered.");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please login.");
      }
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const userCredential = await loginWithGoogle();
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      const response = await axiosPublic.post("/api/register", userData);
      if (response.status === 201 && response.data.newUser) {
        setUser(response.data.newUser);
        toast.success("Google account registered successfully!");
        router.push("/");
      } else if (response.data.existingUser) {
        setUser(response.data.existingUser);
        toast.info("Welcome back! You are already registered.");
        router.push("/");
      }
    } catch (error) {
      toast.error("Google registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 md:px-4 py-8 bg-white dark:bg-gray-900">
      <div className="w-full max-w-md p-3 md:p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          User Registration
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />
          </div>

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

          {/* Photo URL Field */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
              Photo URL
            </label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Enter your photo URL"
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
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
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
            {passwordError && (
              <p className="text-red-600 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          {/* Register Button */}
          <button
            type="submit"
            className="w-full cursor-pointer py-3 bg-gradient-to-r from-[#031741] via-[#03d2fc] to-[#022d33] text-white font-bold rounded-lg hover:opacity-90 transition duration-300"
          >
            Register
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-3 text-gray-500 dark:text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        {/* Google register Button */}
        <button
          onClick={handleGoogleRegister}
          className="w-full py-3 cursor-pointer bg-[#031741] text-white font-bold rounded-lg hover:bg-[#0e1422] transition duration-300 flex gap-3 justify-center items-center"
        >
          <FaGoogle /> Continue with Google
        </button>
        {/* Login Link */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 dark:text-teal-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
