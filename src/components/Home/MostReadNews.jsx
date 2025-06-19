"use client";
import Image from "next/image";
import MostReadSkeleton from "./HomeSkeleton/MostReadSkeleton";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMostRead = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getMostRead`
  );
  return data.result || [];
};

const MostReadNews = () => {
  const { data: mostRead = [], isLoading } = useQuery({
    queryKey: ["mostReadNews"],
    queryFn: fetchMostRead,
  });

  if (isLoading) return <MostReadSkeleton count={4} />;

  return (
    <div className="mx-2 md:mx-0">
      <div className="space-y-4">
        {mostRead.length > 0 ? (
          mostRead.slice(0, 4).map((news) => (
            <div
              key={news?.ID}
              className="flex items-start rounded-lg gap-2 md:gap-3"
            >
              {/* Image */}
              <div className="w-1/3 h-[70px] md:h-[60px] relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${news?.thumble}`}
                  alt={news?.title}
                  width={75}
                  height={75}
                  objectFit="cover"
                  className="rounded-sm md:rounded-md w-full h-full"
                />
              </div>
              <div className="flex-1">
                <Link
                  href={`/blog/${news?.ID}/${news?.title.replace(/\s+/g, "-")}`}
                  className="hover:underline"
                >
                  {/* Title */}
                  <h3 className="text-sm font-semibold leading-tight text-royal-indigo">
                    {news?.title}
                  </h3>
                </Link>
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

export default MostReadNews;
