"use client";
import React from "react";

// Helper to extract YouTube video ID from URL
function extractYouTubeId(url) {
  if (!url) return "";
  const regExp =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

export default function YouTubeModal({
  openVideo,
  setOpenVideo,
  maxWidth = 900,
}) {
  if (!openVideo) return null;
  const videoId = extractYouTubeId(openVideo);

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-2"
      onClick={() => setOpenVideo(null)}
      style={{ cursor: "pointer" }}
    >
      <div
        className={`
          w-[95vw] 
          aspect-video
          bg-black rounded-xl shadow-2xl relative
          max-w-[400px] sm:max-w-[700px] md:max-w-[${maxWidth}px]
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpenVideo(null)}
          className="absolute cursor-pointer top-2 right-2 text-white text-2xl z-10 bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
          aria-label="Close"
          type="button"
        >
          ×
        </button>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="rounded-md md:rounded-xl w-full h-full"
        />
      </div>
    </div>
  );
}
