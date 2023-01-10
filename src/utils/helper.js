import { decodeMovieGenres, decodeTvGenres } from "./genres";

export const isValidEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const commonInputClasses =
  "w-full bg-transparent outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-zinc focus:border-secondary transition dark:text-white text-primary";

export const getHeaders = () => {
  const token = localStorage.getItem("auth-token");
  return {
    authorization: "Bearer " + token,
    "content-type": "application/json",
  }
}

export const catchError = (error) => {
  const { response } = error;
  if (response?.data) return response.data;
  return { error: error.message || error };
}

export const renderItem = ({ id, name, avatar }) => {
  return (
    <div key={id} className="flex">
      <img
        src={avatar}
        alt={name}
        className="w-16 h-16 rounded object-cover mr-2"
      />
      <p className="dark:text-white font-semibold">{name}</p>
    </div>
  );
};

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

export const trimTitle = (text = "", limit = 20) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + "..";
};

export const decodeGenre = (genreId) => {
  return decodeMovieGenres.get(parseInt(genreId)) || decodeTvGenres.get(parseInt(genreId));
}