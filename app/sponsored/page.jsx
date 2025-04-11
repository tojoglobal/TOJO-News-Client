import Image from "next/image";

const placeholderImage = `https://placehold.co/190x110/3D009E/black`;

const sponsoredArticles = [
  {
    id: 1,
    title: "Unlocking Bitcoin DeFi with xfast",
    image: placeholderImage,
  },
  {
    id: 2,
    title:
      "TRON, Tether and TRM Labs establish first-ever private sector financial crime unit to combat crypto crime",
    image: placeholderImage,
  },
  {
    id: 3,
    title:
      "TRON DAO completes security assessment conducted by Chainsecurity, strengthening network integrity",
    image: placeholderImage,
  },
  {
    id: 4,
    title:
      "UQUID integrates USDT on TRON for seamless public transport payments in Argentina",
    image: placeholderImage,
  },
];

export default function SponsoredPage() {
  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-10 md:px-16 lg:px-[70px] pb-6 grid grid-cols-12 gap-4">
      <div className="col-span-9">
        <div className="">
          <h1 className="text-3xl font-bold text-royal-indigo">Sponsored</h1>
          <p className="text-gray-600 mb-6">
            There are a total of 150 articles associated with Sponsored.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-9 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {sponsoredArticles.map((article) => (
            <div key={article.id}>
              <Image
                src={article.image}
                alt={article.title}
                width={300}
                height={200}
                className="rounded-md w-full aspect-[190/110] object-cover"
              />
              <h3 className="mt-2 text-lg font-semibold">{article.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-3">
        <div className="bg-gray-200 h-full w-full"></div>
      </div>
    </div>
  );
}
