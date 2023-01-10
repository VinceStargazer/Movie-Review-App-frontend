import React from "react";

export default function Badge({ badge }) {
  if (!badge) return null;
  return (
    <span className="dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 right-0 translate-x-3 -translate-y-1 text-xs w-5 h-5 rounded-full flex justify-center items-center">
      {badge <= 9 ? badge : "9+"}
    </span>
  );
}
