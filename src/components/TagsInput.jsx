import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function TagsInput({ name, onChange }) {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const input = useRef();
  const tagsInput = useRef();

  const handleChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "," || key === "Enter") {
      if (!tag) return;
      if (tags.includes(tag)) return setTag("");
      setTags([...tags, tag]);
      setTag("");
    } else if (key === "Backspace" && tags.length && !tag) {
      const newTags = tags.filter((_, index) => index !== tags.length - 1);
      setTags([...newTags]);
    }
  };

  const handleFocus = () => {
    tagsInput.current.classList.remove(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.add("dark:border-zinc", "border-secondary");
  };

  const handleBlur = () => {
    tagsInput.current.classList.add(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.remove("dark:border-zinc", "border-secondary");
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags([...newTags]);
  }; 

  useEffect(() => {
    onChange(tags);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  useEffect(() => {
    input.current?.scrollIntoView(false);
  }, [tag]);

  return (
    <div>
      <div
        ref={tagsInput}
        onKeyDown={handleKeyDown}
        className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full dark:text-zinc text-secondary flex items-center space-x-2 overflow-x-auto custom-scroll-bar transition"
      >
        {tags.map((t) => (
          <Tag onClick={() => removeTag(t)} key={t}>
            {t}
          </Tag>
        ))}
        <input
          ref={input}
          className="h-full flex-grow bg-transparent outline-none dark:text-white"
          type="text"
          id={name}
          placeholder="Tag one, Tag two..."
          value={tag}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

const Tag = ({ children, onClick }) => {
  return (
    <span className="dark:bg-white bg-primary dark:text-primary text-white flex items-center text-sm px-1 whitespace-nowrap">
      {children}
      <button onClick={onClick} type="button">
        <AiOutlineClose size={12} />
      </button>
    </span>
  );
};
