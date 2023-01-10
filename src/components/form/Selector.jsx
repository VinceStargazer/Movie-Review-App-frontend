import React from "react";

export default function Selector({
  name,
  value,
  label,
  onChange,
  options = [],
}) {
  return (
    <select
      className="w-full border-2 dark:border-dark-subtle border-light-subtle p-1 rounded dark:focus:border-zinc focus:border-secondary transition outline-none bg-transparent text-light-subtle dark:text-dark-subtle dark:focus:text-white focus:text-primary dark:bg-secondary bg-zinc"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">{label}</option>
      {options.map(({ title, value }) => {
        return (
          <option key={title} value={value}>
            {title}
          </option>
        );
      })}
    </select>
  );
}
