import React, { useState } from "react";
import { commonInputClasses } from "../../utils/helper";
import TagsInput from "../TagsInput";
import Submit from "../form/Submit";
import { useNotification } from "../../hooks";
import WritersModal from "../modals/WritersModal";
import CastForm from "../form/CastForm";
import CastModal from "../modals/CastModal";
import PosterSelector from "../form/PosterSelector";
import GenreSelector from "../form/GenreSelector";
import GenresModal from "../modals/GenresModal";
import Selector from "../form/Selector";
import {
  languageOptions,
  typeOptions,
  statusOptions,
} from "../../utils/options";
import Label from "../form/Label";
import LabelWithBadge from "../form/LabelWithBadge";
import ViewAllBtn from "../form/ViewAllBtn";
import ProfileSelector from "./ProfileSelector";
import { validateMovie } from "../../utils/validator";

const defaultMovieInfo = {
  title: "",
  storyline: "",
  director: {},
  releaseDate: "",
  status: "",
  type: "",
  language: "",
  length: 0,
  genres: [],
  tags: [],
  cast: [],
  writers: [],
  poster: null,
  trailer: {
    url: "",
    public_id: "",
  },
};

export default function MovieForm({ onSubmit, busy }) {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState("");

  const { updateNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateMovie(movieInfo);
    if (error) return updateNotification("error", error);

    const { tags, genres, cast, writers, director, poster } = movieInfo;
    
    const finalMovieInfo = {...movieInfo};
    finalMovieInfo.tags = JSON.stringify(tags);
    finalMovieInfo.genres = JSON.stringify(genres);
    finalMovieInfo.cast = JSON.stringify(cast.map((c) => ({
      actor: c.profile.id,
      roleAs: c.roleAs,
      leadActor: c.leadActor
    })));
    if (writers.length) finalMovieInfo.writers = JSON.stringify(cast.map((w) => w.id));
    if (director.id) finalMovieInfo.director = director.id;
    if (poster) finalMovieInfo.poster = poster;

    const formData = new FormData();
    for (let key in finalMovieInfo)
      formData.append(key, finalMovieInfo[key]);

    onSubmit(formData);
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      setSelectedPoster(URL.createObjectURL(poster));
      setMovieInfo({ ...movieInfo, poster });
    } else {
      setMovieInfo({ ...movieInfo, [name]: value });
    }
  };

  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };

  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    for (let writer of writers) {
      if (writer.id === profile.id)
        return updateNotification(
          "warning",
          "The profile is already selected!"
        );
    }
    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };

  const removeWriter = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);
    if (!newWriters.length) setShowWritersModal(false);
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };

  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    for (let actor of cast) {
      if (actor.profile.id === castInfo.profile.id)
        return updateNotification(
          "warning",
          "The profile is already selected!"
        );
    }
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };

  const removeCast = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);
    if (!newCast.length) setShowCastModal(false);
    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  const updateGenres = (genres) => {
    setMovieInfo({ ...movieInfo, genres });
  };

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
    writers,
  } = movieInfo;

  return (
    <div>
      <div onSubmit={handleSubmit} className="flex space-x-6 p-2">
        <div className="w-[70%] space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="Titanic"
              type="text"
              className={commonInputClasses + " border-b-2 font-semibold"}
            />
          </div>

          <div>
            <Label htmlFor="storyline">Storyline</Label>
            <textarea
              id="storyline"
              name="storyline"
              value={storyline}
              onChange={handleChange}
              placeholder="Movie storyline"
              className={
                commonInputClasses +
                " border-b-2 resize-none h-24 custom-scroll-bar"
              }
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <TagsInput value={tags} name="tags" onChange={updateTags} />
          </div>

          <div>
            <Label htmlFor="director">Director</Label>
            <ProfileSelector name="director" onSelect={updateDirector} />
          </div>

          <div>
            <div className="flex justify-between">
              <LabelWithBadge htmlFor="writers" badge={writers.length}>
                Writers
              </LabelWithBadge>
              <ViewAllBtn
                visible={writers.length}
                onClick={() => setShowWritersModal(true)}
              />
            </div>
            <ProfileSelector name="writers" onSelect={updateWriters} />
          </div>

          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={cast.length}>Cast & Crew</LabelWithBadge>
              <ViewAllBtn
                visible={cast.length}
                onClick={() => setShowCastModal(true)}
              />
            </div>
            <CastForm onSubmit={updateCast} />
          </div>

          <div className="flex flex-row justify-content">
            <div className="flex justify-start w-[50%]">
              <Label htmlFor="releaseDate">Release date:</Label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={releaseDate}
                className={commonInputClasses + " border-2 rounded w-auto ml-2"}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end w-[50%]">
              <Label htmlFor="length">Runtime:</Label>
              <input
                type="number"
                id="length"
                name="length"
                value={length}
                className={
                  commonInputClasses + " border-2 rounded w-[20%] ml-2"
                }
                onChange={handleChange}
              />
              <span className="dark:text-dark-subtle text-light-subtle ml-1">
                minutes
              </span>
            </div>
          </div>

          <Submit busy={busy} value="Upload" type="button" onClick={handleSubmit} />
        </div>

        <div className="w-[30%] h-5 space-y-6">
          <PosterSelector
            name="poster"
            title="Select poster"
            onChange={handleChange}
            selectedPoster={selectedPoster}
            accept="image/jpg, image/jpeg, image/png"
            className="aspect-video"
          />

          <GenreSelector
            onClick={() => setShowGenresModal(true)}
            badge={genres.length}
          />
          <Selector
            name="type"
            value={type}
            label="Type"
            options={typeOptions}
            onChange={handleChange}
          />
          <Selector
            name="language"
            value={language}
            label="Language"
            options={languageOptions}
            onChange={handleChange}
          />
          <Selector
            name="status"
            value={status}
            label="Status"
            options={statusOptions}
            onChange={handleChange}
          />
        </div>
      </div>

      <WritersModal
        visible={showWritersModal}
        profiles={writers}
        onClose={() => setShowWritersModal(false)}
        onRemove={removeWriter}
      />

      <CastModal
        visible={showCastModal}
        cast={cast}
        onClose={() => setShowCastModal(false)}
        onRemove={removeCast}
      />

      <GenresModal
        visible={showGenresModal}
        onClose={() => setShowGenresModal(false)}
        onSubmit={updateGenres}
      />
    </div>
  );
}
