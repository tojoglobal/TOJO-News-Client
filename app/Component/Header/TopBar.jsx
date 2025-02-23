import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { CiGlobe } from "react-icons/ci";

const TopBar = () => {
  const formattedDate = format(new Date(), "EEEE, MMMM d, yyyy");
  return (
    <div className="bg-royal-indigo w-[1440px] h-11 mx-auto px-[162px] flex items-center ">
      <div className="flex justify-between w-full text-white">
        <h1>{formattedDate}</h1>
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-2">
            <Link href="/login">Login</Link>
            <span>|</span>
            <Link href="/register">Register</Link>
          </div>
          <h2 className="flex items-center gap-1">
            <CiGlobe /> <span>EN</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
