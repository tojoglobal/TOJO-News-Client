import React from "react";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <nav>
      <div className="h-[55px] flex justify-center items-center bg-light-gray w-full mx-auto px-4 sm:px-6 lg:px-16">
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
              <span className="text-royal-indigo font-medium cursor-pointer hover:underline">
                {item}
              </span>
            </Link>
          ))}
        </div>
        {/* Mobile Navigation */}
        <div className="block sm:hidden">
          <div className="flex items-center gap-4">
            <span className="text-sm font-poppins">For Daily News</span>
            <button className="bg-royal-indigo text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-800 transition">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
