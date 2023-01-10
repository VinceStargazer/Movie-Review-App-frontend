import React from "react";
import { BsTrash, BsPencilSquare } from "react-icons/bs";

const btnClass =
  "p-1 dark:text-dark-subtle text-light-subtle rounded-full transition hover:dark:bg-tertiary hover:bg-gray";

export default function EditAndDelete({ onEdit, onDelete }) {
  return (
    <div className="text-sm flex items-center space-x-4 dark:text-dark-subtle text-light-subtle">
      <div className="flex items-center">
        <button className={btnClass} onClick={() => onEdit()}>
          <BsPencilSquare size={18} />
        </button>
      </div>

      <div className="relative flex items-center">
        <button className={btnClass} onClick={() => onDelete()}>
          <BsTrash size={18} />
        </button>
      </div>
    </div>
  );
}
