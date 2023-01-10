import React from "react";
import { Link } from "react-router-dom";

export default function LibraryBlock({ children, to, className }) {
  return (
    <Link
      to={to}
      className={"flex flex-col items-center justify-center opacity-80 hover:opacity-100 dark:bg-tertiary bg-gray rounded-r transition dark:text-zinc text-secondary cursor-pointer space-y-3 drop-shadow-lg " + (className || "h-[49.6%]")}
    >
      {children}
    </Link>
  );
}
