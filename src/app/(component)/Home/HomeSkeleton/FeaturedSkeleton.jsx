import { Skeleton } from "@/src/components/ui/skeleton";
import React from "react";

const FeaturedSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <Skeleton className="skeleton-box h-[200px] w-full rounded-lg" />
          <div className="flex-1 mb-2">
            <Skeleton className="skeleton-box h-[18px] w-full" />
            <Skeleton className="skeleton-box h-[18px] mt-1 w-4/5" />
            <Skeleton className="skeleton-box h-[18px] mt-1 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedSkeleton;
