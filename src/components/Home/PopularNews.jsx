"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import PopulerNewsSkeleton from "./HomeSkeleton/PopulerNewsSkeleton";
import trump from "@/public/trump.jpg";

const PopularNews = () => {
  const [loading, setLoading] = useState(true);
  const [popularNews, setPopularNews] = useState([]);

  // For static testing, add a dummy news item
  useState(() => {
    setPopularNews([
      {
        ID: 1,
        title: "Trump’s Latest Speech Sparks Debate on Crypto Regulations",
        thumble: "sample.jpg",
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return <PopulerNewsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 order-1 md:order-3 overflow-hidden">
      {popularNews.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          slidesPerView="auto"
          className="h-[290px] md:h-[490px] w-full"
        >
          {popularNews.map((news, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[290px] md:h-[490px] md:rounded-2xl">
                <Image
                  src={trump}
                  alt={news.title || "News image"}
                  width={500}
                  height={250}
                  className="w-full h-full rounded-2xl object-cover"
                  priority
                />
                <Link href={`/blog/${news.ID}/${news.title?.replace(/\s+/g, "-")}`}>
                  <div className="absolute md:ml-7 md:mr-7 p-4 rounded-lg bottom-[15px] md:bottom-[20px] left-5 right-5 text-white">
                    <h3 className="md:text-[32px] font-bold">{news.title}</h3>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No trending articles available.</p>
      )}
    </div>
  );
};

export default PopularNews;
