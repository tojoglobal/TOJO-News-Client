"use client";
import { useAxiospublic } from "@/app/hooks/useAxiospublic";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LatestNewsSkeleton from "./HomeSkeleton/LatestNewsSkeleton";
import DateAndTime from "../RecalcFunction/DateAndTime";

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
    return <LatestNewsSkeleton count={4} />;
  }

  return (
    <div>
      <div className="space-y-4">
        {latestNews.length > 0 ? (
          latestNews.map((news) => (
            <div
              key={news?.ID}
              className="flex flex-col items-start rounded-lg  gap-3"
            >
              {/* Image */}
              <div className="w-full relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${news?.thumble}`}
                  alt={news?.title}
                  width={80}
                  height={70}
                  objectFit="cover"
                  className="rounded-lg w-full"
                />
                {/* Category Tag */}
                <span className="bg-royal-indigo text-white text-xs px-2 py-1 rounded-md font-medium absolute bottom-1 left-1">
                  {news?.category || "Crypto"}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 mb-2">
                {/* Title */}
                <h3 className="text-[16px] font-bold mt-1 leading-tight font-poppins text-royal-indigo">
                  {news?.title}
                </h3>

                {/* Date */}
                <p className="text-xs text-royal-indigo mt-1">
                  <DateAndTime dateAndTime={news?.dateAndTime} />
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
