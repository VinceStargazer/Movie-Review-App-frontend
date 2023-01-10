import React, { useState } from "react";
import LiveSearch from "../LiveSearch";
import { commonInputClasses, renderItem } from "../../utils/helper";
import { useNotification, useSearch } from "../../hooks";
import { searchActor } from "../../api/person";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

export default function CastForm({ onSubmit }) {
  const { updateNotification } = useNotification();
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const [profiles, setProfiles] = useState([]);

  const { handleSearch, resetSearch } = useSearch();

  const handleChange = ({ target }) => {
    const { checked, name, value } = target;
    if (name === "leadActor")
      return setCastInfo({ ...castInfo, leadActor: checked });
    setCastInfo({ ...castInfo, [name]: value });
    if (name === "cast")
      handleSearch(searchActor, value, setProfiles);
  };

  const handleSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
    setProfiles([]);
    resetSearch();
  };

  const handleSubmit = () => {
    const { profile, roleAs } = castInfo;
    if (!profile.name)
      return updateNotification("error", "Cast profile is missing!");
    if (!roleAs.trim())
      return updateNotification("error", "Cast role is missing!");
    onSubmit(castInfo);
    setCastInfo({ ...defaultCastInfo });
  };

  const { profile, roleAs, leadActor } = castInfo;

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        title="Set as lead actor"
        name="leadActor"
        className="w-4 h-4"
        checked={leadActor}
        onChange={handleChange}
      />
      <LiveSearch
        id="cast"
        name="cast"
        value={profile.name}
        placeholder="Search profile"
        results={profiles}
        renderItem={renderItem}
        onChange={handleChange}
        onSelect={handleSelect}
      />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>
      <div className="flex-grow">
        <input
          type="text"
          className={commonInputClasses + " rounded p-1 border-2"}
          placeholder="Role as"
          name="roleAs"
          value={roleAs}
          onChange={handleChange}
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="dark:bg-zinc bg-secondary text-zinc dark:text-secondary rounded p-2 text-sm"
      >
        Add
      </button>
    </div>
  );
}
