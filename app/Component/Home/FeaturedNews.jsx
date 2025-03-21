import React, { useMemo } from "react";
import Image from "next/image";
import useApi from "@/app/hooks/usePublicApi";

const FeaturedNews = () => {
  const { data: latestUploads, error, loading } = useApi("/api/admin/blogpost");

  // select 4 random articals
  const featuredArticles = useMemo(() => {
    if (!Array.isArray(latestUploads) || latestUploads.length === 0) return [];
    return [...latestUploads] // Create a copy to avoid mutating state
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, 8); // Pick first 4 articles
  }, [latestUploads]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {featuredArticles.map((news) => (
        <div key={news.ID} className="bg-white rounded-lg shadow-md">
          {/* <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${news?.thumble}`}
            alt={news.title}
            width={400}
            height={150}
            className="rounded-t-lg w-full h-fit"
          /> */}
          {/* Image */}
          <div className="w-full relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${news?.thumble}`}
              alt={news?.title}
              width={80}
              height={80}
              objectFit="cover"
              className="rounded-lg w-full"
            />
            {/* Category Tag */}
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-md font-medium absolute bottom-1 left-1">
              {news?.category || "Crypto"}
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold mt-2">{news.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{news.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedNews;
