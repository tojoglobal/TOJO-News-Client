import Image from "next/image";
export default function FeaturedNews() {
  const featuredNews = [
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
    },
    {
      id: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
    },
    {
      id: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
    },
    {
      id: 6,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4FBis8oXDCG39aw3z-PmKNBDv65t4-uCDg&s",
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold text-royal-indigo mb-3">
        Featured News
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {featuredNews.map((item) => (
          <div
            key={item.id}
            className="relative w-full h-64 group overflow-hidden rounded-md"
          >
            <Image
              src={item.image}
              alt={`Featured news ${item.id}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold text-royal-indigo mt-12 mb-3">
        Continue Watching
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {featuredNews.map((item) => (
          <div
            key={item.id}
            className="relative w-full h-64 group overflow-hidden rounded-md"
          >
            <Image
              src={item.image}
              alt={`Featured news ${item.id}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
