import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchLatestNews = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getLatestNews`
  );
  return data.result || [];
};

export default function CatchUpFeatured() {
  const swiperRef = useRef(null);

  // Fetch with react-query
  const {
    data: catchUpNews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestNews"],
    queryFn: fetchLatestNews,
  });

  return (
    <div className="container mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6">
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
          }}
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
          {isLoading || isError ? (
            <SwiperSlide>
              <div className="h-40 sm:h-52 bg-gray-100 rounded-lg animate-pulse" />
            </SwiperSlide>
          ) : catchUpNews.length > 0 ? (
            catchUpNews.map((news) => (
              <SwiperSlide key={news.ID}>
                <Link
                  href={`/blog/${news.ID}/${news.title.replace(/\s+/g, "-")}`}
                >
                  <div className="relative h-40 sm:h-52 rounded-lg overflow-hidden cursor-pointer group">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${news.thumble}`}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                      <h3 className="text-white text-sm sm:text-lg font-semibold">
                        {news.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="h-40 sm:h-52 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                No news available.
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
}
