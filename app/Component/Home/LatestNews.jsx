"use client";
import { useAxiospublic } from "@/app/hooks/useAxiospublic";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import LatestNewsSkeleton from "./HomeSkeleton/LatestNewsSkeleton";

const LatestNews = () => {
  const axiosPublicUrl = useAxiospublic();
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublicUrl
      .get("/api/getLatestNews")
      .then((res) => {
        setLatestNews(res.data.result || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching latest news:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading latest news...</p>;
  }

  // return <LatestNewsSkeleton />;

  return (
    <div>
      <div className="space-y-4">
        {latestNews.length > 0 ? (
          latestNews.map((news) => (
            <div
              key={news?.ID}
              className="flex flex-col items-start bg-gray-100 rounded-lg p-3 gap-3 shadow-md"
            >
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

              {/* Content */}
              <div className="flex-1">
                {/* Title */}
                <h3 className="text-sm font-semibold mt-2 leading-tight">
                  {news?.title}
                </h3>

                {/* Date */}
                <p className="text-xs text-gray-500 mt-1">
                  {news?.dateAndTime
                    ? format(new Date(news.dateAndTime), "MMM d, yyyy, hh:mm a")
                    : "No date available"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No latest news available.</p>
        )}
      </div>
    </div>
  );
};

export default LatestNews;
