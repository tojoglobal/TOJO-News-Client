"use client";
import React from "react";
import Image from "next/image";
import DateAndTime from "../RecalcFunction/DateAndTime";
import Category from "../RecalcFunction/Category";
import Link from "next/link";

const LatestNews = () => {
  // const axiosPublicUrl = useAxiospublic();
  // const [latestNews, setLatestNews] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axiosPublicUrl
  //     .get("/api/getLatestNews")
  //     .then((res) => {
  //       setLatestNews(res.data.result || []);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching latest news:", error);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <LatestNewsSkeleton count={4} />;
  // }

  const latestNews = [
    {
      ID: 1,
      thumble: "trump.jpg",
      title: "Latest: International Summit Addresses Climate Change Crisis",
      category_id: 4, // Environment
      dateAndTime: "2024-01-20T14:30:00",
    },
    {
      ID: 2,
      thumble: "Documentaries.jpg",
      title: "Healthcare Innovation: New Treatment Breakthrough Announced",
      category_id: 7, // Health
      dateAndTime: "2024-01-20T12:15:00",
    },
    {
      ID: 3,
      thumble: "trump.jpg",
      title: "Market Update: Global Stocks Reach Record Highs",
      category_id: 2, // Economy
      dateAndTime: "2024-01-20T10:45:00",
    },
    {
      ID: 4,
      thumble: "Documentaries.jpg",
      title: "Entertainment: Award-Winning Director Announces New Project",
      category_id: 8, // Entertainment
      dateAndTime: "2024-01-20T09:00:00",
    },
  ];

  return (
    <div>
      <div className="space-y-4">
        {latestNews.length > 0 ? (
          latestNews.map((news) => (
            <div
              key={news.ID}
              className="flex flex-col items-start rounded-lg gap-1"
            >
              {/* Image */}
              <div className="w-full relative">
                <Image
                  src={`/` + news.thumble}
                  alt={news.title}
                  width={80}
                  height={70}
                  objectFit="cover"
                  className="rounded-lg w-full"
                />
                {/* Category Tag */}
                <span className="bg-royal-indigo text-white text-xs px-2 py-1 rounded-md font-medium absolute bottom-1 left-2">
                  <Category category={news.category_id} />
                </span>
              </div>
              <div className="flex-1 mb-2">
                <Link
                  href={`/blog/${news.ID}/${news.title.replace(/\s+/g, "-")}`}
                  className="hover:underline"
                >
                  {/* Title */}
                  <h3 className="text-[16px] font-bold mt-1 leading-tight font-poppins text-royal-indigo">
                    {news.title}
                  </h3>
                </Link>

                {/* Date */}
                <p className="text-xs text-royal-indigo mt-1">
                  <DateAndTime dateAndTime={news.dateAndTime} />
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No latest news available!</p>
        )}
      </div>
    </div>
  );
};

export default LatestNews;
