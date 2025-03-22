"use client";
import { useState } from "react";
import axios from "axios";

const Newsletters = () => {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const options = [
    "Bitcoin",
    "Podcasts",
    "Altcoins",
    "DeFi",
    "NFTs",
    "Wallets",
    "Events",
  ];

  const handleCheckboxChange = (option) => {
    setInterests((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubscribe = async () => {
    if (!email || interests.length === 0) {
      alert("Please enter email and select at least one interest");
      return;
    }
    console.log({ email, interests });

    try {
      await axios.post("http://localhost:5000/subscribe", { email, interests });
      alert("Subscribed successfully!");
      setEmail("");
      setInterests([]);
    } catch (error) {
      alert("Subscription failed!");
    }
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-10 md:px-16 lg:px-[70px]  py-6">
      <h1 className="text-3xl font-bold text-royal-indigo mb-4 text-center">
        Newsletter
      </h1>
      <div className="bg-gradient-to-r from-royal-indigo to-[#060044] text-white p-6 flex flex-col justify-center items-center rounded-lg text-center min-h-[321px] relative overflow-hidden">
        <div className="bg-[#370094] rounded-[50%] w-[329px] h-[162px] absolute -right-10 -top-10"></div>
        <div className="bg-[#4900C6] rounded-[50%] w-[221px] h-[108px] absolute -left-10 -bottom-10"></div>
        <div className="w-10/12">
          <h2 className="text-[28px] font-bold">
            Stay Ahead in Crypto – Subscribe to TOJO News!
          </h2>
          <p className="text-sm">
            Get the latest crypto news, price updates, market trends, and
            exclusive insights delivered to your inbox.
          </p>
        </div>
      </div>
      {/* intrests */}
      <div className="w-8/12 mx-auto">
        <h3 className="mt-6 font-semibold text-lg">Select Interests</h3>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={interests.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Enter your e-mail Address"
            className="mt-4 p-2 w-full border rounded focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="mt-3 bg-royal-indigo text-white px-6 py-2 rounded hover:bg-purple-800 transition"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletters;
