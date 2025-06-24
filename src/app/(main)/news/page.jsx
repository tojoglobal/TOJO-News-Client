"use client";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiClock, FiEye } from "react-icons/fi";
import GetView from "../blog/[id]/[title]/(BLogComponent)/GetView";
import NewsSkeleton from "@/src/components/Home/HomeSkeleton/NewsSkeleton";

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

const pageSizeOptions = [4, 8, 12];

export default function News() {
  const [activeTab, setActiveTab] = useState("latest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const {
    data: news,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["news", activeTab],
    queryFn: () => fetchNews(activeTab),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Pagination logic
  const totalItems = news ? news.length : 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Calculate items for current page
  const paginatedNews = news
    ? news.slice((page - 1) * pageSize, page * pageSize)
    : [];

  // Pagination controls
  const canPrev = page > 1;
  const canNext = page < totalPages;

  // Handlers
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1); // reset to first page when tab changes
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1); // reset to first page when page size changes
  };

  const goToFirst = () => setPage(1);
  const goToPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const goToLast = () => setPage(totalPages);

  return (
    <div className="container 2xl:max-w-[1370px] mx-auto mb-10 mt-5">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
          News & Updates
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Stay informed with our latest articles, popular stories, and most read
          content
        </p>
      </div>
      {/* Filter Tabs */}
      <div className="flex justify-center mb-8 border-b border-gray-150">
        <div className="flex space-x-1">
          {["latest", "popular", "most-read"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-3 md:px-4 cursor-pointer py-2 text-sm font-medium rounded-t-lg transition-colors ${
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
      {/* Page size selector */}
      <div className="flex justify-between items-center mb-4 px-2 md:px-0">
        <div>
          <label className="mr-2 text-sm text-gray-600">Show:</label>
          <select
            className="border cursor-pointer focus:outline-none rounded px-2 py-1 text-sm"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className="text-xs text-gray-500">
            Page {page} of {totalPages || 1}
          </span>
        </div>
      </div>
      {/* Loading State */}
      {isLoading && (
        <div className="mx-2 md:mx-0">
          <NewsSkeleton count={pageSize} />
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
      {paginatedNews && paginatedNews.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-2 md:mx-0">
          {paginatedNews.map((item) => (
            <article
              key={item.ID}
              className="bg-white rounded-md md:rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <Link
                href={`/blog/${item.ID}/${item.title.replace(/\s+/g, "-")}`}
              >
                <div className="relative aspect-[1.5/1] md:aspect-[1.65/1]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${item.thumble}`}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-2xl mb-2 line-clamp-2">
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
                        <GetView blogId={item.ID} />
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
      {paginatedNews && paginatedNews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No news articles found.</p>
        </div>
      )}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={goToFirst}
            disabled={!canPrev}
            className={`px-2 py-1 cursor-pointer border rounded disabled:opacity-50`}
            aria-label="First Page"
          >
            {"<<"}
          </button>
          <button
            onClick={goToPrev}
            disabled={!canPrev}
            className={`px-2 py-1 cursor-pointer border rounded disabled:opacity-50`}
            aria-label="Previous Page"
          >
            {"<"}
          </button>
          {/* Show page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
            // Show only first, last, current, and neighbors
            if (num === 1 || num === totalPages || Math.abs(num - page) <= 1) {
              return (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-2 cursor-pointer py-1 border rounded ${
                    page === num
                      ? "bg-royal-indigo text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {num}
                </button>
              );
            } else if (num === page - 2 || num === page + 2) {
              return (
                <span key={num} className="px-2 py-1">
                  ...
                </span>
              );
            }
            return null;
          })}
          <button
            onClick={goToNext}
            disabled={!canNext}
            className={`px-2 py-1 border cursor-pointer rounded disabled:opacity-50`}
            aria-label="Next Page"
          >
            {">"}
          </button>
          <button
            onClick={goToLast}
            disabled={!canNext}
            className={`px-2 py-1 border cursor-pointer rounded disabled:opacity-50`}
            aria-label="Last Page"
          >
            {">>"}
          </button>
        </div>
      )}
    </div>
  );
}
