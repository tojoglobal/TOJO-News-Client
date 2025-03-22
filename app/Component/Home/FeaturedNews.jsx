import React, { useMemo } from "react";
import Image from "next/image";
import useApi from "@/app/hooks/usePublicApi";
import DateAndTime from "../RecalcFunction/DateAndTime";
import Author from "../RecalcFunction/Author";
import FeaturedSkeleton from "./HomeSkeleton/FeaturedSkeleton";

const FeaturedNews = () => {
  const { data: latestUploads, error, loading } = useApi("/api/admin/blogpost");

  // select 4 random articals
  const featuredArticles = useMemo(() => {
    if (!Array.isArray(latestUploads) || latestUploads.length === 0) return [];
    return [...latestUploads] // Create a copy to avoid mutating state
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, 6); // Pick first 4 articles
  }, [latestUploads]);

  if (loading) return <FeaturedSkeleton count={6} />;

  if (error)
    return <p className="text-gray-500 text-sm">No featured news available.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {featuredArticles.map((news) => (
        <div key={news?.ID} className="rounded-lg flex flex-col h-full">
          {/* Image */}
          <div className="w-full relative aspect-[1.81/1]">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${news?.thumble}`}
              alt={news?.title}
              fill
              className="rounded-lg object-cover"
            />
            {/* Category Tag */}
            <span className="bg-royal-indigo text-white text-xs px-2 py-1 rounded-md font-medium absolute bottom-1 left-1">
              {news?.category || "Crypto"}
            </span>
          </div>

          {/* Content */}
          <div className="pt-3 flex flex-col h-full">
            {/* Title (Flexible height) */}
            <h3 className="text-2xl font-bold text-royal-indigo mt-2 font-poppins flex-grow">
              {news.title}
            </h3>

            {/* Date & Author (Always at bottom) */}
            <p className="text-sm text-royal-indigo mt-auto flex items-center flex-grow">
              <DateAndTime dateAndTime={news?.dateAndTime} /> by{" "}
              <span className="font-semibold">
                <Author
                  author1={news?.author1_id}
                  author2={news?.author2_id}
                  showSingle={true}
                />
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedNews;
