"use client";

const sponsoredArticles = [
  {
    id: 1,
    image:
      "https://blockworks-co.imgix.net/wp-content/uploads/2025/01/DAS2025_London_thumbnail.png",
    title: "Unlocking Bitcoin DeFi with eBTC",
    description:
      "The latest protocol aims to bring Bitcoin to the DeFi ecosystem through innovative cross-chain solutions and enhanced security measures.",
  },
  {
    id: 2,
    image:
      "https://blockworks-co.imgix.net/wp-content/uploads/2025/01/DAS2025_London_thumbnail.png",
    title: "Think Twice: get FRM runs blockchain-first peer private sector",
    description:
      "Revolutionary approach to financial risk management through blockchain technology and decentralized solutions.",
  },
  {
    id: 3,
    image:
      "https://blockworks-co.imgix.net/wp-content/uploads/2025/01/DAS2025_London_thumbnail.png",
    title: "TRON DAO completes security assessment conducted by CertiK",
    description:
      "Strengthening network integrity through comprehensive security audits and blockchain validation.",
  },
  {
    id: 4,
    image:
      "https://blockworks-co.imgix.net/wp-content/uploads/2025/01/DAS2025_London_thumbnail.png",
    title: "USDD integrates USDT on transport payments in Argentina",
    description:
      "Expanding crypto adoption in South America through innovative payment solutions in public transportation.",
  },
];

const recentArticles = [
  {
    id: 1,
    image:
      "https://blockworks-co.imgix.net/wp-content/uploads/2025/01/DAS2025_London_thumbnail.png",
    title: "Latest Developments in Crypto Markets",
    date: "March 15, 2024",
  },
  {
    id: 2,
    image:
      "https://blockworks-co.imgix.net/wp-content/uploads/2025/01/DAS2025_London_thumbnail.png",
    title: "New DeFi Protocols Launch",
    date: "March 14, 2024",
  },
  {
    id: 3,
    image:
      "https://blockworks-co.imgix.net/wp-content/uploads/2025/01/DAS2025_London_thumbnail.png",
    title: "Blockchain Security Updates",
    date: "March 13, 2024",
  },
];

export default function SponsoredPage() {
  return (
    <div className="container mx-auto py-5">
      <h1 className="text-2xl md:text-3xl font-bold text-royal-indigo mb-3">
        Sponsored
      </h1>
      <p className="text-royal-indigo font-normal mb-8">
        There are a total of {sponsoredArticles.length} articles associated with
        Sponsored.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Content - 9 columns */}
        <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsoredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={article.image}
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
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-royal-indigo transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{article.date}</p>
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
