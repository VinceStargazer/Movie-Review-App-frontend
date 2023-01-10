import React from "react";
import { Link } from "react-router-dom";
import { trimTitle } from "../../utils/helper";

export default function CrewSection({ title, crew }) {
  if (!crew.length) return null;
  return (
    <div className="py-2">
      <h1 className="dark:text-zinc text-secondary font-semibold text-lg py-1">{title}</h1>
      {crew.map((c, index) => {
        const { id, name, job } = c;
        return (
          <div className="flex ml-6 relative" key={index}>
            <Link
              to={"/person/" + id}
              className="dark:text-dark-blue text-light-blue hover:underline transition"
            >
              {trimTitle(name, 30)}
            </Link>
            {job && <div className="absolute left-64 dark:text-light-fourth text-fourth flex space-x-5">
              <span>...</span>
              <span>{job}</span>
            </div>}
          </div>
        );
      })}
    </div>
  );
}
