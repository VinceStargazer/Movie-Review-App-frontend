import React, { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";

export default function DropDownLinks({ options }) {
  const { authInfo } = useAuth();
  const { name } = authInfo.profile;

  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="flex items-center justify-between relative">
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => setShowOptions(true)}
          className={
            (showOptions
              ? "text-zinc border-zinc"
              : "border-dark-subtle text-dark-subtle") +
            " flex items-center space-x-2 transition hover:text-zinc hover:border-zinc font-semibold border-2 rounded px-3 py-1"
          }
        >
          <FaUserCircle />
          <span>{name}</span>
          <TiArrowSortedDown />
        </button>
        <CreateOptions
          visible={showOptions}
          onClose={() => setShowOptions(false)}
          options={options}
        />
      </div>
    </div>
  );
}

const CreateOptions = ({ options, visible, onClose }) => {
  const container = useRef();
  const containerID = "options-container";

  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;
      if (parentElement.id === containerID || id === containerID) return;

      if (container.current) {
        if (!container.current.classList.contains("animate-scale"))
          container.current.classList.add("animate-scale-reverse");
      }
    };

    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <div
      id={containerID}
      ref={container}
      className="absolute right-0 w-full top-10 z-20 flex flex-col bg-secondary py-2 drop-shadow-xl rounded animate-scale"
      onAnimationEnd={(e) => {
        if (e.target.classList.contains("animate-scale-reverse")) onClose();
        e.target.classList.remove("animate-scale");
      }}
    >
      {options.map(({ title, to }, index) => {
        return (
          <Link
            key={index}
            to={to}
            onClick={onClose}
            className="px-4 py-2 text-white hover:underline bg-secondary hover:bg-tertiary transition"
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
};
