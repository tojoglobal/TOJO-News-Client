import { useState, useMemo } from "react";
import { BsPlayCircle } from "react-icons/bs";

// Helper to extract YouTube video ID from URL
function extractYouTubeId(url) {
  if (!url) return "";
  // Handles youtu.be, youtube.com/watch?v=, youtube.com/shorts/ etc.
  const regExp =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

// For demonstration, you can use your static data here instead of fetching:
const staticData = [
  {
    id: 6,
    show_in: "featured",
    youtube_url: "https://youtu.be/Lb6v6AUFWrM?si=ldgNFWlFzMMOznlK",
  },
  {
    id: 5,
    show_in: "featured",
    youtube_url: "https://youtu.be/-emsaxZ0_XU?si=Ut86mmGUZaUeOBrm",
  },
  {
    id: 4,
    show_in: "featured",
    youtube_url: "https://youtu.be/RD1lMyX5BMc?si=K4c9Yt1Q9UpPKMwA",
  },
];

const FeaturedContinue = () => {
  // swap staticData for your fetched data in prod
  const documentariesFeatured = staticData;
  const [openVideo, setOpenVideo] = useState(null);

  const featuredNews = useMemo(
    () =>
      documentariesFeatured.filter(
        (item) => item.show_in && item.show_in.includes("featured")
      ),
    [documentariesFeatured]
  );

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-royal-indigo mb-3">
        Featured News
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {featuredNews.map((item) => {
          const youtubeId = extractYouTubeId(item.youtube_url);
          return (
            <div
              key={item.id}
              className="relative w-full h-40 group overflow-hidden rounded-md cursor-pointer"
              onClick={() => setOpenVideo(item.youtube_url)}
            >
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                alt={`Featured news ${item.id}`}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <BsPlayCircle size={40} color="#fff" />
              </div>
            </div>
          );
        })}
      </div>
      {/* Video Modal Overlay */}
      {openVideo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setOpenVideo(null)}
          style={{ cursor: "pointer" }}
        >
          <div
            style={{
              width: "80vw",
              maxWidth: 900,
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
              className="absolute top-2 right-2 text-white text-2xl z-10"
              style={{ background: "rgba(0,0,0,0.3)", borderRadius: "50%" }}
              aria-label="Close"
              type="button"
            >
              ×
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                openVideo
              )}?autoplay=1`}
              title="YouTube video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ borderRadius: 12, width: "100%", height: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedContinue;
