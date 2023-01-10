import React from "react";
import { Link } from "react-router-dom";

export default function PersonSlide({ children }) {
  const { id, profile, name } = children;
  return (
    <div className="p-3 space-y-2 bg-dark-subtle dark:bg-light-subtle dark:bg-opacity-50 bg-opacity-50">
      <Link to={"/person/" + id}>
        <img
          className="object-cover cursor-pointer drop-shadow-xl hover:opacity-90 transition"
          src={profile}
          alt=""
        />
      </Link>

      <Link to={"/person/" + id}>
        <h1 className="text-md dark:text-zinc text-secondary text-center hover:underline cursor-pointer pt-2">
          {name}
        </h1>
      </Link>
    </div>
  );
}
