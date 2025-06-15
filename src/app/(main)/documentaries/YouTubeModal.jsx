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
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={() => setOpenVideo(null)}
      style={{ cursor: "pointer" }}
    >
      <div
        style={{
          width: "80vw",
          maxWidth,
          aspectRatio: "16/9",
          background: "#000",
          borderRadius: 12,
          boxShadow: "0 4px 32px #0008",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpenVideo(null)}
          className="absolute cursor-pointer top-2 right-2 text-white text-2xl z-10"
          style={{ background: "rgba(0,0,0,0.3)", borderRadius: "50%" }}
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
          style={{ borderRadius: 12, width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
