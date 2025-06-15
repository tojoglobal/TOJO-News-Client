"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFeaturedNews = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/featured-this-week`
  );
  return data;
};

const FeaturedThisWeek = () => {
  const {
    data: featuredNews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featuredNews"],
    queryFn: fetchFeaturedNews,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load.</div>;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-[#5E17EB] mb-3 sm:mb-4 mt-12">
        Featured This Week
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {featuredNews.map((news) => (
          <a
            key={news.id}
            href={news.link}
            className="flex items-center space-x-2 sm:space-x-3 group hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-20 sm:w-28 h-16 sm:h-20 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${news.image}`}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-[#5E17EB] text-xs sm:text-sm font-medium flex-1 line-clamp-2">
              {news.title}
            </h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedThisWeek;
