
  const featuredNews = [
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "UK Treasury's Cryptocurrency Holdings",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "UK Treasury's Cryptocurrency Holdings",
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "UK Treasury's Cryptocurrency Holdings",
    },
    {
      id: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
      title: "UK Treasury's Cryptocurrency Holdings",
    },
  ];

const FeaturedThisWeek = () => {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-[#5E17EB] mb-3 sm:mb-4">
        Featured This Week
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {featuredNews.map((news) => (
          <div
            key={news.id}
            className="flex items-center space-x-2 sm:space-x-3 group hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300"
          >
            <div className="w-20 sm:w-28 h-16 sm:h-20 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-[#5E17EB] text-xs sm:text-sm font-medium flex-1 line-clamp-2">
              {news.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedThisWeek;
