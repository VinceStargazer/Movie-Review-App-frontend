import React from "react";

const commonPosterUI =
  "flex justify-center items-center border-2 border-dashed rounded dark:border-dark-subtle border-light-subtle cursor-pointer dark:hover:border-zinc hover:border-secondary";

export default function PosterSelector({
  name,
  accept,
  selectedPoster,
  onChange,
  className,
  title
}) {
  return (
    <div>
      <input
        id={name}
        name={name}
        accept={accept}
        onChange={onChange}
        type="file"
        hidden
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            className={commonPosterUI + " object-cover " + className}
            src={selectedPoster}
            alt=""
          />
        ) : (
          <PosterUI className={className} title={title} />
        )}
      </label>
    </div>
  );
}

const PosterUI = ({ className, title }) => {
  return (
    <div className={commonPosterUI + " " + className}>
      <span className="dark:text-dark-subtle text-light-subtle hover:dark:text-white hover:text-primary">
        {title}
      </span>
    </div>
  );
};
