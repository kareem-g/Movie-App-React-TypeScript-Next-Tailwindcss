import React from "react";

const ThumbnailSkeleton = () => {
  return (
    <div role="status" className="animate-pulse object-cover">
      <div className="h-28 min-w-[180px] bg-gray-400 md:h-36 md:min-w-[260px]"></div>
    </div>
  );
};

export default ThumbnailSkeleton;
