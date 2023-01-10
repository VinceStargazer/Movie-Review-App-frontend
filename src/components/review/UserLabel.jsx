import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function UserLabel({ name, rating, to }) {
  return (
    <div className="relative flex items-center space-x-3">
      <Link
        to={to}
        className="dark:text-dark-blue text-light-blue hover:underline transition"
      >
        {name}
      </Link>
      <div className="flex items-center ml-16">
        <AiFillStar className="dark:text-highlight-dark text-highlight-deep mx-1" />
        <span className="dark:text-gray text-tertiary">{rating}</span>
        <span className="dark:text-light-fourth text-fourth">/10</span>
      </div>
    </div>
  );
}
