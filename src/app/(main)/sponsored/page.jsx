"use client";

import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export default function SponsoredPage() {
  const axioPublicUrl = useAxiospublic();

  // Query for all sponsored posts
  const {
    data: sponsoredData = [],
    isLoading: isSponsoredLoading,
    isError: isSponsoredError,
  } = useQuery({
    queryKey: ["allSponsored"],
    queryFn: async () => {
      const res = await axioPublicUrl.get("/api/admin/Sponsored");
      return res?.data?.Result;
    },
  });

  // Filter active sponsored articles (only one definition)
  const getActiveSponsoredArticles = () => {
    const now = moment();
    return sponsoredData.filter((article) => {
      const startDate = moment(article.start_date);
      const endDate = moment(article.end_date);
      return now.isBetween(startDate, endDate, null, "[]"); // [] means inclusive
    });
  };

  // Filter recent articles (active and marked as recent)
  const getRecentArticles = () => {
    const now = moment();
    return sponsoredData
      .filter((article) => {
        const startDate = moment(article.start_date);
        const endDate = moment(article.end_date);
        return (
          now.isBetween(startDate, endDate, null, "[]") &&
          article.is_recent === 1
        );
      })
      .slice(0, 4);
  };

  const activeSponsoredArticles = getActiveSponsoredArticles();
  const recentArticles = getRecentArticles();

  if (isSponsoredLoading) return <div>Loading...</div>;
  if (isSponsoredError) return <div>Error loading data</div>;

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center md:text-left font-bold text-royal-indigo mb-3">
        Sponsored
      </h1>
      <p className="text-royal-indigo md:text-lg font-normal text-center md:text-left mb-8 mx-3 md:mx-0">
        There are a total of {activeSponsoredArticles.length} active sponsored
        articles.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mx-3 md:mx-0">
        {/* Main Content - 9 columns */}
        <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSponsoredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={`${axioPublicUrl.defaults.baseURL}/Images/${article.image_url}`}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-royal-indigo mb-2 line-clamp-2 hover:text-purple-700 transition-colors duration-300">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar - 3 columns */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white rounded-lg p-3 shadow-lg">
            <h2 className="text-xl font-bold text-royal-indigo mb-4">
              Recent Articles
            </h2>
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <div key={article.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-16 h-16">
                    <img
                      src={`${axioPublicUrl.defaults.baseURL}/Images/${article.image_url}`}
                      alt={article.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-royal-indigo transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {moment(article.published_at).format("MMM D, YYYY")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advertisement Section */}
          <div className="bg-royal-indigo text-white p-4 rounded-lg text-center">
            <p className="text-sm">Advertisement</p>
          </div>
        </div>
      </div>
    </div>
  );
}
