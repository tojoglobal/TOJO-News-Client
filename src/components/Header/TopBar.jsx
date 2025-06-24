import React from "react";
import { format } from "date-fns";
import { CiGlobe } from "react-icons/ci";
import UserAuth from "./UserAuth";

const TopBar = () => {
  return (
    <div className="bg-royal-indigo h-11 flex items-center py-2 px-4 sm:px-0">
      <div className="container 2xl:max-w-[1370px] mx-auto flex flex-wrap justify-between items-center text-white text-sm gap-y-2">
        <div>
          <h1 className="font-poppins font-normal">
            {/* large device */}
            <span className="hidden sm:inline">
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </span>
            {/* small device */}
            <span className="inline sm:hidden whitespace-nowrap text-[13px]">
              {format(new Date(), "EE dd-MMM-yyyy")}
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-4 sm:gap-7">
          <UserAuth />
          <div className="flex items-center gap-1">
            <CiGlobe className="text-base" />
            <span className="font-poppins">EN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
