import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import ModalContainer from "./ModalContainer";

const stars = new Array(10).fill("");

export default function RatingForm({
  title,
  action,
  visible,
  onClose,
  onDelete,
  onSubmit,
  defaultRating,
  defaultContent,
}) {
  const reviewedBtn = "dark:bg-highlight-dark bg-highlight-deep text-primary";
  const initialBtn =
    "dark:bg-dark-subtle bg-light-subtle dark:text-zinc text-secondary";

  const [rating, setRating] = useState(defaultRating);
  const [finalRating, setFinalRating] = useState(defaultRating);
  const [content, setContent] = useState(defaultContent);
  const [btnClass, setBtnClass] = useState(
    action === "Rate" ? initialBtn : reviewedBtn
  );

  const handleMouseEnter = (index) => {
    const newRating = new Array(index + 1).fill("");
    setRating(newRating);
  };

  const handleMouseClick = () => {
    if (action === "Rate") setBtnClass(reviewedBtn);
    setFinalRating([...rating]);
  };

  const handleChange = ({ target }) => {
    setContent(target.value);
  };

  const handleSubmit = () => {
    if (!finalRating.length) return;
    const data = {
      content: content,
      rating: finalRating.length,
    };
    onClose();
    onSubmit(data);
  };

  return (
    <ModalContainer
      visible={visible}
      onClose={onClose}
      ignoreContainer
      containerId="review-modal"
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => onClose()}
          className="absolute -top-8 right-4 dark:text-white text-primary z-10"
        >
          <MdOutlineClose size={24} />
        </button>
        <div className="dark:bg-secondary bg-zinc rounded">
          <div className="absolute w-full dark:text-dark-blue text-light-blue -top-10 flex items-center justify-center">
            <BsStarFill size={80} />
          </div>

          <div className="absolute w-full text-white -top-2 flex items-center justify-center z-10 transition">
            {rating.length || "?"}
          </div>

          <div className="px-20 py-10 space-y-3">
            <h1 className="dark:text-highlight-dark text-highlight-deep text-center text-xs font-semibold mt-3">
              {action === "Rate" ? "RATE THIS" : "UPDATE THIS"}
            </h1>
            <h1 className="dark:text-white text-primary text-center text-lg">
              {title}
            </h1>

            <div className="relative flex">
              <div className="flex space-x-1 dark:text-light-fourth text-fourth items-center">
                {stars.map((_, index) => (
                  <AiOutlineStar
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => setRating([...finalRating])}
                    key={index}
                    size={28}
                  />
                ))}
              </div>

              <div className="absolute flex dark:text-dark-blue text-light-blue space-x-1 items-center">
                {rating.map((_, index) => (
                  <AiFillStar
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => setRating([...finalRating])}
                    onClick={handleMouseClick}
                    key={index}
                    size={28}
                  />
                ))}
              </div>
            </div>

            <textarea
              value={content}
              onChange={handleChange}
              maxLength="1000"
              className="w-full h-44 border-2 dark:border-light-fourth border-fourth p-2 dark:text-white text-primary rounded outline-none bg-transparent custom-scroll-bar"
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className={
                "flex items-center justify-center w-full rounded hover:bg-opacity-90 dark:hover:bg-opacity-90 transition font-semibold h-9 " +
                btnClass
              }
            >
              {action}
            </button>

            {onDelete && (
              <button
                type="button"
                className="absolute left-0 text-sm flex items-center justify-center w-full dark:text-dark-subtle text-light-subtle hover:dark:text-light-fourth hover:text-fourth transition"
                onClick={onDelete}
              >
                Delete this review
              </button>
            )}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}
