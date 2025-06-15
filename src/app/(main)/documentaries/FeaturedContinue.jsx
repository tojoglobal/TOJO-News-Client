"use client";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BsPlayCircle } from "react-icons/bs";
import axios from "axios";
import YouTubeModal from "./YouTubeModal";
import FeaturedThisWeek from "./FeaturedThisWeek";

// Helper to extract YouTube video ID from URL
function extractYouTubeId(url) {
  if (!url) return "";
  const regExp =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

const FeaturedContinue = () => {
  const [openVideo, setOpenVideo] = useState(null);

  // React Query fetch
  const { data: documentariesFeatured = [], isLoading } = useQuery({
    queryKey: ["documentaries-featured"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/documentaries-featured`
      );
      return res?.data;
    },
  });

  // Filter for featured and continue
  const featuredNews = useMemo(
    () =>
      documentariesFeatured.filter(
        (item) =>
          item.show_in &&
          item.show_in
            .split(",")
            .map((v) => v.trim())
            .includes("featured")
      ),
    [documentariesFeatured]
  );

  const continueWatching = useMemo(
    () =>
      documentariesFeatured.filter(
        (item) =>
          item.show_in &&
          item.show_in
            .split(",")
            .map((v) => v.trim())
            .includes("continue")
      ),
    [documentariesFeatured]
  );

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-royal-indigo mb-3">
        Featured News
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {(isLoading ? Array.from({ length: 5 }) : featuredNews).map(
          (item, idx) =>
            isLoading ? (
              <div
                key={idx}
                className="animate-pulse bg-gray-200 rounded-md w-full h-40"
              />
            ) : (
              <div
                key={item.id}
                className="relative w-full h-44 group overflow-hidden rounded-md cursor-pointer"
                onClick={() => setOpenVideo(item.youtube_url)}
              >
                <img
                  src={`https://img.youtube.com/vi/${extractYouTubeId(
                    item.youtube_url
                  )}/hqdefault.jpg`}
                  alt={`Featured news ${item.id}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <BsPlayCircle size={40} color="#fff" />
                </div>
              </div>
            )
        )}
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-royal-indigo my-6">
        Continue Watching
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {(isLoading ? Array.from({ length: 5 }) : continueWatching).map(
          (item, idx) =>
            isLoading ? (
              <div
                key={idx}
                className="animate-pulse bg-gray-200 rounded-md w-full h-40"
              />
            ) : (
              <div
                key={item.id}
                className="relative w-full h-44 group overflow-hidden rounded-md cursor-pointer"
                onClick={() => setOpenVideo(item.youtube_url)}
              >
                <img
                  src={`https://img.youtube.com/vi/${extractYouTubeId(
                    item.youtube_url
                  )}/hqdefault.jpg`}
                  alt={`Continue Watching ${item.id}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <BsPlayCircle size={40} color="#fff" />
                </div>
              </div>
            )
        )}
      </div>
      <YouTubeModal
        openVideo={openVideo}
        setOpenVideo={setOpenVideo}
        maxWidth={900}
      />
      <FeaturedThisWeek />
    </div>
  );
};

export default FeaturedContinue;
