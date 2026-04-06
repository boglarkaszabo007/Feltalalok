import { useState } from "react";

export default function Game() {
  const [player, setPlayer] = useState("");
  const [computer, setComputer] = useState("");
  const [score, setScore] = useState(0);

  const choices = ["ROCK", "PAPER", "SCISSORS"];

  const logic = (p, c) => {
    if (p === c) return 0;
    if (
      (p === "ROCK" && c === "SCISSORS") ||
      (p === "SCISSORS" && c === "PAPER") ||
      (p === "PAPER" && c === "ROCK")
    ) return 1;
    return -1;
  };

  const play = (choice) => {
    const comp = choices[Math.floor(Math.random()*3)];
    setPlayer(choice);
    setComputer(comp);

    const result = logic(choice, comp);
    setScore(score + result);
  };

  return (
    <div>
      <h2>Rock Paper Scissors</h2>

      {choices.map(c => (
        <button key={c} onClick={() => play(c)}>
          {c}
        </button>
      ))}

      <p>You: {player}</p>
      <p>Computer: {computer}</p>
      <p>Score: {score}</p>
    </div>
  );
}