import React from 'react'
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import Submit from "./form/Submit";
import StdContainer from "./StdContainer";

export default function NotFound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen p-10 space-y-10 dark:bg-primary bg-white">
      <div className="flex flex-col justify-center items-center space-y-12 my-10 ">
        <h1 className="text-5xl dark:text-white text-primary font-semibold">
          SORRY
        </h1>
        <h1 className="text-3xl dark:text-zinc text-secondary">
          We couldn't find that page
        </h1>
        <button
          onClick={handleClick}
          className="text-2xl px-5 py-2 rounded dark:hover:bg-opacity-90 hover:bg-opacity-90 transition font-semibold drop-shadow space-x-1 dark:bg-highlight-dark bg-highlight-deep dark:text-secondary text-zinc"
        >
          Go to home page
        </button>
      </div>
    </div>
  );
}
