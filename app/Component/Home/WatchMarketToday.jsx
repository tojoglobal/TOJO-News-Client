"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MarketSkeleton from "./HomeSkeleton/MarketSkeleton";

const WatchMarketToday = () => {
  const [latestVideoId, setLatestVideoId] = useState("");
  const [latestVideoUrl, setLatestVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [latestVideoTitle, setLatestVideoTitle] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  // YouTube Video Data
  useEffect(() => {
    const cachedVideo = localStorage.getItem("latestVideo");
    if (cachedVideo) {
      const { id, title, thumbnail } = JSON.parse(cachedVideo);
      setLatestVideoId(id);
      setLatestVideoTitle(title);
      setThumbnailUrl(thumbnail);
      setLoading(false);
    } else {
      fetchLatestVideo();
    }
  }, []);
  // Fetch latest video data when component mounts or when latest video in localStorage changes
  const fetchLatestVideo = async () => {
    try {
      const API_KEY = "AIzaSyANo2qrDnEzB68qkNvUH_D4ufpIESoZQ_Y";
      const CHANNEL_ID = "UCsgyweRgipGDhwD-3HA-IVA";
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${CHANNEL_ID}&maxResults=1&key=${API_KEY}`
      );
      if (response.data.items.length > 0) {
        const video = response.data.items[0];
        const latestVideoId = video?.id.videoId;
        setLatestVideoId(latestVideoId);
        setLatestVideoUrl(
          `https://www.youtube.com/embed/${latestVideoId}?autoplay=1`
        );
        setThumbnailUrl(
          `https://img.youtube.com/vi/${latestVideoId}/hqdefault.jpg`
        );
        setLatestVideoTitle(video.snippet.title);
        setLoading(false);
        // Cache in localStorage
        localStorage.setItem(
          "latestVideo",
          JSON.stringify({
            id: latestVideoId,
            title: video.snippet.title,
            thumbnail: `https://img.youtube.com/vi/${latestVideoId}/hqdefault.jpg`,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching latest video:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <MarketSkeleton />;
  }

  return (
    <div className="aspect-[1.5/1] md:aspect-[1.81/1]">
      {isVideoPlaying ? (
        // <iframe
        //   className="w-full h-48 md:h-64 rounded-lg"
        //   src={`https://www.youtube.com/embed/${latestVideoId}?autoplay=1`}
        //   title={latestVideoTitle || "YouTube Video"}
        //   frameBorder="0"
        //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        //   referrerPolicy="strict-origin-when-cross-origin"
        //   allowFullScreen
        // ></iframe>
        <iframe
          className="w-full h-48 md:h-64 rounded-lg"
          src={`https://www.youtube.com/embed/${latestVideoId}?autoplay=1&controls=0&modestbranding=1&rel=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        // Show the thumbnail with a play button before clicking
        thumbnailUrl && (
          <div className="relative w-full h-60 md:h-[183px] cursor-pointer">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={thumbnailUrl || undefined}
              alt={latestVideoTitle || "Video Thumbnail"}
            />
            {/* Play Button  */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-opacity-50 rounded-lg"
              onClick={() => {
                setLatestVideoUrl(`${latestVideoUrl}?autoplay=1`);
                setIsVideoPlaying(true);
              }}
            >
              <div className="button is-play">
                <div className="button-outer-circle has-scale-animation"></div>
                <div className="button-outer-circle has-scale-animation has-delay-short"></div>
                <div className="button-icon is-play">
                  <svg height="100%" width="100%" fill="#gggf">
                    <polygon
                      className="triangle"
                      points="5,0 30,15 5,30"
                      viewBox="0 0 30 15"
                    ></polygon>
                    <path
                      className="path"
                      d="M5,0 L30,15 L5,30z"
                      fill="none"
                      stroke="white"
                      strokeWidth="1"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WatchMarketToday;
