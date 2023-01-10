import React from "react";

export default function FormInput({ name, label, placeholder, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        type="text"
        id={name}
        name={name}
        className="bg-transparent rounded border-2 border-light-subtle dark:border-dark-subtle dark:focus:border-white focus:border-primary transition w-full text-lg p-1 text-secondary dark:text-white peer"
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor={name}
        className="dark:text-dark-subtle text-light-subtle font-semibold dark:peer-focus:text-white peer-focus:text-secondary transition self-start"
      >
        {label}
      </label>
    </div>
  );
}
