type SentenceProps = {
  currentSentence: string;
};

function Sentence({ currentSentence }: SentenceProps) {
  return (
    <div>
      <p>{currentSentence}</p>
    </div>
  );
}

export default Sentence;
