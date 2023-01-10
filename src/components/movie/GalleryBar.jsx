import React from "react";

export default function GalleryBar({ children }) {
  return (
    <div className="py-2 px-3 dark:bg-secondary bg-zinc rounded drop-shadow-lg">
      <h1 className="text-xl font-semibold dark:text-white text-secondary">
        {children}
      </h1>
    </div>
  );
}
