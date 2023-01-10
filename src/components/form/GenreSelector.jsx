import React from "react";
import { ImTree } from "react-icons/im";
import Badge from "./Badge";

export default function GenreSelector({ onClick, badge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full relative flex items-center space-x-2 py-1 px-3 border-2 rounded dark:border-dark-subtle border-light-subtle dark:hover:border-zinc hover:border-secondary transition dark:text-dark-subtle text-light-subtle dark:hover:text-zinc hover:text-secondary"
    >
      <ImTree />
      <span>Select genres</span>
      <Badge badge={badge} />
    </button>
  );
}
