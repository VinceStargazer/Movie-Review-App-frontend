import React, { useState } from "react";
import { genres } from "../../utils/genres";
import Submit from "../form/Submit";
import ModalContainer from "./ModalContainer";

export default function GenresModal({ visible, onClose, onSubmit }) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreSelect = (genre) => {
    if (selectedGenres.includes(genre)) {
      const newGenres = selectedGenres.filter((g) => g !== genre);
      setSelectedGenres([...newGenres]);
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = () => {
    onSubmit(selectedGenres);
    onClose();
  }

  return (
    <ModalContainer visible={visible} onClose={handleSubmit} ignoreContainer containerId="genres-container">
      <div className="flex flex-col justify-between space-y-3 dark:bg-primary bg-white rounded max-w-[50rem] max-h-[40rem] p-2">
        <h1 className="dark:text-white text-primary text-2xl font-semibold text-center">
          Select Genres
        </h1>
        <div className="space-y-3">
          {genres.map((genre) => {
            return (
              <Genre
                selected={selectedGenres.includes(genre)}
                onClick={() => handleGenreSelect(genre)}
              >
                {genre}
              </Genre>
            );
          })}
        </div>
        <Submit
          onClick={handleSubmit}
          value="Select"
          type="button"
        />
      </div>
    </ModalContainer>
  );
}

const Genre = ({ children, selected, onClick }) => {
  return (
    <button
      className={
        "border-2 w-[15%] p-1 rounded mr-3 dark:border-dark-subtle border-light-subtle " +
        (selected
          ? "dark:bg-zinc bg-secondary dark:text-primary text-white font-semibold"
          : "dark:text-white text-primary border-2 hover:font-semibold transition")
      }
      key={children}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
