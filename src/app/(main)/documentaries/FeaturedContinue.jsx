import { useQuery } from "@tanstack/react-query";
import FeaturedThisWeek from "./FeaturedThisWeek";
import { useMemo } from "react";
import axios from "axios";
import Image from "next/image";

const FeaturedContinue = () => {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const fetchFeatured = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/documentaries-featured`
    );
    return data || [];
  };
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
  return (
    <div className="container mx-auto py-8 sm:py-12 px-3 sm:px-6">
      <h2 className="text-xl sm:text-2xl font-bold text-royal-indigo mb-3">
        Featured News
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
                className="relative w-full h-40 sm:h-68 group overflow-hidden rounded-md"
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
                className="relative w-full h-40 sm:h-68 group overflow-hidden rounded-md"
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
      {/* <CatchUpFeatured /> */}
      <FeaturedThisWeek />
    </div>
  );
};

export default FeaturedContinue;
