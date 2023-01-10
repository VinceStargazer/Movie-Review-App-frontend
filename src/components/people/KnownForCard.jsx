import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TMDB_IMG_PATH } from "../../utils/config";
import StarAndScore from "../review/StarAndScore";

export default function KnownForCard({ movie }) {
  const { id, type, title, poster, releaseDate, character, reviews } = movie;
  const { ratingSum, reviewCount } = reviews;
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={"/movie/" + id + "?type=" + type}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={
          "flex outline outline-1 rounded-r outline-gray dark:outline-tertiary transition " +
          (hovered ? "dark:bg-secondary bg-zinc" : "")
        }
      >
        <img className="w-1/3" src={TMDB_IMG_PATH + poster} alt="" />

        <div className="flex flex-col p-3 space-y-2">
          <span className="dark:text-zinc text-secondary font-semibold hover:opacity-80 transition">
            {title}
          </span>
          <StarAndScore ratingSum={ratingSum} reviewCount={reviewCount} />
          <span className="text-fourth dark:text-light-fourth">
            {character}
          </span>
          <span className="text-fourth dark:text-light-fourth">
            {releaseDate?.substring(0, 4)}
          </span>
        </div>
      </div>
    </Link>
  );
}
