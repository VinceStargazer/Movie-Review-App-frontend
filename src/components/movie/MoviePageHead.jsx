import React from "react";
import { Link } from "react-router-dom";

export default function MoviePageHead({ movie, subtitle, children }) {
  const { tmdb_id, type, title, releaseDate, poster } = movie;
  const URL = `/movie/${tmdb_id}?type=${type}`;
  return (
    <div className="flex space-x-4">
      <Link to={URL}>
        <img
          className="w-24 aspect-auto object-cover drop-shadow-lg"
          src={poster}
          alt=""
        />
      </Link>

      <div>
        <div className="flex space-x-2 text-xl mb-3">
          <Link
            className="font-semibold dark:text-dark-blue text-light-blue hover:underline transition"
            to={URL}
          >
            {title}
          </Link>
          <span className="dark:text-light-fourth text-fourth">
            {"(" + releaseDate?.substring(0, 4) + ")"}
          </span>
        </div>
        <h1 className="text-2xl dark:text-white text-primary font-semibold mb-9">
          {subtitle}
        </h1>
        {children}
      </div>
    </div>
  );
}
