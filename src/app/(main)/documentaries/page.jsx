"use client";
import Image from "next/image";
import axios from "axios";
import { IoMdPlay } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import FeaturedContinue from "./FeaturedContinue";
import GlobalLoading from "@/src/components/GlobalLoading";

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
    isLoading,
    isError: heroError,
  } = useQuery({
    queryKey: ["documentaries-hero"],
    queryFn: fetchHero,
  });

  if (isLoading) return <GlobalLoading />;
  if (heroError || !hero) return <div>Error loading hero section.</div>;

  return (
    <div className="min-h-screen mb-2">
      {/* Hero Section */}
      <div className="relative h-[320px] sm:h-[400px] md:h-[450px] lg:h-[600px] w-full overflow-hidden">
        <Image
          src={`${apiBase}/Images/${hero?.logo}`}
          alt="Crypto Conference"
          fill
          className="object-cover"
          priority
          sizes="100vw"
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
        <div
          className="
          absolute
          top-24 sm:top-36 md:top-48 lg:top-56
          inset-0 flex flex-col justify-center
          container 2xl:max-w-[1370px] mx-auto
          px-3 md:px-6 lg:px-0
        "
        >
          <h1
            className="
            text-base sm:text-lg md:text-2xl lg:text-3xl
            text-royal-indigo font-bold
            mb-1 md:mb-4
          "
          >
            {hero.heading}
          </h1>
          <p
            className="
            text-royal-indigo
            max-w-xs sm:max-w-md
            text-xs sm:text-sm md:text-base
            mb-2 md:mb-8
          "
          >
            {hero.description}
          </p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-fit">
            <button
              className="
              bg-royal-indigo text-white
              px-4 py-2 md:px-8 md:py-3
              rounded-full flex items-center justify-center gap-2
              hover:bg-purple-600 transition-all duration-300
              text-xs sm:text-sm md:text-base
              w-full md:w-auto
            "
            >
              <IoMdPlay className="text-white" /> WATCH NOW
            </button>
            <button
              className="
              text-royal-indigo border border-royal-indigo
              px-4 py-2 md:px-8 md:py-3
              rounded-full hover:bg-white/20 transition-all duration-300
              text-xs sm:text-sm md:text-base
              w-full md:w-auto
            "
            >
              EXPLORE THE SHOW
            </button>
          </div>
        </div>
      </div>
      <FeaturedContinue />
    </div>
  );
}
