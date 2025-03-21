import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LatestNewsSkeleton = () => {
  return (
    <div>
      <Skeleton className="skeleton-box h-[195px] w-full rounded-lg" />
    </div>
  );
};

export default LatestNewsSkeleton;
