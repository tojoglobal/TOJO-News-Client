"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { AppContext } from "@/src/app/context/AppContext";
import Image from "next/image";
import { toast } from "react-toastify";

const UserAuth = () => {
  const { user, logoutUser, isLoading } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  return (
    <div className="relative">
      {isLoading == false && user ? (
        <div className="flex items-center gap-2">
          {/* Profile Image Clickable */}
          <div className="relative">
            <Image
              src={user?.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              width={30}
              height={30}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-gray-300/50 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              referrerPolicy="no-referrer"
            />

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md">
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

          {/* Display Name */}
          <span className="text-sm font-poppins font-medium hidden sm:block">
            {user?.displayName}
          </span>
        </div>
      ) : (
        // Show login and register buttons if no user is logged in
        <div className="flex items-center gap-2">
          <Link href="/login" className="text-sm font-poppins font-normal">
            Login
          </Link>
          <span>|</span>
          <Link href="/register" className="text-sm font-poppins font-normal">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserAuth;
