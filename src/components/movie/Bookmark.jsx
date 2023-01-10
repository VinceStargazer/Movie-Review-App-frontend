import React from "react";
import { AiOutlineCheck, AiOutlineHeart } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { ImSpinner3 } from "react-icons/im";
import { IoBookmarkSharp } from "react-icons/io5";

export default function Bookmark({ status, busy = false, onClick }) {
  return (
    <button
      type="button"
      title={
        status === 1
          ? "Click to remove from your watchlist"
          : status === 2
          ? "Reviewed"
          : "Click to add to your watchlist"
      }
      onClick={onClick}
      className={
        (status === 1
          ? "text-highlight-dark"
          : status === 2
          ? "text-green-400"
          : "opacity-60 text-secondary hover:text-fourth") +
        " absolute -top-[3px] -left-[8px] z-10 transition"
      }
    >
      <IoBookmarkSharp size={40} />
      <div className="text-white absolute top-[6px] left-[12px]">
        {busy ? (
          <ImSpinner3 size={16} className="animate-spin" />
        ) : status === 1 ? (
          <AiOutlineHeart size={16} />
        ) : status === 2 ? (
          <AiOutlineCheck size={16} />
        ) : (
          <FiPlus size={16} />
        )}
      </div>
    </button>
  );
}
