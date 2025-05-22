import React from "react";
import Image from "next/image";
import DateAndTime from "../RecalcFunction/DateAndTime";
import Author from "../RecalcFunction/Author";
import Category from "../RecalcFunction/Category";
import Link from "next/link";

const FeaturedNews = () => {
  // Fake data for featured articles
  const featuredArticles = [
    {
      ID: 1,
      thumble: "trump.jpg",
      title: "Breaking: Major Political Development Shakes Washington",
      category_id: 1, // Politics
      dateAndTime: "2024-01-20T10:30:00",
      author1_id: 1,
      author2_id: null
    },
    {
      ID: 2,
      thumble: "Documentaries.jpg",
      title: "Global Economic Summit Concludes with Historic Agreement",
      category_id: 2, // Economy
      dateAndTime: "2024-01-19T15:45:00",
      author1_id: 2,
      author2_id: 3
    },
    {
      ID: 3,
      thumble: "trump.jpg",
      title: "Tech Giants Announce Revolutionary AI Partnership",
      category_id: 3, // Technology
      dateAndTime: "2024-01-18T09:15:00",
      author1_id: 4,
      author2_id: null
    },
    {
      ID: 4,
      thumble: "Documentaries.jpg",
      title: "Environmental Breakthrough: New Clean Energy Solution Discovered",
      category_id: 4, // Environment
      dateAndTime: "2024-01-17T14:20:00",
      author1_id: 5,
      author2_id: 6
    },
    {
      ID: 5,
      thumble: "trump.jpg",
      title: "Sports Update: Underdog Team Makes Historic Championship Win",
      category_id: 5, // Sports
      dateAndTime: "2024-01-16T18:30:00",
      author1_id: 7,
      author2_id: null
    },
    {
      ID: 6,
      thumble: "Documentaries.jpg",
      title: "Cultural Festival Brings Together Global Artists",
      category_id: 6, // Culture
      dateAndTime: "2024-01-15T11:45:00",
      author1_id: 8,
      author2_id: 9
    }
  ];

  // const { data: latestUploads, error, loading } = useApi("/api/admin/blogpost");

  // // select 4 random articals
  // const featuredArticles = useMemo(() => {
  //   if (!Array.isArray(latestUploads) || latestUploads.length === 0) return [];
  //   return [...latestUploads] // Create a copy to avoid mutating state
  //     .sort(() => 0.5 - Math.random()) // Shuffle array
  //     .slice(0, 6); // Pick first 4 articles
  // }, [latestUploads]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {featuredArticles.map((news) => (
        <div key={news.ID} className="rounded-lg flex flex-col h-full">
          {/* Image */}
          <div className="w-full relative aspect-[1.5/1] md:aspect-[1.65/1]">
            <Image
              src={`/` + news.thumble}
              alt={news.title}
              fill
              className="rounded-lg object-cover"
            />
            {/* Category Tag */}
            <span className="bg-royal-indigo text-white text-xs px-2 py-1 rounded-md font-medium absolute bottom-1 left-1">
              <Category category={news.category_id} />
            </span>
          </div>

          {/* Content */}
          <div className="pt-3 flex flex-col h-full">
            <Link
              href={`/blog/${news.ID}/${news.title.replace(/\s+/g, "-")}`}
              className="hover:underline"
            >
              {/* Title (Flexible height) */}
              <h3 className="text-[15px] md:text-2xl font-bold text-royal-indigo mt-2 font-poppins flex-grow">
                {news.title}
              </h3>
            </Link>

            {/* Date & Author (Always at bottom) */}
            <p className="text-[11px] md:text-sm text-royal-indigo mt-2 md:mt-auto flex items-center flex-grow">
              <DateAndTime dateAndTime={news.dateAndTime} /> {" by "}
              <span className="ml-0.5 font-semibold">
                <Author
                  author1={news.author1_id}
                  author2={news.author2_id}
                  showSingle={true}
                />
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedNews;
