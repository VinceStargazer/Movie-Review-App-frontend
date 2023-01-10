import React, { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNotification } from "../../hooks";
import { commonInputClasses } from "../../utils/helper";
import { genderOptions } from "../../utils/options";
import PosterSelector from "../form/PosterSelector";
import Selector from "../form/Selector";

const defaultActorInfo = {
  name: "",
  about: "",
  gender: "",
  birthday: "",
  avatar: null,
};

const getToday = () => {
  return new Date().toISOString().slice(0, 10);
};

const validateActor = ({ name, about, gender, birthday, avatar }) => {
  if (!name?.trim()) return { error: "Actor name is missing!" };
  if (!about?.trim()) return { error: "About section is empty!" };
  if (!gender?.trim()) return { error: "Actor gender is missing!" };
  if (!birthday?.trim()) return { error: "Actor birthday is missing!" };
  if (avatar && !avatar.type?.startsWith("image"))
    return { error: "Invalidate image / avatar file!" };
  return { error: null };
};

export default function ActorForm({ title, btnTitle, busy, onSubmit }) {
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { name, value, files } = target;
    if (name === "avatar") {
      const avatar = files[0];
      setSelectedAvatar(URL.createObjectURL(avatar));
      return setActorInfo({ ...actorInfo, avatar });
    }
    setActorInfo({ ...actorInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateActor(actorInfo);
    if (error) return updateNotification("error", error);

    // submit form
    const formData = new FormData();
    for (let key in actorInfo) {
      if (key) formData.append(key, actorInfo[key]);
    }
    onSubmit(formData);
  };

  const { name, about, gender, birthday } = actorInfo;

  return (
    <div className="dark:bg-primary bg-white p-3 w-[35rem] space-y-2 rounded">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl dark:text-white text-primary">
          {title}
        </h1>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-3 py-1 bg-secondary dark:bg-zinc text-white dark:text-primary hover:opacity-80 transition rounded"
        >
          {busy ? <ImSpinner3 className="animate-spin dark:text-white" size={20} /> : btnTitle}
        </button>
      </div>
      <div className="flex space-x-3">
        <PosterSelector
          name="avatar"
          title="Select profile"
          className="aspect-square w-40"
          onChange={handleChange}
          accept="image/jpg, image/jpeg, image/png"
          selectedPoster={selectedAvatar}
        />
        <div className="flex-grow flex flex-col space-y-2">
          <input
            name="name"
            value={name}
            placeholder="Name"
            type="text"
            className={commonInputClasses + " border-b-2"}
            onChange={handleChange}
          />
          <textarea
            name="about"
            value={about}
            placeholder="About"
            className={
              commonInputClasses +
              " border-b-2 h-full resize-none overflow-auto custom-scroll-bar"
            }
            onChange={handleChange}
          />
          <div className="flex flex-row space-x-3">
            <div className="w-[50%]">
              <Selector
                name="gender"
                value={gender}
                label="Gender"
                options={genderOptions}
                onChange={handleChange}
              />
            </div>

            <input
              type="date"
              placeholder="Birthday"
              name="birthday"
              value={birthday}
              max={getToday()}
              className={commonInputClasses + " border-2 rounded w-[50%]"}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
