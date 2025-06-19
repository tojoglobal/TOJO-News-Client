import { Skeleton } from "@/src/ui/skeleton";
import React from "react";

const MostReadSkeleton = ({ count = 4 }) => {
  return (
    <div className="flex flex-col gap-3 mx-2 md:mx-0">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex gap-3">
          <Skeleton className="skeleton-box w-1/3 h-[70px]  rounded-lg" />
          <div className="flex-1">
            <Skeleton className="skeleton-box h-[15px] w-full" />
            <Skeleton className="skeleton-box h-[15px] mt-2 w-4/5" />
            <Skeleton className="skeleton-box h-[15px] mt-2 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MostReadSkeleton;
