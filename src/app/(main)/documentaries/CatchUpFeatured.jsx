import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CatchUpFeatured() {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const catchUpNews = [
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "Catch Up on the Latest News",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "Concerns Over Potential Corruption in Crypto Policies",
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "Bitcoin Market Analysis",
    },
    {
      id: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "Catch Up on the Latest News",
    },
    {
      id: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "Concerns Over Potential Corruption in Crypto Policies",
    },
    {
      id: 6,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "Bitcoin Market Analysis",
    },
  ];

  const featuredNews = [
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "UK Treasury's Cryptocurrency Holdings",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "UK Treasury's Cryptocurrency Holdings",
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "UK Treasury's Cryptocurrency Holdings",
    },
    {
      id: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "UK Treasury's Cryptocurrency Holdings",
    },
  ];

  return (
    <div className="container mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6">
      {/* Catch Up Section */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-royal-indigo mb-3 sm:mb-4">
          Catch Up on the Latest News
        </h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          slidesPerGroup={1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={handleSlideChange}
          breakpoints={{
            480: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 3.5,
              spaceBetween: 16,
            },
            1536: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 16,
            },
          }}
          className="w-full"
        >
          {catchUpNews.map((news) => (
            <SwiperSlide key={news.id}>
              <div className="relative h-40 sm:h-52 rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                  <h3 className="text-white text-sm sm:text-lg font-semibold">
                    {news.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Featured This Week Section */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#5E17EB] mb-3 sm:mb-4">
          Featured This Week
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredNews.map((news) => (
            <div
              key={news.id}
              className="flex items-center space-x-2 sm:space-x-3 group hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300"
            >
              <div className="w-20 sm:w-28 h-16 sm:h-20 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[#5E17EB] text-xs sm:text-sm font-medium flex-1 line-clamp-2">
                {news.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
