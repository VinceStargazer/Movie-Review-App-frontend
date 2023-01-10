export const validateMovie = (movieInfo) => {
  const {
    title,
    storyline,
    releaseDate,
    status,
    type,
    language,
    length,
    genres,
    tags,
    cast,
  } = movieInfo;
  if (!title.trim()) return { error: "Title is missing!" };
  if (!storyline.trim()) return { error: "Storyline is missing!" };
  if (!releaseDate.trim()) return { error: "Release Date is missing!" };
  if (!status.trim()) return { error: "Status is missing!" };
  if (!type.trim()) return { error: "Type is missing!" };
  if (!language.trim()) return { error: "Language is missing!" };
  if (isNaN(length) || Number(length) < 1)
    return { error: "Runtime must be a positive integer!" };
  if (!genres.length) return { error: "Genres are missing!" };
  for (let gen of genres) {
    if (!gen.trim()) return { error: "Invalid genres!" };
  }
  if (!tags.length) return { error: "Tags are missing!" };
  for (let tag of tags) {
    if (!tag.trim()) return { error: "Invalid tags!" };
  }
  if (!cast.length) return { error: "Cast are missing!" };
  for (let c of cast) {
    if (typeof c !== "object") return { error: "Invalid cast!" };
  }
  return { error: null };
};
