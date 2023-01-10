import React from "react";
import { Link } from "react-router-dom";
import { trimTitle } from "../../utils/helper";

const defaultProfile =
  "https://m.media-amazon.com/images/S/sash/N1QWYSqAfSJV62Y.png";

export default function CastSection({ cast }) {
  return (
    <div className="py-2">
      <div className="flex items-center space-x-2 py-2">
        <h1 className="dark:text-zinc text-secondary font-semibold text-lg">
          Cast
        </h1>
        <h1 className="dark:text-light-fourth text-fourth">
          {"(in credits order)"}
        </h1>
      </div>

      {cast.map((c, index) => {
        const { id, name, profile, character } = c;
        return (
          <div className="flex relative mb-1 items-center" key={index}>
            <Link to={"/person/" + id} className="mr-3">
              <img
                className="w-10 aspect-auto object-cover drop-shadow-lg"
                src={profile?.endsWith("null") ? defaultProfile : profile}
                alt=""
              />
            </Link>
            <Link
              to={"/person/" + id}
              className="dark:text-dark-blue text-light-blue hover:underline transition"
            >
              {trimTitle(name, 30)}
            </Link>
            <div className="absolute left-72 dark:text-light-fourth text-fourth flex space-x-5">
              <span>...</span>
              <span>{character}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
