import LatestNews from "@/src/components/Home/LatestNews";
import MostReadNews from "@/src/components/Home/MostReadNews";
import PopularNews from "@/src/components/Home/PopularNews";
import FeaturedNews from "@/src/components/Home/FeaturedNews";
import WatchMarketToday from "@/src/components/Home/WatchMarketToday";
const HomePage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-3 order-2 md:order-1 space-y-2">
          <div className="md:p-3 rounded-lg  text-left">
            <h2 className="text-lg font-bold text-royal-indigo mb-2 mx-2 md:mx-0">
              {"Watch Market Today"}
            </h2>
            <WatchMarketToday />
          </div>
          {/* Latest news */}
          <div className="md:p-3 w-full max-w-sm mt-5 md:mt-0">
            <h2 className="text-lg font-bold mb-2 text-royal-indigo mx-2 md:mx-0">
              Latest News
            </h2>
            <LatestNews />
          </div>
          {/* Most read news */}
          <div className="md:p-3 rounded-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-royal-indigo mx-2 md:mx-0">
              Most Read
            </h2>
            <MostReadNews />
          </div>
        </div>
        {/* right sidebar Main Content */}
        <div className="md:col-span-9 order-1 md:order-2 space-y-6">
          <PopularNews />
          <div className="bg-royal-indigo text-white text-center py-6 rounded-md md:rounded-lg mx-1 md:mx-0">
            Advertisements
          </div>
          <FeaturedNews />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
