'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import logo from "../../../../public/Documentaries.jpg";

export default function Documentaries() {
  // Fake data for crypto conference
  const conferenceData = {
    title: 'TOP 5 Crypto Conference in 2025',
    description: 'The world of cryptocurrency and blockchain innovation meets here. Join us for groundbreaking insights, networking, and more!',
    image: '/crypto-conference.jpg'
  };

  // Fake data for featured news
  const featuredNews = [
    { id: 1, image: '/featured/bitcoin1.jpg', title: 'Bitcoin Surge' },
    { id: 2, image: '/featured/ethereum1.jpg', title: 'Ethereum 2.0' },
    { id: 3, image: '/featured/defi1.jpg', title: 'DeFi Revolution' },
    { id: 4, image: '/featured/blockchain1.jpg', title: 'Blockchain Tech' },
    { id: 5, image: '/featured/crypto1.jpg', title: 'Crypto Trends' },
    { id: 6, image: '/featured/2025.jpg', title: '2025 Forecast' }
  ];

  // Fake data for continue watching
  const continueWatching = [
    { id: 1, image: '/watching/btc1.jpg', title: 'Bitcoin Analysis' },
    { id: 2, image: '/watching/crypto2.jpg', title: 'Crypto Markets' },
    { id: 3, image: '/watching/blockchain2.jpg', title: 'Blockchain Future' },
    { id: 4, image: '/watching/eth2.jpg', title: 'Ethereum Updates' },
    { id: 5, image: '/watching/market2.jpg', title: 'Market Trends' },
    { id: 6, image: '/watching/btc2.jpg', title: 'Bitcoin 2025' }
  ];

  // Fake data for latest news
  const latestNews = [
    { id: 1, image: '/latest/chart1.jpg', title: 'Catch Up on the Latest News', description: 'Market Analysis' },
    { id: 2, image: '/latest/crypto3.jpg', title: 'Concerns Over Potential Corruption in Crypto Policies', description: 'Policy Updates' },
    { id: 3, image: '/latest/btc3.jpg', title: 'Bitcoin Price Prediction', description: 'Market Forecast' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Crypto Conference Section */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
        <Image
          src={conferenceData.image}
          alt="Crypto Conference"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex flex-col justify-center px-8">
          <h1 className="text-4xl font-bold text-white mb-4">{conferenceData.title}</h1>
          <p className="text-white/90 max-w-xl mb-6">{conferenceData.description}</p>
          <div className="flex gap-4">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">EXPLORE THE EVENT</button>
            <button className="border border-white text-white px-6 py-2 rounded-full hover:bg-white/10 transition">WATCH TRAILER</button>
          </div>
        </div>
      </div>

      {/* Featured News Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-purple-600 mb-6">Featured News</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredNews.map((item) => (
            <div key={item.id} className="relative h-40 rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                <h3 className="text-white text-sm font-medium">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Continue Watching Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-purple-600 mb-6">Continue Watching</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {continueWatching.map((item) => (
            <div key={item.id} className="relative h-40 rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                <h3 className="text-white text-sm font-medium">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News Section with Swiper */}
      <section>
        <h2 className="text-2xl font-semibold text-purple-600 mb-6">Catch Up on the Latest News</h2>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
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
                  <h3 className="text-white text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Add custom styles for Swiper navigation */}
      <style jsx global>{
        `
          .latest-news-swiper .swiper-button-next,
          .latest-news-swiper .swiper-button-prev {
            color: #9333ea;
            background: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .latest-news-swiper .swiper-button-next:after,
          .latest-news-swiper .swiper-button-prev:after {
            font-size: 20px;
          }

          .latest-news-swiper .swiper-button-disabled {
            opacity: 0.5;
          }
        `
      }</style>
    </div>
  );
}
