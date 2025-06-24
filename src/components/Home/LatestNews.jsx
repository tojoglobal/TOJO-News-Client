"use client";
import Image from "next/image";
import DateAndTime from "../RecalcFunction/DateAndTime";
import Category from "../RecalcFunction/Category";
import Link from "next/link";
import LatestNewsSkeleton from "./HomeSkeleton/LatestNewsSkeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchLatestNews = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getLatestNews`
  );
  return data.result || [];
};

const IMAGE_HEIGHT = 170;

const LatestNews = () => {
  const { data: latestNews = [], isLoading } = useQuery({
    queryKey: ["latestNews"],
    queryFn: fetchLatestNews,
  });

  if (isLoading) return <LatestNewsSkeleton count={4} />;

  return (
    <div>
      <div className="space-y-4">
        {latestNews.length > 0 ? (
          latestNews.slice(0, 4).map((news) => (
            <div
              key={news?.ID}
              className="flex flex-col items-start rounded-lg gap-3 mx-2 md:mx-0"
            >
              <div
                className="w-full h-[220px] lg:h-[170px] relative overflow-hidden rounded-md md:rounded-lg"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${news?.thumble}`}
                  alt={news?.title}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  className="rounded-md md:rounded-lg w-full h-full"
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority={false}
                />
                <span className="bg-royal-indigo text-white text-xs px-2 py-1 rounded-md font-medium absolute left-2 bottom-2 z-20 pointer-events-none">
                  <Category category={news?.category_id} />
                </span>
              </div>
              {/* Content */}
              <div className="flex-1 mb-2">
                <Link
                  href={`/blog/${news?.ID}/${news?.title.replace(/\s+/g, "-")}`}
                  className="hover:underline"
                >
                  <h3 className="text-lg md:text-xl font-bold mt-1 mx-2 md:mx-0 leading-tight font-poppins text-royal-indigo">
                    {news?.title}
                  </h3>
                </Link>
                <p className="text-xs text-royal-indigo mt-1">
                  <DateAndTime dateAndTime={news?.dateAndTime} />
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No latest news available.</p>
        )}
      </div>
    </div>
  );
};

export default LatestNews;
