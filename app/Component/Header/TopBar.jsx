import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { CiGlobe } from "react-icons/ci";

const TopBar = () => {
  const formattedDate = format(new Date(), "EEEE, MMMM d, yyyy");
  return (
    <div className="bg-royal-indigo  h-11 flex items-center">
      <div className="max-w-[1440px] mx-auto px-[72px] flex justify-between w-full text-white">
        <h1 className="text-sm font-poppins font-normal">{formattedDate}</h1>
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-2">
            <Link href="/login" className="text-sm font-poppins font-normal">
              Login
            </Link>
            <span>|</span>
            <Link href="/register" className="text-sm font-poppins font-normal">
              Register
            </Link>
          </div>
          <h2 className="flex items-center gap-1">
            <CiGlobe />{" "}
            <span className="text-sm font-poppins font-normal">EN</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
