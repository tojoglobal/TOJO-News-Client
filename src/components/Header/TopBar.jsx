import React from "react";
import { format } from "date-fns";
import { CiGlobe } from "react-icons/ci";
import UserAuth from "./UserAuth";

const TopBar = () => {
  return (
    <div className="bg-royal-indigo h-11 flex items-center">
      <div className="container mx-auto flex justify-between w-full text-white">
        <div className="flex items-center">
          <h1 className="font-poppins font-normal inline-block align-middle">
            {/* large device */}
            <span className="hidden sm:block text-sm">
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </span>
            {/* small device */}
            <span className="block sm:hidden text-[13px] whitespace-nowrap">
              {format(new Date(), "EE dd-MMM-yyyy")}
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-7 ">
          <UserAuth />
          <div className="flex items-center gap-1">
            <CiGlobe />{" "}
            <span className="text-sm font-poppins font-normal">EN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
