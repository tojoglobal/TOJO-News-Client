"use client";
import { useAxiospublic } from "@/app/hooks/useAxiospublic";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
    return <p className="text-center text-gray-500">Loading latest news...</p>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-lg font-bold mb-4 text-primary">Most Read</h2>
      <div className="space-y-4">
        {mostRead.length > 0 ? (
          mostRead.slice(0, 4).map((news) => (
            <div
              key={news?.ID}
              className="flex items-start bg-gray-100 rounded-lg p-3 gap-3 shadow-md"
            >
              {/* Image */}
              <div className="w-1/3 h-[75px] relative">
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
                {/* Title */}
                <h3 className="text-sm font-semibold mt-2 leading-tight">
                  {news?.title}
                </h3>
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
