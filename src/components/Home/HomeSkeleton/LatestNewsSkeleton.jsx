import { Skeleton } from "@/src/ui/skeleton";
import React from "react";

const LatestNewsSkeleton = ({ count = 4 }) => {
  return (
    <div className="flex flex-col gap-3 mx-2 md:mx-0">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <Skeleton className="skeleton-box h-[170px] w-full rounded-lg" />
          <div className="flex-1 mb-2">
            <Skeleton className="skeleton-box h-[15px] w-full" />
            <Skeleton className="skeleton-box h-[15px] mt-1 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestNewsSkeleton;
