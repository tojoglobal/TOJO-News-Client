"use client";
import LatestNews from "./Component/Home/LatestNews";
import MostReadNews from "./Component/Home/MostReadNews";
import PopularNews from "./Component/Home/PopularNews";
import FeaturedNews from "./Component/Home/FeaturedNews";
import WatchMarketToday from "./Component/Home/WatchMarketToday";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Component UI */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-3 order-2 md:order-1 space-y-6">
          {/* Watch Market Today */}
          <div className="md:p-4 pt-2 rounded-lg  text-left">
            <h2 className="text-lg font-bold text-royal-indigo mb-3">
              {"Watch Market Today"}
            </h2>
            <WatchMarketToday />
          </div>
          {/* Latest news */}
          <div className="md:p-4 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-3 text-royal-indigo">
              Latest News
            </h2>
            <LatestNews />
          </div>
          {/* Most read news */}
          <div className="md:p-4 rounded-lg  w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-royal-indigo">
              Most Read
            </h2>{" "}
            <MostReadNews />
          </div>
        </div>
        {/* right sidebar */}
        {/* Main Content */}
        <div className="md:col-span-9 order-1 md:order-2 space-y-6">
          {/* Poupler news slide News */}
          <PopularNews />
          {/* Advertisement Banner */}
          <div className="bg-purple-600 text-white text-center py-6 rounded-lg">
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
