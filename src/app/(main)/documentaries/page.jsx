"use client";

import Image from "next/image";
import logo from "../../../../public/Documentaries.jpg";
import { IoMdPlay } from "react-icons/io";

export default function Documentaries() {
  // Fake data for featured news
  const featuredNews = [
    { id: 1, image: "/featured/bitcoin1.jpg", title: "Bitcoin Trends" },
    { id: 2, image: "/featured/crypto1.jpg", title: "Crypto Analysis" },
    { id: 3, image: "/featured/chart1.jpg", title: "Market Growth" },
    { id: 4, image: "/featured/eth1.jpg", title: "Ethereum Updates" },
    { id: 5, image: "/featured/market1.jpg", title: "Trading Insights" },
    { id: 6, image: "/featured/2025.jpg", title: "2025 Forecast" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001F3F] to-[#000C1A]">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src={logo}
          alt="Crypto Conference"
          fill
          className="object-cover"
          priority
        />

        {/* Geometric Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 45%, rgba(255, 255, 255, 0.05) 45%),
              linear-gradient(-45deg, transparent 45%, rgba(255, 255, 255, 0.05) 45%),
              linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(0, 31, 63, 0.3))
            `,
            backgroundSize: "100px 100px, 100px 100px, 100% 100%",
          }}
        />

        {/* Content */}
        <div className="absolute top-56 inset-0 flex flex-col justify-center px-12 max-w-7xl mx-auto">
          <h1 className="text-3xl text-royal-indigo font-bold mb-4">
            <span>TOP 5 Crypto Conference</span>
            <br />
            in 2025
          </h1>
          <p className="text-royal-indigo max-w-md mb-8">
            The world of cryptocurrency and blockchain has transformed the way
            we think about money, technology, and innovation.
          </p>
          <div className="flex gap-4">
            <button className="bg-royal-indigo text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-purple-600 transition-all duration-300">
              <IoMdPlay className="text-white" /> WATCH NOW
            </button>
            {/* bg-white/10 backdrop-blur-sm */}
            <button className="text-royal-indigo border border-royal-indigo px-8 py-3 rounded-full hover:bg-white/20 transition-all duration-300">
              EXPLORE THE SHOW
            </button>
          </div>
        </div>
      </div>
      {/* Featured News Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-royal-indigo mb-8">
          Featured News
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredNews.map((item) => (
            <div
              key={item.id}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-3">
                <h3 className="text-white text-sm font-medium">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
