import React, { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

export default function DropDownBtns({ children, selected }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3 relative">
        <button
          type="button"
          onClick={() => setShowOptions(true)}
          className="dark:bg-primary bg-white flex items-center justify-between space-x-12 transition dark:text-light-fourth text-fourth dark:border-fourth border-light-fourth dark:hover:border-dark-subtle hover:border-light-subtle border-[1px] rounded px-2 py-1 "
        >
          <span>{selected}</span>
          <TiArrowSortedDown />
        </button>
        <CreateOptions
          visible={showOptions}
          onClose={() => setShowOptions(false)}
          options={children}
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
      onClick={onClose}
      className="absolute right-0 w-full top-9 z-20 flex flex-col dark:bg-primary bg-white outline outline-1 dark:outline-fourth outline-light-fourth py-2 drop-shadow-xl rounded animate-scale"
      onAnimationEnd={(e) => {
        if (e.target.classList.contains("animate-scale-reverse")) onClose();
        e.target.classList.remove("animate-scale");
      }}
    >
      {options}
    </div>
  );
};
