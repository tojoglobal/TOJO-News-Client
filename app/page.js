"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useApi from "./hooks/usePublicApi";
import LatestNews from "./Component/Home/LatestNews";
import MostReadNews from "./Component/Home/MostReadNews";
import PopularNews from "./Component/Home/PopularNews";

const HomePage = () => {
  const [youtubeVideo, setYoutubeVideo] = useState(null);
  const {
    data: latestUploads = [],
    error,
    loading,
  } = useApi("/api/admin/blogpost");

  // console.log(latestUploads?.Result);

  useEffect(() => {
    // Set YouTube video (replace with your YouTube API logic)
    setYoutubeVideo({
      title: "Watch Market Today",
      videoId: "dQw4w9WgXcQ",
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Component UI */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-3">Watch Market Today</h2>
            {youtubeVideo && (
              <iframe
                className="w-full h-48 rounded-lg"
                src={`https://www.youtube.com/embed/${youtubeVideo.videoId}`}
                title={youtubeVideo.title}
                allowFullScreen
              />
            )}
          </div>
          {/* Latest news */}
          <LatestNews />
          {/* Most read news */}
          <MostReadNews />
        </div>
        {/* right sidebar */}
        {/* Main Content */}
        <div className="md:col-span-9 space-y-6">
          {/* Poupler news slide News */}
          <PopularNews />
          {/* Advertisement Banner */}
          <div className="bg-purple-600 text-white text-center py-6 rounded-lg">
            Advertisements
          </div>
          {/* Most Popular (Random Recommendation) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {latestUploads.map((news) => (
              <div key={news.id} className="bg-white rounded-lg shadow-md">
                <Image
                  src={news.image}
                  alt={news.title}
                  width={400}
                  height={250}
                  className="rounded-t-lg"
                />
                <div className="p-4">
                  <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                    {news.category}
                  </span>
                  <h3 className="text-lg font-bold mt-2">{news.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{news.date}</p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
