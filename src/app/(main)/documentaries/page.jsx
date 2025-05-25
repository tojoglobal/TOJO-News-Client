"use client";
import Image from "next/image";
import logo from "@/public/Documentaries.jpg";
import { IoMdPlay } from "react-icons/io";
import CatchUpFeatured from "./CatchUpFeatured";

const featuredNews = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
  },
  {
    id: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
  },
  {
    id: 5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
  },
  {
    id: 6,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
  },
];

export default function Documentaries() {
  return (
    <div className="min-h-screen mb-16">
      {/* Hero Section */}
      <div className="relative h-[450px] md:h-[600px] w-full overflow-hidden">
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
        <div className="absolute top-48 md:top-56 inset-0 flex flex-col justify-center container mx-auto px-4 sm:px-6">
          <h1 className="text-xl md:text-3xl text-royal-indigo font-bold mb-1 sm:mb-4">
            <span>TOP 5 Crypto Conference</span>
            <br className="hidden md:block" />
            in 2025
          </h1>
          <p className="text-royal-indigo max-w-md text-sm sm:text-base mb-3 sm:mb-8">
            The world of cryptocurrency and blockchain has transformed the way
            we think about money, technology, and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="bg-royal-indigo text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full flex items-center justify-center gap-2 hover:bg-purple-600 transition-all duration-300 text-sm sm:text-base">
              <IoMdPlay className="text-white" /> WATCH NOW
            </button>
            <button className="text-royal-indigo border border-royal-indigo px-6 py-2 sm:px-8 sm:py-3 rounded-full hover:bg-white/20 transition-all duration-300 text-sm sm:text-base">
              EXPLORE THE SHOW
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 sm:py-12 px-3 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-royal-indigo mb-3">
          Featured News
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {featuredNews.map((item) => (
            <div
              key={item.id}
              className="relative w-full h-40 sm:h-64 group overflow-hidden rounded-md"
            >
              <Image
                src={item.image}
                alt={`Featured news ${item.id}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-royal-indigo mt-8 sm:mt-12 mb-3">
          Continue Watching
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {featuredNews.map((item) => (
            <div
              key={item.id}
              className="relative w-full h-40 sm:h-64 group overflow-hidden rounded-md"
            >
              <Image
                src={item.image}
                alt={`Featured news ${item.id}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
      <CatchUpFeatured />
    </div>
  );
}
