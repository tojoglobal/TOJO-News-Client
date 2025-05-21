import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/Tojo-News-Logo.png";
import fb from "@/public/SocaiIcons/fb.png";
import inst from "@/public/SocaiIcons/insta.png";
import linkedin from "@/public/SocaiIcons/Linkedin.png";
import twitterx from "@/public/SocaiIcons/X.png";
import MobileMenu from "./MobileMenu";

// https://x.com/TOJONews24
// https://www.linkedin.com/company/tojo-news/
// https://t.me/tojo-news
// https://www.instagram.com/tojonews?igsh=ZXdiZ3JvbjBoYjB1
//https://www.pinterest.com/tojonews/
//https://www.facebook.com/profile.php?id=61561671656944&mibextid=ZbWKwL
//https://www.tiktok.com/@tojonewsofficial
//https://www.youtube.com/channel/@tojonews

const MainHeader = () => {
  return (
    <>
      {/* large device */}
      <div className="hidden sm:block">
        <div className="max-w-[1440px] w-full h-24 mx-auto px-4 sm:px-10 md:px-16 lg:px-[72px] flex flex-wrap items-center justify-between">
          {/* Left Section: Social Icons */}
          <div className="flex items-center gap-2">
            <Link href="https://www.facebook.com/TOJONews" target="_blank">
              <Image src={fb} alt="Facebook" width={24} height={24} />
            </Link>
            <Link
              href="https://www.instagram.com/tojonews?igsh=ZXdiZ3JvbjBoYjB1"
              target="_blank"
            >
              <Image src={inst} alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="https://x.com/TOJONews24" target="_blank">
              <Image src={twitterx} alt="X (Twitter)" width={24} height={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/tojo-news/"
              target="_blank"
            >
              <Image src={linkedin} alt="LinkedIn" width={24} height={24} />
            </Link>
          </div>
          {/* Center Section: Logo */}
          <div className="flex justify-center w-full md:w-auto">
            <Link href="/" passHref>
              <Image
                src={logo}
                alt="TOJO News logo"
                width={176}
                height={80}
                className="mx-auto"
              />
            </Link>
          </div>
          {/* Right Section: Subscribe Button */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-poppins">For Daily News</span>
            <button className="bg-royal-indigo cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-800 transition">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
      {/* small device */}
      <div className="block sm:hidden">
        <div className="w-full h-20 px-4 mx-auto flex flex-row items-center justify-between">
          {/* Left Section: Logo */}
          <div>
            <Link href="/" passHref>
              <Image
                src={logo}
                alt="TOJO News logo"
                width={100}
                height={40}
                className="mx-auto"
              />
            </Link>
          </div>
          {/* Right Section: Social Icons */}
          <nav>
            <MobileMenu />
          </nav>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
