"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const UserAuth = () => {
  const { user, logoutUser, isLoading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("Logged out successfully!");
        setDropdownOpen(false);
      })
      .catch(() => {
        toast.error("Failed to log out. Please try again.");
      });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {isLoading == false && user ? (
        <div className="flex items-center gap-2">
          <div className="relative">
            <Image
              src={user?.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              width={30}
              height={30}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-gray-200/50 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              referrerPolicy="no-referrer"
            />

            {/* Dropdown Menu - Responsive positioning */}
            {dropdownOpen && (
              <div className="absolute -left-[68px] md:left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <span className="text-sm font-poppins font-medium hidden sm:block">
            {user?.displayName}
          </span>
        </div>
      ) : (
        // Show login and register buttons if no user is logged in
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="text-xs sm:text-sm font-poppins font-normal hover:text-gray-200 transition-colors"
          >
            Login
          </Link>
          <span className="text-xs sm:text-sm">|</span>
          <Link
            href="/register"
            className="text-xs sm:text-sm font-poppins font-normal hover:text-gray-200 transition-colors"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserAuth;
