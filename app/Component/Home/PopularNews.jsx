"use client";
import React, { useEffect, useState } from "react";
import { useAxiospublic } from "@/app/hooks/useAxiospublic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import PopulerNewsSkeleton from "./HomeSkeleton/PopulerNewsSkeleton";

const PopularNews = () => {
  const axiosPublicUrl = useAxiospublic();
  const [loading, setLoading] = useState(true);
  const [popularNews, setPopularNews] = useState([]);

  useEffect(() => {
    axiosPublicUrl
      .get("/api/getMostPopulerViews")
      .then((res) => {
        setPopularNews(res.data.result || []);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <PopulerNewsSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {popularNews.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          slidesPerView="auto"
          className="h-[490px] w-full"
        >
          {popularNews.map((news, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[490px] rounded-2xl overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${news?.thumble}`}
                  alt={news?.title}
                  width={500}
                  height={250}
                  className="w-full h-full rounded-2xl "
                />

                {/* Text Content ${news?.ID}*/}
                <Link
                  href={`/blog/${news?.ID}/${news?.permalink.replace(
                    /\s+/g,
                    "-"
                  )}`}
                >
                  <div className="absolute bg-black/40 ml-6 mr-6 p-4 rounded-lg bottom-[50px] left-5 right-5 text-white">
                    <h3 className="text-[32px] font-bold">{news?.title}</h3>
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
