"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import PopulerNewsSkeleton from "./HomeSkeleton/PopulerNewsSkeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPopularNews = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/highlight-blog`
  );
  return data.Result || [];
};

const PopularNews = () => {
  const { data: popularNews = [], isLoading } = useQuery({
    queryKey: ["highlightBlog"],
    queryFn: fetchPopularNews,
  });

  if (isLoading) return <PopulerNewsSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 order-1 md:order-3 overflow-hidden mx-2 md:mx-0">
      {popularNews.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          slidesPerView="auto"
          className="w-full"
        >
          {popularNews?.map((news, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full aspect-[1.5/1] md:aspect-[1.80/1] overflow-hidden rounded-xl">
                <Link
                  href={`/blog/${news?.ID}/${news?.title.replace(/\s+/g, "-")}`}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${news?.thumble}`}
                    alt={news?.title}
                    fill
                    className="object-cover w-full h-full"
                    priority={false}
                  />
                  <div className="absolute bg-black/30 md:ml-6 md:mr-6 p-4 bottom-[15px] md:bottom-[30px] left-5 right-5 text-white rounded-xl">
                    <h3 className="md:text-[32px] font-bold">{news?.title}</h3>
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
