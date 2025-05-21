"use client";
import { useState } from "react";
import useAuth from "../(component)/hooks/useAuth";

const ProfilePage = () => {
  const { user, logoutUser, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-royal-indigo"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Please login to access your profile
        </h2>
        <a
          href="/login"
          className="inline-block bg-royal-indigo text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
        >
          Login
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl md:text-3xl text-gray-600">
                  {user.email?.[0].toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user.displayName || "TOJO News Reader"}
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={logoutUser}
              className="ml-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Newsletter Preferences Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Newsletter Preferences
          </h2>
          <div className="space-y-4">
            {[
              {
                id: "daily",
                label: "Daily News Digest",
                description:
                  "Get the top stories delivered to your inbox every morning",
              },
              {
                id: "weekly",
                label: "Weekly Roundup",
                description:
                  "A weekly summary of the most important news and analysis",
              },
              {
                id: "breaking",
                label: "Breaking News",
                description: "Instant alerts for major breaking news stories",
              },
              {
                id: "market",
                label: "Market Updates",
                description: "Daily updates on market trends and analysis",
              },
            ].map((preference) => (
              <div
                key={preference.id}
                className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-all"
              >
                <input
                  type="checkbox"
                  id={preference.id}
                  className="mt-1 h-5 w-5 text-royal-indigo rounded border-gray-300 focus:ring-royal-indigo"
                />
                <div>
                  <label
                    htmlFor={preference.id}
                    className="font-medium text-gray-900 block"
                  >
                    {preference.label}
                  </label>
                  <p className="text-gray-500 text-sm">
                    {preference.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 bg-royal-indigo text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
