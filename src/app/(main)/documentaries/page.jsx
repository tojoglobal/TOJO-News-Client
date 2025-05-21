"use client";
import Image from "next/image";
import logo from "../../../../public/Documentaries.jpg";
import { IoMdPlay } from "react-icons/io";
import FeaturedNews from "./FeaturedNews";
import CatchUp from "./CatchUp";

export default function Documentaries() {
  return (
    <div className="min-h-screen">
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
        <div className="absolute top-56 inset-0 flex flex-col justify-center container mx-auto">
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
      <FeaturedNews />
      <CatchUp />
    </div>
  );
}
