import React from "react";
import { AiFillStar } from "react-icons/ai";

export default function StarAndScore({ reviewCount, ratingSum, textStyle }) {
  return (
    <div>
      {reviewCount ? (
        <p className="flex items-center space-x-1">
          <span className="text-highlight-deep dark:text-highlight-dark">
            <AiFillStar />
          </span>
          <span className={textStyle || "text-fourth dark:text-light-fourth"}>
            {(ratingSum / reviewCount).toFixed(1)}
          </span>
        </p>
      ) : (
        <p className={textStyle || "text-fourth dark:text-light-fourth"}>N/A</p>
      )}
    </div>
  );
}
