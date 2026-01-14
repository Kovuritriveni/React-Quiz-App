import { useState } from "react";
import questions from "./data";

export default function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const current = questions[index];

  const handleClick = (option) => {
    if (option === current.answer) {
      setScore(score + 1);
    }

    const next = index + 1;
    if (next < questions.length) {
      setIndex(next);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Quiz App</h1>

      {showResult ? (
        <h2>Your Score: {score} / {questions.length}</h2>
      ) : (
        <>
          <h3>{current.question}</h3>
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleClick(opt)}
              style={{ display: "block", margin: "10px auto", padding: "10px" }}
            >
              {opt}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
