import React from "react";
import { ImSpinner3 } from "react-icons/im";

export default function Submit({ busy, type, onClick, className, children }) {
  return (
    <button
      type={type || "submit"}
      onClick={onClick}
      className={"flex items-center p-2 w-full rounded dark:hover:bg-opacity-90 hover:bg-opacity-90 transition font-semibold drop-shadow " + className}
    >
      {busy ? <ImSpinner3 className="animate-spin" size={20} /> : children}
    </button>
  );
}
