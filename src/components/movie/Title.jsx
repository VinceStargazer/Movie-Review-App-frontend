import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Title({ title, to = "", count = -1 }) {
  return (
    <Link to={to}>
      <div className="flex items-center text-3xl font-semibold dark:text-white text-primary space-x-3 hover:dark:text-highlight-dark hover:text-highlight-deep transition border-l-[3px] dark:border-highlight-dark border-highlight-deep px-2">
        <h1>{title}</h1>
        <div className="flex items-center">
          {count >= 0 && (
            <h1 className="text-lg font-normal dark:text-dark-subtle text-light-subtle">
              {count}
            </h1>
          )}
          <FaChevronRight />
        </div>
      </div>
    </Link>
  );
}
