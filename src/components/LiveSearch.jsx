import React, { forwardRef, useEffect, useRef, useState } from "react";
import { commonInputClasses } from "../utils/helper";

export default function LiveSearch({
  name,
  value = "",
  placeholder = "",
  onChange = null,
  onSelect = null,
  results = [],
  resultContainerStyle,
  selectedResultStyle,
  renderItem = null,
  inputStyle
}) {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [defaultValue, setDefaultValue] = useState("");

  const handleFocus = () => {
    if (results.length) setDisplaySearch(true);
  };

  const handleBlur = () => {
    setDisplaySearch(false);
    setFocusIndex(-1);
  };

  const handleSelection = (selectedItem) => {
    if (selectedItem) {
      onSelect(selectedItem);
      handleBlur();
    }
  };

  const handleKeyDown = ({ key }) => {
    if (key === "ArrowDown") {
      setFocusIndex((focusIndex + 1) % results.length);
    } else if (key === "ArrowUp") {
      setFocusIndex((focusIndex - 1 + results.length) % results.length);
    } else if (key === "Enter") {
      handleSelection(results[focusIndex]);
    } else if (key === "Escape") {
      handleBlur();
    }
  };

  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : commonInputClasses + " rounded border-2 p-1";
  };

  useEffect(() => {
    if (results.length) return setDisplaySearch(true);
    setDisplaySearch(false);
  }, [results.length]);

  const handleChange = (e) => {
    setDefaultValue(e.target.value);
    onChange && onChange(e);
  };

  useEffect(() => {
    setDefaultValue(value);
  }, [value]);

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type="text"
        className={getInputStyle()}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        value={defaultValue}
        onChange={handleChange}
      />
      <SearchResults
        visible={displaySearch}
        results={results}
        focusIndex={focusIndex}
        onSelect={handleSelection}
        renderItem={renderItem}
        resultContainerStyle={resultContainerStyle}
        selectedResultStyle={selectedResultStyle}
      />
    </div>
  );
}

const SearchResults = ({
  visible,
  results = [],
  focusIndex,
  onSelect,
  renderItem,
  resultContainerStyle,
  selectedResultStyle,
}) => {
  const resultContainer = useRef();

  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusIndex]);

  if (!visible) return null;
  return (
    <div className="absolute z-50 right-0 left-0 top-10 bg-zinc dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 overflow-auto dark:text-white mt-1 custom-scroll-bar">
      {results.map((result, index) => {
        const getSelectedClass = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : "dark:bg-dark-subtle bg-light-subtle";
        };

        return (
          <ResultCard
            ref={index === focusIndex ? resultContainer : null}
            key={index.toString()}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={index === focusIndex ? getSelectedClass() : ""}
            onMouseDown={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const {
    item,
    renderItem,
    resultContainerStyle,
    selectedResultStyle,
    onMouseDown,
  } = props;

  const getClasses = () => {
    if (resultContainerStyle)
      return resultContainerStyle + " " + selectedResultStyle;
    return (
      selectedResultStyle +
      " cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition"
    );
  };

  return (
    <div onMouseDown={onMouseDown} ref={ref} className={getClasses()}>
      {renderItem(item)}
    </div>
  );
});
