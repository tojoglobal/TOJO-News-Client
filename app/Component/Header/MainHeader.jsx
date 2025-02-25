import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/Tojo-News-Logo.png";
// import logo from "@/public/logoWhite.jpg";

const MainHeader = () => {
  return (
    <div className="max-w-[1440px] w-full h-24 mx-auto px-4 sm:px-10 md:px-16 lg:px-[162px] flex flex-wrap items-center justify-between">
      {/* Left Section: Social Icons */}
      <div className="flex items-center gap-4">
        <Link href="#">
          <Image
            src="/icons/facebook.svg"
            alt="Facebook"
            width={24}
            height={24}
          />
        </Link>
        <Link href="#">
          <Image
            src="/icons/instagram.svg"
            alt="Instagram"
            width={24}
            height={24}
          />
        </Link>
        <Link href="#">
          <Image src="/icons/x.svg" alt="X (Twitter)" width={24} height={24} />
        </Link>
        <Link href="#">
          <Image
            src="/icons/linkedin.svg"
            alt="LinkedIn"
            width={24}
            height={24}
          />
        </Link>
      </div>

      {/* Center Section: Logo */}
      <div className="flex justify-center w-full md:w-auto">
        <Image
          src={logo}
          alt="TOJO News logo"
          width={176}
          height={80}
          className="mx-auto"
        />
      </div>

      {/* Right Section: Subscribe Button */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-poppins">For Daily News</span>
        <button className="bg-royal-indigo text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-800 transition">
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
};

export default MainHeader;
