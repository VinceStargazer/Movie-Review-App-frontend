import React from "react";
import { Link } from "react-router-dom";
import { TMDB_IMG_PATH } from "../../utils/config";

export default function PersonPageHead({ person, subtitle }) {
  const { id, name, profile_path } = person;
  const URL = `/person/${id}`;
  return (
    <div className="flex space-x-4">
      <Link to={URL}>
        <img
          className="w-24 aspect-auto object-cover drop-shadow-lg"
          src={TMDB_IMG_PATH + profile_path}
          alt=""
        />
      </Link>

      <div>
        <div className="flex space-x-2 text-xl mb-3">
          <Link
            className="font-semibold dark:text-dark-blue text-light-blue hover:underline transition"
            to={URL}
          >
            {name}
          </Link>
        </div>
        <h1 className="text-2xl dark:text-white text-primary font-semibold mb-9">
          {subtitle}
        </h1>
      </div>
    </div>
  );
}
