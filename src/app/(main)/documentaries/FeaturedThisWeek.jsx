"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BsPlayCircle } from "react-icons/bs";
import YouTubeModal from "./YouTubeModal";

// Helper to extract YouTube video ID from URL
function extractYouTubeId(url) {
  if (!url) return "";
  const regExp =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

const fetchFeaturedNews = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/featured-this-week`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return await res.json();
};

const FeaturedThisWeek = () => {
  const [openVideo, setOpenVideo] = useState(null);

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
      <h2 className="text-xl sm:text-2xl font-bold text-[#5E17EB] mb-3 sm:mb-4 mt-6 md:mt-12">
        Featured This Week
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {featuredNews?.map((news) => {
          const youtubeId = extractYouTubeId(news.youtube_url);
          return (
            <div
              key={news.id}
              className="flex items-center space-x-2 sm:space-x-3 group hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => setOpenVideo(news.youtube_url)}
            >
              <div className="w-20 sm:w-28 h-16 sm:h-20 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden relative">
                <img
                  src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <BsPlayCircle size={36} color="#fff" />
                </div>
              </div>
              <h3 className="text-[#5E17EB] capitalize text-xs sm:text-sm font-medium flex-1 line-clamp-2">
                {news.title}
              </h3>
            </div>
          );
        })}
      </div>
      <YouTubeModal
        openVideo={openVideo}
        setOpenVideo={setOpenVideo}
        maxWidth={800}
      />
    </div>
  );
};

export default FeaturedThisWeek;
