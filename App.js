import { useState, useEffect } from "react";
import questions from "./data";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(10);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (time === 0) {
      nextQuestion();
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  const nextQuestion = () => {
    setSelected(null);
    const next = index + 1;
    if (next < questions.length) {
      setIndex(next);
      setTime(10);
    } else {
      setShowResult(true);
    }
  };

  const handleClick = (option) => {
    setSelected(option);
    if (option === questions[index].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setTime(10);
    setShowResult(false);
    setSelected(null);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>

      {showResult ? (
        <div className="result">
          <h2>Score: {score} / {questions.length}</h2>
          <button onClick={restart}>Retake Quiz</button>
        </div>
      ) : (
        <div className="card">
          <h3>{questions[index].question}</h3>
          <p>Time Left: {time}s</p>

          {questions[index].options.map((opt, i) => {
            let className = "option";

            if (selected) {
              if (opt === questions[index].answer) {
                className = "option correct";
              } else if (opt === selected) {
                className = "option wrong";
              }
            }

            return (
              <button
                key={i}
                className={className}
                onClick={() => handleClick(opt)}
                disabled={selected !== null}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;



