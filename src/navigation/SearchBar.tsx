import React from "react";
import styles from "./SearchBar.module.scss";

type SearchBarProps = {
  currentSentence: string;
  userInput: string;
  onInputChange: (input: string) => void;
  onClear: () => void;
};

function SearchBar({
  currentSentence,
  userInput,
  onInputChange,
  onClear,
}: SearchBarProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input === currentSentence.slice(0, input.length)) {
      onInputChange(input); // Update only if the input matches the sentence
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && userInput === currentSentence) {
      onClear(); // Reset input and generate new sentence
    }
  };

  return (
    <div className={styles["search-bar-container"]}>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Write here..."
        className={styles["search-input"]}
      />
      <button onClick={onClear} className={styles["search-button"]}>
        Clear
      </button>
    </div>
  );
}

export default SearchBar;
