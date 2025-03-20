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
        <div className="md:col-span-3 space-y-6">
          {/* Watch Market Today */}
          <WatchMarketToday />
          {/* Latest news */}
          <LatestNews />
          {/* Most read news */}
          <MostReadNews />
        </div>
        {/* right sidebar */}
        {/* Main Content */}
        <div className="md:col-span-9 space-y-6">
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
