import { Skeleton } from "@/src/ui/skeleton";
import React from "react";

const NewsSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-2 md:mx-0">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-white rounded-md md:rounded-lg overflow-hidden shadow-md h-80"
        >
          <Skeleton className="skeleton-box h-48 w-full" />
          <div className="p-4 flex-1 flex flex-col gap-2">
            <Skeleton className="skeleton-box h-6 w-4/5" />
            <Skeleton className="skeleton-box h-4 w-full" />
            <Skeleton className="skeleton-box h-4 w-3/4" />
            <div className="flex justify-between mt-auto">
              <Skeleton className="skeleton-box h-4 w-16" />
              <Skeleton className="skeleton-box h-4 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSkeleton;
