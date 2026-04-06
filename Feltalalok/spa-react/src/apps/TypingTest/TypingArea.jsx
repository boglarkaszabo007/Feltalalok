// TypingArea.jsx
import React from "react";
import "./TypingTest.css";

const TypingArea = ({ typingText, timeLeft, mistakes, WPM, CPM, resetGame }) => {
  return (
    <div className="typing-area">
      <h2>Typing Speed Test</h2>
      <p className="text-display">{typingText}</p>
      <div className="stats">
        <p>Time Left: {timeLeft}s</p>
        <p>Mistakes: {mistakes}</p>
        <p>WPM: {WPM}</p>
        <p>CPM: {CPM}</p>
      </div>
      <button onClick={resetGame}>Try Again</button>
    </div>
  );
};

export default TypingArea;