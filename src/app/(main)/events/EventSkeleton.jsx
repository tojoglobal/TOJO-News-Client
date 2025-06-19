import { Skeleton } from "@/src/ui/skeleton";
import React from "react";

const EventSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-7">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col md:flex-row gap-2 md:gap-6 bg-white rounded-lg overflow-hidden transition-shadow duration-300"
        >
          <div className="md:w-1/3 h-[230px] relative">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <div className="md:w-2/3 p-2 md:p-6 flex flex-col justify-center">
            <Skeleton className="h-4 w-1/3 mb-3" />
            <Skeleton className="h-7 w-2/3 mb-4" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-2/3 mb-4" />
            <div className="flex gap-3">
              <Skeleton className="h-9 w-28 rounded-full" />
              <Skeleton className="h-9 w-28 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventSkeleton;
