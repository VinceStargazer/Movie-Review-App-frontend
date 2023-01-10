import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function MovieInfoRow({ title, data, to = "" }) {
  return (
    <div
      className="relative flex items-center py-3 px-1 border-b border-[1] dark:border-fourth border-light-fourth hover:dark:bg-secondary hover:bg-zinc transition"
    >
      <p className="text-primary dark:text-white mr-5 font-semibold">{title}</p>
      <div className="space-x-2 flex">
        {data?.map((d, index) => (
          <div key={index} className="space-x-2 flex">
            {title === "Languages" ? (
              <div className="text-tertiary dark:text-gray text-center">
                {d}
              </div>
            ) : (
              <Link
                className="dark:text-dark-blue text-light-blue hover:underline transition text-center"
                to={`/person/${d.id}`}
              >
                {d.name}
              </Link>
            )}
            {index < data.length - 1 ? (
              <p className="text-primary dark:text-white">·</p>
            ) : null}
          </div>
        ))}
      </div>
      {to.length ? (
        <Link to={to} className="absolute right-0 dark:text-white text-primary transition dark:hover:text-highlight-dark hover:text-highlight-deep">
          <AiOutlineRight size={18} />
        </Link>
      ) : null}
    </div>
  );
}
