"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import useApi from "./hooks/usePublicApi";

const HomePage = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [mostRead, setMostRead] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [youtubeVideo, setYoutubeVideo] = useState(null);
  const [latestUploads, setLatestUploads] = useState([]);

  const { data, error, loading } = useApi("/api/admin/blogpost");

  console.log(data);

  useEffect(() => {
    // Fetch latest news
    axios.get("https://api.tojonews.com/latest-news").then((res) => {
      setLatestNews(res.data);
    });

    // Fetch most-read news
    axios.get("https://api.tojonews.com/most-read").then((res) => {
      setMostRead(res.data);
    });

    // Fetch random popular news
    axios.get("https://api.tojonews.com/popular-news").then((res) => {
      setPopularNews(res.data);
    });

    // Fetch latest uploads
    axios.get("https://api.tojonews.com/latest-uploads").then((res) => {
      setLatestUploads(res.data);
    });

    // Fetch YouTube video (replace with your YouTube API logic)
    setYoutubeVideo({
      title: "Watch Market Today",
      videoId: "dQw4w9WgXcQ",
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar - First Grid */}
        <div className="md:col-span-3 space-y-6">
          {/* Watch Market Today (YouTube Video) */}
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

          {/* Latest News */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-3">Latest News</h2>
            <div className="space-y-4">
              {latestNews.slice(0, 3).map((news) => (
                <div key={news.id} className="flex space-x-3">
                  <Image
                    src={news.image}
                    alt={news.title}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div>
                    <h3 className="text-sm font-semibold">{news.title}</h3>
                    <p className="text-xs text-gray-500">{news.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Read */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-3">Most Read</h2>
            <ul className="space-y-2">
              {mostRead.slice(0, 4).map((news) => (
                <li key={news.id} className="text-sm text-gray-700">
                  {news.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content - Second Grid */}
        <div className="md:col-span-9 space-y-6">
          {/* Last Uploaded News */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestUploads.map((news) => (
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
            ))}
          </div>

          {/* Advertisement Banner */}
          <div className="bg-purple-600 text-white text-center py-6 rounded-lg">
            Advertisements
          </div>

          {/* Most Popular (Random Recommendation) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularNews.map((news) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
