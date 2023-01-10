import React from "react";

export default function ViewAllBtn({ visible, onClick }) {
  if (!visible) return null;
  return (
    <button
      type="button"
      className="dark:text-dark-subtle text-light-subtle hover:underline transition"
      onClick={onClick}
    >
      View All
    </button>
  );
}
