"use client";
import { useAxiospublic } from "@/src/app/hooks/useAxiospublic";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MostReadSkeleton from "./HomeSkeleton/MostReadSkeleton";
import Link from "next/link";

const MostReadNews = () => {
  const axiosPublicUrl = useAxiospublic();
  const [mostRead, setMostRead] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublicUrl
      .get("/api/getMostRead")
      .then((res) => {
        setMostRead(res.data.result || []);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <MostReadSkeleton count={4} />;
  }

  return (
    <div>
      <div className="space-y-4">
        {mostRead.length > 0 ? (
          mostRead.slice(0, 4).map((news) => (
            <div key={news?.ID} className="flex items-start rounded-lg gap-3">
              {/* Image */}
              <div className="w-1/3 h-[70px] relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${news?.thumble}`}
                  alt={news?.title}
                  width={75}
                  height={75}
                  objectFit="cover"
                  className="rounded-lg w-full h-full"
                />
              </div>
              <div className="flex-1">
                <Link
                  href={`/blog/${news?.ID}/${news?.title.replace(/\s+/g, "-")}`}
                  className="hover:underline"
                >
                  {/* Title */}

                  <h3 className="text-sm font-semibold mt-2 leading-tight text-royal-indigo">
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
