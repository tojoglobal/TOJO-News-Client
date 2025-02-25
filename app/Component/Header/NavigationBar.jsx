"use client";
import React, { useState } from "react";
import Link from "next/link";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center gap-8 h-11">
          {[
            "News",
            "Prices",
            "Documentaries",
            "Newsletters",
            "Sponsored",
            "Events",
          ].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`}>
              <span className="text-purple-700 font-medium cursor-pointer hover:underline">
                {item}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center h-11">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-purple-700 text-lg font-semibold"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center bg-gray-50 shadow-md py-4 space-y-2">
            {[
              "News",
              "Prices",
              "Documentaries",
              "Newsletters",
              "Sponsored",
              "Events",
            ].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}>
                <span
                  onClick={() => setIsOpen(false)}
                  className="text-purple-700 font-medium cursor-pointer hover:underline"
                >
                  {item}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
