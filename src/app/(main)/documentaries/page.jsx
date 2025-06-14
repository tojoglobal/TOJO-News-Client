"use client";
import { useMemo } from "react";
import Image from "next/image";
import axios from "axios";
import { IoMdPlay } from "react-icons/io";
import CatchUpFeatured from "./CatchUpFeatured";
import { useQuery } from "@tanstack/react-query";

const fetchHero = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/documentaries-hero`
  );
  return data;
};

const fetchFeatured = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/documentaries-featured`
  );
  return data || [];
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

  // Featured/Continue Watching
  const { data: documentariesFeatured = [], isLoading: featuredLoading } =
    useQuery({
      queryKey: ["documentaries-featured"],
      queryFn: fetchFeatured,
    });

  // Memoize filtering for performance
  const featuredNews = useMemo(
    () =>
      documentariesFeatured.filter(
        (item) => item.show_in && item.show_in.includes("featured")
      ),
    [documentariesFeatured]
  );
  const continueWatching = useMemo(
    () =>
      documentariesFeatured.filter(
        (item) => item.show_in && item.show_in.includes("continue")
      ),
    [documentariesFeatured]
  );

  if (heroLoading) return <div>Loading...</div>;
  if (heroError || !hero) return <div>Error loading hero section.</div>;

  return (
    <div className="min-h-screen mb-16">
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
        <div className="absolute top-48 md:top-56 inset-0 flex flex-col justify-center container mx-auto px-4 sm:px-6">
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
      <div className="container mx-auto py-8 sm:py-12 px-3 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-royal-indigo mb-3">
          Featured News
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {(featuredLoading ? Array.from({ length: 6 }) : featuredNews).map(
            (item, idx) =>
              featuredLoading ? (
                <div
                  key={idx}
                  className="animate-pulse bg-gray-200 rounded-md w-full h-40 sm:h-72"
                />
              ) : (
                <a
                  key={item.id}
                  href={item.link}
                  className="relative w-full h-40 sm:h-72 group overflow-hidden rounded-md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`${apiBase}/Images/${item.image}`}
                    alt={`Featured news ${item.id}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </a>
              )
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-royal-indigo mt-8 sm:mt-12 mb-3">
          Continue Watching
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {(featuredLoading ? Array.from({ length: 6 }) : continueWatching).map(
            (item, idx) =>
              featuredLoading ? (
                <div
                  key={idx}
                  className="animate-pulse bg-gray-200 rounded-md w-full h-40 sm:h-72"
                />
              ) : (
                <a
                  key={item.id}
                  href={item.link}
                  className="relative w-full h-40 sm:h-72 group overflow-hidden rounded-md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`${apiBase}/Images/${item.image}`}
                    alt={`Continue watching ${item.id}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </a>
              )
          )}
        </div>
      </div>
      <CatchUpFeatured />
    </div>
  );
}
