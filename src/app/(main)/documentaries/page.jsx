"use client";
import Image from "next/image";
import axios from "axios";
import { IoMdPlay } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import FeaturedContinue from "./FeaturedContinue";

const fetchHero = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/documentaries-hero`
  );
  return data;
};

export default function Documentaries() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Hero data
  const {
    data: hero,
    isLoading: heroLoading,
    isError: heroError,
  } = useQuery({
    queryKey: ["documentaries-hero"],
    queryFn: fetchHero,
  });

  if (heroLoading) return <div>Loading...</div>;
  if (heroError || !hero) return <div>Error loading hero section.</div>;

  return (
    <div className="min-h-screen mb-2">
      {/* Hero Section */}
      <div className="relative h-[450px] md:h-[600px] w-full overflow-hidden">
        <Image
          src={`${apiBase}/Images/${hero?.logo}`}
          alt="Crypto Conference"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.05) 45%),
              linear-gradient(-45deg, transparent 45%, rgba(255,255,255,0.05) 45%),
              linear-gradient(to right, rgba(255,255,255,0.1), rgba(0,31,63,0.3))
            `,
            backgroundSize: "100px 100px, 100px 100px, 100% 100%",
          }}
        />
        <div className="absolute top-48 md:top-56 inset-0 flex flex-col justify-center container mx-auto px-4 md:px-0">
          <h1 className="text-xl md:text-3xl text-royal-indigo font-bold mb-1 sm:mb-4">
            {hero.heading}
          </h1>
          <p className="text-royal-indigo max-w-md text-sm sm:text-base mb-3 sm:mb-8">
            {hero.description}
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
      <FeaturedContinue />
    </div>
  );
}
