"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import logo from "@/public/Documentaries.jpg";

export default function Documentaries() {
  // Fake data for featured news
  const featuredNews = [
    { id: 1, image: "/featured/bitcoin1.jpg", title: "Bitcoin Trends" },
    { id: 2, image: "/featured/crypto1.jpg", title: "Crypto Analysis" },
    { id: 3, image: "/featured/chart1.jpg", title: "Market Growth" },
    { id: 4, image: "/featured/eth1.jpg", title: "Ethereum Updates" },
    { id: 5, image: "/featured/market1.jpg", title: "Trading Insights" },
    { id: 6, image: "/featured/2025.jpg", title: "2025 Forecast" },
  ];

  // Fake data for continue watching
  const continueWatching = [
    { id: 1, image: "/watching/btc1.jpg", title: "Bitcoin Analysis" },
    { id: 2, image: "/watching/crypto2.jpg", title: "Crypto Markets" },
    { id: 3, image: "/watching/blockchain2.jpg", title: "Blockchain Future" },
    { id: 4, image: "/watching/eth2.jpg", title: "Ethereum Updates" },
    { id: 5, image: "/watching/market2.jpg", title: "Market Trends" },
    { id: 6, image: "/watching/btc2.jpg", title: "Bitcoin 2025" },
  ];

  // Fake data for latest news
  const latestNews = [
    {
      id: 1,
      image: "/latest/chart1.jpg",
      title: "Catch Up on the Latest News",
      description: "Market Analysis",
    },
    {
      id: 2,
      image: "/latest/crypto3.jpg",
      title: "Concerns Over Potential Corruption in Crypto Policies",
      description: "Policy Updates",
    },
    {
      id: 3,
      image: "/latest/btc3.jpg",
      title: "Bitcoin Price Prediction",
      description: "Market Forecast",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001F3F] to-[#000C1A]">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src={logo}
          alt="Crypto Conference"
          fill
          className="object-cover"
          priority
        />

        {/* Geometric Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 45%, rgba(0, 31, 63, 0.1) 45%),
              linear-gradient(-45deg, transparent 45%, rgba(0, 31, 63, 0.1) 45%),
              linear-gradient(to right, rgba(0, 31, 63, 0.2), rgba(0, 12, 26, 0.8))
            `,
            backgroundSize: "100px 100px, 100px 100px, 100% 100%",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-royal-indigo mb-4">
            <span>TOP 5 Crypto Conference</span>
            <br />
            in 2025
          </h1>
          <p className="text-gray-300 max-w-xl mb-8">
            The world of cryptocurrency and blockchain has transformed the way
            we think about money, technology, and innovation.
          </p>
          <div className="flex gap-4">
            <button className="bg-royal-indigo text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-purple-700 transition-all duration-300">
              <span className="w-3 h-3 bg-white rounded-full"></span>
              WATCH NOW
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full hover:bg-white/20 transition-all duration-300">
              EXPLORE THE SHOW
            </button>
          </div>
        </div>
      </div>

      {/* Featured News Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-royal-indigo mb-8">
          Featured News
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredNews.map((item) => (
            <div
              key={item.id}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-3">
                <h3 className="text-white text-sm font-medium">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section>
        <h2 className="text-2xl font-semibold text-royal-indigo mb-6">
          Catch Up on the Latest News
        </h2>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="latest-news-swiper"
        >
          {latestNews.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative h-48 rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-lg font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
