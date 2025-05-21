import { Skeleton } from "@/src/components/ui/skeleton";
import React from "react";

const PopulerNewsSkeleton = () => {
  return (
    <div>
      <Skeleton className="skeleton-box h-[496px] w-full rounded-lg" />
    </div>
  );
};

export default PopulerNewsSkeleton;
