import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaTelegram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import footerLogo from "@/public/tojo-news-footer-logo.png";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#0A033C] text-white py-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 md:px-16 lg:px-[72px]">
        {/* Top Links */}
        <div className="md:flex flex-wrap items-center justify-between text-sm space-x-6 mb-6">
          {/*Footer logo */}
          <div>
            <Link href="/" passHref>
              <Image
                src={footerLogo}
                alt="TOJO News logo"
                width={170}
                height={70}
                className="mx-auto"
              />
            </Link>
          </div>
          {/* foote nav */}
          <div className="flex mt-5 md:mt-1 flex-wrap items-center justify-center md:justify-between space-x-1 md:space-x-3 text-[16px]">
            <a href="#" className="hover:underline">
              Home
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              Cryptocurrency
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              News
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              Market
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              Wallet
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              Blog
            </a>
          </div>
          {/* footer socail media */}
          <div className="flex space-x-4 mt-5 md:mt-1 ">
            <a
              href="https://www.facebook.com/profile.php?id=61561671656944&mibextid=ZbWKwL"
              target="_blank"
              className="flex items-center justify-center w-10 h-10 text-white border border-white rounded-full hover:bg-white hover:text-[#0A192F] transition text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/TOJONews24"
              target="_blank"
              className="flex items-center justify-center w-10 h-10 text-white border border-white rounded-full hover:bg-white hover:text-[#0A192F] transition text-xl"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.instagram.com/tojonews?igsh=ZXdiZ3JvbjBoYjB1"
              target="_blank"
              className="flex items-center justify-center w-10 h-10 text-white border border-white rounded-full hover:bg-white hover:text-[#0A192F] transition text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/tojo-news"
              target="_blank"
              className="flex items-center justify-center w-10 h-10 text-white border border-white rounded-full hover:bg-white hover:text-[#0A192F] transition text-xl"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.youtube.com/channel/@tojonews"
              target="_blank"
              className="flex items-center justify-center w-10 h-10 text-white border border-white rounded-full hover:bg-white hover:text-[#0A192F] transition text-xl"
            >
              <FaYoutube />
            </a>
            <a
              href="https://t.me/tojo-news "
              target="_blank"
              className="flex items-center justify-center w-10 h-10 text-white border border-white rounded-full hover:bg-white hover:text-[#0A192F] transition text-xl"
            >
              <FaTelegram />
            </a>
          </div>
        </div>

        <div className="flex-none md:flex justify-between items-start mt-5 border-t border-gray-600 pt-5">
          {/* Left - About Section */}
          <div className="max-w-[400px]">
            <h3 className="text-lg font-semibold mb-2">ABOUT</h3>
            <p className="text-sm text-gray-300 mt-3">
              TOJO NEWS is your go-to source for the latest and most impactful
              updates in the world of cryptocurrency. We deliver breaking news,
              in-depth analysis, and expert insights on Bitcoin, altcoins,
              blockchain technology, DeFi, NFTs, and the evolving regulatory
              landscape.
            </p>
          </div>

          {/* Center - Live Chart Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Live Chart</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Bitcoin (BTC) Price</li>
              <li>• Bitcoin Cash (BCH) Price</li>
              <li>• Bitcoin Gold (BTG) Price</li>
              <li>• Ethereum (ETH) Price</li>
              <li>• Ethereum Classic (ETC) Price</li>
              <li>• Litecoin (LTC) Price</li>
            </ul>
          </div>

          {/* Right - Newsletter Section */}
          <div className="max-w-[300px]">
            <div className="bg-[#0A033C] p-6 rounded-lg w-full max-w-[350px]">
              <h3 className="text-white text-lg font-bold mb-2">Newsletter</h3>
              <p className="text-gray-300 text-sm mb-4">
                Subscribe now and get exclusive news, interviews, and stories.
              </p>

              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 text-sm bg-white text-gray-600 rounded-md outline-none placeholder-gray-400"
                />
                <button className="w-[140px] bg-purple-600 hover:bg-purple-700 text-white py-[5px] px-[7px] rounded-md font-semibold text-[16px]">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Social Icons */}
        <div className="mt-5 flex justify-center items-center border-t border-gray-600 pt-4">
          <p className="text-sm text-gray-400">
            Copyright © 2025 TOJO News. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
