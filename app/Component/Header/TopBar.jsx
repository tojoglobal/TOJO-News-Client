import React from "react";
import { format } from "date-fns";
import { CiGlobe } from "react-icons/ci";
import UserAuth from "./UserAuth";

const TopBar = () => {
  const formattedDate = format(new Date(), "EEEE, MMMM d, yyyy");
  return (
    <div className="bg-royal-indigo  h-11 flex items-center">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 md:px-16 lg:px-[72px]  flex justify-between w-full text-white">
        <div className="flex items-center">
          <h1 className="text-sm font-poppins font-normal inline-block align-middle">
            {formattedDate}
          </h1>
        </div>
        <div className="flex items-center gap-7">
          <UserAuth />
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
