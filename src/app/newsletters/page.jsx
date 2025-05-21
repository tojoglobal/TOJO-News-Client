"use client";
import { useContext, useState } from "react";
import axios from "axios";
import { useAxiospublic } from "../(component)/hooks/useAxiospublic";
import Swal from "sweetalert2";
import { GiCheckMark } from "react-icons/gi";
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMicrophone,
  FaPinterest,
  FaTelegram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { AppContext } from "../(component)/context/AppContext";

const Newsletters = () => {
  const { user } = useContext(AppContext);
  const axiosPublicUrl = useAxiospublic();
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState("");
  const options = [
    "Bitcoin",
    "Podcasts",
    "Altcoins",
    "DeFi",
    "NFTs",
    "Wallets",
    "Events",
  ];

  // use this newlett https://studio.unlayer.com/create/recycle-and-reuse

  const handleCheckboxChange = (option) => {
    setInterests((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSubscribe = async () => {
    const subscriberEmail = user?.email || email;

    if (!subscriberEmail) {
      setError("Please enter your email");
      return;
    }
    if (!validateEmail(subscriberEmail)) {
      setError("Please enter a valid email");
      return;
    }
    if (interests.length === 0) {
      setError("Please select at least one interest");
      return;
    }
    setError("");

    console.log({ subscriberEmail, interests });

    try {
      // Check if user is already subscribed
      const checkRes = await axiosPublicUrl.get(
        `/api/check-subscription?email=${subscriberEmail}`
      );
      if (checkRes.data.subscribed) {
        Swal.fire({
          title: "⚠️ Already Subscribed!",
          text: "You are already subscribed to TOJO News. Please update your interests if needed.",
          icon: "warning",
          confirmButtonColor: "#F59E0B",
        });
        return;
      }

      // Proceed with subscription if not subscribed
      const res = await axiosPublicUrl.post("/api/subscribe", {
        email: subscriberEmail,
        interests,
      });
      console.log(res.data);
      Swal.fire({
        title: "🎉 Congratulations!",
        text: "You have successfully subscribed to TOJO News!",
        icon: "success",
        confirmButtonColor: "#4F46E5",
      });
      setEmail("");
      setInterests([]);
    } catch (error) {
      console.log();
      const erroMessage = error.response.data.error.detail;
      Swal.fire({
        title: "Error!",
        text: { erroMessage },
        icon: "error",
        confirmButtonColor: "#DC2626",
      });
    }
  };

  const benefits = [
    "Real-time Crypto Updates",
    "Expert Market Analysis",
    "Exclusive Interviews & Podcasts",
    "Early Access to Crypto Events",
  ];

  const socialMedia = [
    { icon: <FaXTwitter />, link: "https://x.com/TOJONews24" },
    { icon: <FaTelegram />, link: "https://t.me/tojo-news" },
    { icon: <FaYoutube />, link: "https://www.youtube.com/channel/@tojonews" },
    {
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/company/tojo-news/",
    },
    {
      icon: <FaInstagram />,
      link: "https://www.instagram.com/tojonews?igsh=ZXdiZ3JvbjBoYjB1",
    },
    { icon: <FaPinterest />, link: "https://www.pinterest.com/tojonews/" },
    {
      icon: <FaFacebook />,
      link: "https://www.facebook.com/profile.php?id=61561671656944&mibextid=ZbWKwL",
    },
    { icon: <FaTiktok />, link: "https://www.tiktok.com/@tojonewsofficial" },
    { icon: <FaMicrophone />, link: "#" },
    { icon: <FaDiscord />, link: "#" },
  ];

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-10 md:px-16 lg:px-[70px]  py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-royal-indigo mb-5 md:mb-10 text-center">
        Newsletter
      </h1>
      <div className="bg-gradient-to-r from-royal-indigo to-[#060044] text-white p-6 flex flex-col justify-center items-center rounded-lg text-center min-h-[321px] relative overflow-hidden">
        <div className="bg-[#370094] rounded-[48%] w-[329px] h-[162px] absolute -right-14 -top-11"></div>
        <div className="bg-[#4900C6] rounded-[50%] w-[221px] h-[108px] absolute -left-10 -bottom-10"></div>
        <div className="w-11/12 md:w-7/12 relative">
          <h2 className="text-[20px] md:text-[28px] font-bold">
            Stay Ahead in Crypto Subscribe to TOJO News!
          </h2>
          <div className="w-[80%] h-[1px] bg-gray-50 mx-auto mt-5 mb-5"></div>
          <p className="text-sm md:text-[18px]">
            Get the latest crypto news, price updates, market trends, and
            exclusive insights delivered straight to your inbox.
          </p>
        </div>
      </div>
      {/* intrests */}
      <div className="max-w-2xl md:w-8/12 mx-auto mb-8 md:mb-20">
        <h3 className="mt-10 mb-5 font-bold text-2xl md:text-3xl text-royal-indigo">
          Select Interests
        </h3>
        {/* intererst chekbox */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={interests.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="w-5 h-5 text-royal-indigo border-gray-500 accent-royal-indigo rounded focus:ring-purple-500"
              />
              <span className="text-base md:text-xl text-royal-indigo font-semibold font-poppins">
                {option}
              </span>
            </label>
          ))}
        </div>
        {/* subscribe filed */}
        <div className="flex mt-5 md:mt-1 flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your e-mail Address"
            className="mt-4 p-2 focus:outline-none w-full border rounded-lg text-sm md:text-base text-gray-500 placeholder:text-gray-400"
            value={user?.email || email}
            // onChange={(e) => setEmail(user?.email)}
            // readOnly={user?.email}
            // value={user ? user.email : email}
            onChange={(e) => !user && setEmail(e.target.value)}
            readOnly={!!user}
          />
          <button
            onClick={handleSubscribe}
            // onClick={() => handleSubscribe(user?.email || email)}
            className="md:mt-3 bg-royal-indigo text-white px-6 py-2 rounded hover:bg-purple-800 transition"
          >
            Subscribe
          </button>
        </div>
        {/* erro message */}
        {error && (
          <p className="text-red-400 text-[12px] md:text-base mt-2">{error}</p>
        )}

        {/* Key Benefits */}
        <h3 className="mt-12 mb-5 font-bold text-2xl md:text-3xl text-royal-indigo">
          Key Benefits
        </h3>
        <ul className="mt-4 space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="bg-royal-indigo text-white p-[2px] md:p-1 rounded">
                <GiCheckMark />
              </span>
              <span className="text-black text-base md:text-[18px] font-medium">
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        {/* Social Media Links */}
        <h3 className="mt-12 mb-5 font-bold text-2xl md:text-3xl text-royal-indigo">
          Social Media & Community Links
        </h3>
        <p className="text-black font-bold text-lg md:text-xl mt-2">
          Follow us on
        </p>
        <div className="flex flex-wrap gap-3 space-x-3 mt-3">
          {socialMedia.map((media, index) => (
            <a
              key={index}
              href={media.link}
              target="_blank"
              className="bg-royal-indigo text-white p-2 rounded-lg text-xl md:text-2xl hover:bg-[#4900C6] transition"
            >
              {media.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newsletters;
