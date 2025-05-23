"use client";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiClock, FiEye, FiBookmark } from "react-icons/fi";

const fetchNews = async (type) => {
  const axioPublicUrl = useAxiospublic();
  let endpoint = "";
  switch (type) {
    case "popular":
      endpoint = "/api/getMostPopulerViews";
      break;
    case "most-read":
      endpoint = "/api/getMostRead";
      break;
    default:
      endpoint = "/api/getLatestNews";
  }
  const { data } = await axioPublicUrl.get(endpoint);
  return data.result;
};

export default function News() {
  const [activeTab, setActiveTab] = useState("latest");

  const {
    data: news,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["news", activeTab],
    queryFn: () => fetchNews(activeTab),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <div className="max-w-7xl mx-auto py-5 mb-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          News & Updates
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Stay informed with our latest articles, popular stories, and most read
          content
        </p>
      </div>
      {/* Filter Tabs */}
      <div className="flex justify-center mb-8 border-b border-gray-200">
        <div className="flex space-x-1">
          {["latest", "popular", "most-read"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 cursor-pointer py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab
                  ? "bg-royal-indigo text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab === "latest" && "Latest"}
              {tab === "popular" && "Popular"}
              {tab === "most-read" && "Most Read"}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg h-80 animate-pulse"
            ></div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-12">
          <p className="text-red-500">
            Failed to load news. Please try again later.
          </p>
        </div>
      )}

      {/* News Grid */}
      {news && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <article
              key={item.ID}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <Link
                href={`/blog/${item.ID}/${item.title.replace(/\s+/g, "-")}`}
              >
                <div className="relative h-48">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${item.thumble}`}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded mb-2">
                    {item.category_id}
                  </span>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.subtitle}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <FiClock className="text-gray-400" />
                      <span>
                        {new Date(item.dateAndTime).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FiEye className="text-gray-400" />
                        <span>{item.view_count || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiBookmark className="text-gray-400" />
                        <span>{item.total_reading_time || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* Empty State */}
      {news && news.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No news articles found.</p>
        </div>
      )}
    </div>
  );
}
