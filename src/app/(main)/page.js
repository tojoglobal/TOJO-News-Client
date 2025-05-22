"use client";
import LatestNews from "@/src/components/Home/LatestNews";
import MostReadNews from "@/src/components/Home/MostReadNews";
import PopularNews from "@/src/components/Home/PopularNews";
import FeaturedNews from "@/src/components/Home/FeaturedNews";
import WatchMarketToday from "@/src/components/Home/WatchMarketToday";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-6 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
        {/* Left Sidebar */}
        <div className="md:col-span-3 order-2 md:order-1 space-y-6">
          <div className="pt-2 rounded-lg  text-left">
            <h2 className="text-lg font-bold text-royal-indigo mb-3">
              {"Watch Market Today"}
            </h2>
            <WatchMarketToday />
          </div>
          {/* Latest news */}
          <div className="w-full max-w-sm">
            <h2 className="text-lg font-bold mb-3 text-royal-indigo">
              Latest News
            </h2>
            <LatestNews />
          </div>
          {/* Most read news */}
          <div className="rounded-lg  w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-royal-indigo">
              Most Read
            </h2>
            <MostReadNews />
          </div>
        </div>
        {/* right sidebar */}
        <div className="md:col-span-9 order-1 md:order-2 space-y-6">
          {/* Poupler news slide News */}
          <PopularNews />
          {/* Advertisement Banner */}
          <div className="bg-royal-indigo text-white text-center py-8 rounded-lg">
            Advertisements
          </div>
          {/* FeaturedNews */}
          <FeaturedNews />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
