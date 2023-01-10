import React from "react";

export default function Pagination({
  currPage,
  itemPerPage,
  items,
  type,
  onClick,
  onNext,
}) {
  const pages = Math.floor((items.length + itemPerPage - 1) / itemPerPage);
  const pageArr = new Array(pages).fill("");

  return (
    <div className="flex relative border-t-[1px] dark:border-fourth border-light-fourth py-2">
      <div className="dark:text-gray text-tertiary">
        {`${currPage * itemPerPage + 1}-${Math.min(
          (currPage + 1) * itemPerPage + 1,
          items.length
        )} of ${items.length} ${type}`}
      </div>
      <div className="space-x-3 absolute flex right-0">
        {pageArr.map((_, index) => (
          <button
            key={index}
            onClick={() => onClick(index)}
            disabled={currPage === index}
            className={
              currPage === index
                ? "dark:text-gray text-tertiary"
                : "dark:text-dark-blue text-light-blue hover:underline transition"
            }
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-4 dark:text-dark-blue text-light-blue hover:underline transition"
          type="button"
          onClick={onNext}
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
}
