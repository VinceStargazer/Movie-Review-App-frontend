import React, { useState } from "react";
import { searchActor } from "../../api/person";
import { useSearch } from "../../hooks";
import { renderItem } from "../../utils/helper";
import LiveSearch from "../LiveSearch";

export default function ProfileSelector({ name, onSelect }) {
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);

  const { handleSearch, resetSearch } = useSearch();

  const handleChange = ({ target }) => {
    const { value } = target;
    setValue(value);
    handleSearch(searchActor, value, setProfiles);
  };

  const handleSelect = (profile) => {
    if (name === "writers") setValue("");
    else setValue(profile.name);
    onSelect(profile);
    setProfiles([]);
    resetSearch();
  };

  return (
    <LiveSearch
      id={name}
      name={name}
      value={value}
      placeholder="Search profile"
      results={profiles}
      renderItem={renderItem}
      onChange={handleChange}
      onSelect={handleSelect}
    />
  );
}
