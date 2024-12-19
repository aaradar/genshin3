import { useState } from "react";
import styles from "./App.module.scss";
import { Background } from "./Background";
import { Buttons } from "./add-ons/Buttons";
import { Hutao } from "./add-ons/Hutao";
import NavBar from "./navigation/NavBar";
import SearchBar from "./navigation/SearchBar";
import Sentence from "./add-ons/Sentences";

const sentences = [
  "The Anemo Archon is a bit too undisciplined for me. If I were a god, I would not have allowed my realm to look so unorganized and ragged.",
  "Back in the age when the gods still walked upon the earth, the deity whom we now worship as Rex Lapis was but one among many.",
  "Today, of course, Wolvendom is presided over by the Great Wolf King of the North, and the ominous atmosphere that emanates from inside the forest is sufficient to deter most sober-headed visitors from approaching the area.",
  "To be, or not to be, that is the question.",
  'Thus the people of Sangonomiya named their island Watatsumi, meaning "god of the sea," for the Great Serpent was their god.',
  "A consultant of the Wangsheng Funeral Parlor, he is later revealed to be the Geo Archon, Morax, who has decided to experience the world from the perspective of a mortal.",
  "This is an age of gods and monsters. I wish not for dominion; yet I cannot watch the common folk suffer. ",
];

function App() {
  const [currentSentence, setCurrentSentence] = useState(
    sentences[Math.floor(Math.random() * sentences.length)]
  );
  const [userInput, setUserInput] = useState("");

  const handleClear = () => {
    setUserInput("");
    const newSentence = sentences[Math.floor(Math.random() * sentences.length)];
    setCurrentSentence(newSentence);
  };

  const handleInputChange = (input: string) => {
    setUserInput(input);
  };

  return (
    <div>
      <NavBar />
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <h1>Zhongli Piano</h1>
          <Sentence currentSentence={currentSentence} />
          <SearchBar
            currentSentence={currentSentence}
            userInput={userInput}
            onInputChange={handleInputChange}
            onClear={handleClear}
          />
          <p>ZhongliType</p>
          <Buttons />
        </header>
        <div>
          <Background />
        </div>
        <Hutao />
      </div>
    </div>
  );
}

export default App;
