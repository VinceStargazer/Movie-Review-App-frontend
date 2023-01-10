import React from "react";
import { Link } from "react-router-dom";
import { trimTitle } from "../../utils/helper";
import { defaultPersonImg } from "../../utils/options";

export default function CastCard({ person }) {
  const { id, profile, name, roleAs } = person;

  return (
    <Link to={`/person/${id}`}>
      <div className="flex dark:hover:bg-secondary hover:bg-zinc transition p-3 rounded">
        <img
          className="w-24 h-24 aspect-square object-cover rounded-full drop-shadow-lg"
          src={profile?.endsWith("null") ? defaultPersonImg : profile}
          alt=""
          onError={(event) => {
            event.target.src = defaultPersonImg;
            event.onerror = null;
          }}
        />

        <div className="flex flex-col justify-center p-5">
          <p className="dark:text-white text-primary font-semibold hover:underline transition">
            {name}
          </p>
          <p title={roleAs} className="dark:text-dark-subtle text-light-subtle">
            {trimTitle(roleAs, 25)}
          </p>
        </div>
      </div>
    </Link>
  );
}
