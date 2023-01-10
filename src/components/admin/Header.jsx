import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineLightBulb } from "react-icons/hi";
import { useTheme } from "../../hooks";

export default function Header({ onAddMovieClick, onAddActorClick }) {
  const { toggleTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const options = [
    { title: "Add Movie", onClick: onAddMovieClick },
    { title: "Add Actor", onClick: onAddActorClick },
  ];

  return (
    <div className="flex items-center justify-between relative">
      <input
        type="text"
        className="border-2 border-light-subtle focus:border-primary dark:border-dark-subtle dark:focus:border-white transition text-lg p-1 text-secondary dark:text-white bg-transparent rounded outline-none"
        placeholder="Search Movies..."
      />
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="dark:bg-zinc bg-dark-subtle p-1 rounded"
        >
          <HiOutlineLightBulb
            className="text-light-subtle hover:text-secondary transition"
            size={24}
          />
        </button>
        <button
          onClick={() => setShowOptions(true)}
          className="flex items-center space-x-2 border-light-subtle hover:border-primary transition text-light-subtle hover:text-primary dark:hover:text-zinc dark:hover:border-zinc font-semibold border-2 rounded text-lg px-3 py-1 dark:border-dark-subtle dark:text-dark-subtle"
        >
          <span>Create</span>
          <AiOutlinePlus />
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

  const handleClick = (onClick) => {
    onClick();
    onClose();
  };

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
      className="absolute right-0 top-12 flex flex-col space-y-3 p-4 dark:bg-secondary bg-white drop-shadow-xl rounded animate-scale"
      onAnimationEnd={(e) => {
        if (e.target.classList.contains("animate-scale-reverse")) onClose();
        e.target.classList.remove("animate-scale");
      }}
    >
      {options.map(({ title, onClick }) => {
        return (
          <Option key={title} onClick={() => handleClick(onClick)}>
            {title}
          </Option>
        );
      })}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};
