"use client";
import Link from "next/link";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export default function SponsoredPage() {
  const axioPublicUrl = useAxiospublic();

  const {
    data: sponsoredData = [],
    isLoading: isSponsoredLoading,
    isError: isSponsoredError,
  } = useQuery({
    queryKey: ["allSponsored"],
    queryFn: async () => {
      const res = await axioPublicUrl.get("/api/admin/Sponsored");
      return res?.data?.Result || [];
    },
  });

  // Helper: checks if now is in [start_date, end_date] inclusive
  const isActive = (start, end) => {
    const now = moment();
    return now.isSameOrAfter(moment(start)) && now.isSameOrBefore(moment(end));
  };

  // Main sponsored posts: only active (not expired, not future)
  const articlesToDisplay = sponsoredData.filter((article) =>
    isActive(article.start_date, article.end_date)
  );

  // Recent Articles: active AND is_recent === 1
  const recentArticles = sponsoredData
    .filter(
      (article) =>
        article.is_recent === 1 &&
        isActive(article.start_date, article.end_date)
    )
    .slice(0, 4);

  if (isSponsoredLoading) return <div>Loading...</div>;
  if (isSponsoredError) return <div>Error loading data</div>;

  return (
    <div className="container mx-auto py-5 mb-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-royal-indigo mb-1">
        Sponsored
      </h1>
      <p className="text-royal-indigo md:text-lg font-normal mb-6">
        There are a total of {articlesToDisplay.length} sponsored articles.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesToDisplay.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No sponsored articles active right now.
            </div>
          )}
          {articlesToDisplay?.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Link
                  href={`/sponsored/${article.id}/${encodeURIComponent(
                    article.title.replace(/\s+/g, "-").toLowerCase()
                  )}`}
                  passHref
                  legacyBehavior
                >
                  <a>
                    <img
                      src={`${axioPublicUrl.defaults.baseURL}/Images/${article.image_url}`}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </a>
                </Link>
              </div>
              <div className="p-3">
                <Link
                  href={`/sponsored/${article.id}/${encodeURIComponent(
                    article.title.replace(/\s+/g, "-").toLowerCase()
                  )}`}
                  passHref
                  legacyBehavior
                >
                  <a className="text-lg font-semibold text-royal-indigo mb-2 line-clamp-2 hover:text-purple-700 capitalize transition-colors duration-300 hover:underline">
                    {article.title}
                  </a>
                </Link>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Sidebar */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white rounded-lg p-3 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-royal-indigo mb-4">
              Recent Articles
            </h2>
            <div className="space-y-4">
              {recentArticles.length > 0 ? (
                recentArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/sponsored/${article.id}/${encodeURIComponent(
                      article.title.replace(/\s+/g, "-").toLowerCase()
                    )}`}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0 w-16 h-12">
                      <img
                        src={`${axioPublicUrl.defaults.baseURL}/Images/${article.image_url}`}
                        alt={article.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm capitalize font-medium text-gray-900 line-clamp-2 hover:text-royal-indigo transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {moment(article.published_at).format("MMM D, YYYY")}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No recent articles.</p>
              )}
            </div>
          </div>
          {/* Advertisement */}
          <div className="bg-royal-indigo text-white p-4 rounded-lg text-center">
            <p className="text-sm">Advertisement</p>
          </div>
        </div>
      </div>
    </div>
  );
}
