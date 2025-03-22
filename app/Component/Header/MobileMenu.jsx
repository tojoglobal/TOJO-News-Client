"use client";
import { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-royal-indigo text-lg font-semibold"
      >
        <MenuIcon />
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full shadow"
        >
          <X className="h-6 w-6 text-royal-indigo" />
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col items-center justify-center h-full space-y-6 text-lg font-medium text-royal-indigo">
          {[
            "News",
            "Prices",
            "Documentaries",
            "Newsletters",
            "Sponsored",
            "Events",
          ].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="hover:text-purple-700 transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
