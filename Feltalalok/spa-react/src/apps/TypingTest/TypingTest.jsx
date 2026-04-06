import React, { useState, useEffect, useRef } from "react";
import "./TypingTest.css";

const TypingTest = () => {
  const paragraphs = [
    `A plant is one of the most important living things that
    develop on the earth and is made up of stems, leaves, 
    roots, and so on. Parts of Plants: The part of the plant
    that developed beneath the soil is referred to as root 
    and the part that grows outside of the soil is known as shoot.
    The shoot consists of stems, branches, leaves, fruits, 
    and flowers. Plants are made up of six main parts: roots, stems,
    leaves, flowers, fruits, and seeds.`,
    
    `The root is the part of the plant that grows in the soil.`,
    
    `The primary root emerges from the embryo. Its primary
    function is to provide the plant stability in the earth
    and make other mineral salts from the earth available to the plant
    for various metabolic processes. There are three types of roots i.e. Tap Root, 
    Adventitious Roots, and Lateral Root. The roots arise from 
    the parts of the plant and not from the rhizomes roots.`,
    
    `Stem is the posterior part that remains above the ground 
    and grows negatively geotropic. Internodes and nodes are 
    found on the stem. Branch, bud, leaf, petiole, flower, and
    inflorescence on a node are all those parts of the plant 
    that remain above the ground and undergo negative subsoil 
    development. The trees have brown bark and the young and
    newly developed stems are green. The roots arise from the 
    parts of plant and not from the rhizomes roots.`,
    
    `It is the blossom of a plant. A flower is the part of a plant 
    that produces seeds, which eventually become other flowers. They 
    are the reproductive system of a plant. Most flowers consist of 
    4 main parts that are sepals, petals, stamens, and carpels.
    The female portion of the flower is the carpels. The majority 
    of flowers are hermaphrodites, meaning they have both male and female components. Others may 
    consist of one of two parts and may be male or female.`,
    
    `An aunt is a bassoon from the right perspective. 
    As far as we can estimate, some posit the melic myanmar to 
    be less than kutcha. One cannot separate foods from blowzy bows.
    The scampish closet reveals itself as a sclerous llama to 
    those who look. A hip is the skirt of a peak. Some hempy laundries 
    are thought of simply as orchids. A gum is a trumpet from 
    the right perspective. A freebie flight is a wrench of the mind. Some
    posit the croupy.`
  ];

  const fullText = paragraphs.join(" "); 

  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); 
  const [mistakes, setMistakes] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isTyping) return;
    if (timeLeft <= 0) {
      setIsTyping(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
      const charsTyped = typedText.length;
      const mistakesCount = typedText
        .split("")
        .filter((c, i) => c !== fullText[i]).length;
      const cpm = Math.max(0, charsTyped - mistakesCount) * (60 / (300 - timeLeft));
      const wpm = Math.round((charsTyped - mistakesCount) / 5 * (60 / (300 - timeLeft)));
      setCPM(Math.floor(cpm));
      setWPM(Math.max(0, wpm));
    }, 1000);
    return () => clearInterval(timer);
  }, [isTyping, timeLeft, typedText, fullText]);

  const handleChange = (e) => {
    if (!isTyping) setIsTyping(true);
    const value = e.target.value;
    setTypedText(value);
    const mistakesCount = value
      .split("")
      .filter((c, i) => c !== fullText[i]).length;
    setMistakes(mistakesCount);
  };

  const resetTest = () => {
    setTypedText("");
    setTimeLeft(300);
    setMistakes(0);
    setWPM(0);
    setCPM(0);
    setIsTyping(false);
    inputRef.current.focus();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="typing-test">
      <h2>Typing Test</h2>

      <div className="text-display">
        {fullText.split("").map((char, index) => {
          let className = "char";
          if (index === typedText.length) className += " active";
          if (index < typedText.length) {
            className += typedText[index] === char ? " correct" : " wrong";
          }
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={typedText}
        onChange={handleChange}
        placeholder="Start typing here..."
        className="typing-input"
      />

      <div className="stats">
        <p>Time Left: {timeLeft}s</p>
        <p>Mistakes: {mistakes}</p>
        <p>WPM: {WPM}</p>
        <p>CPM: {CPM}</p>
      </div>

      <button className="btn" onClick={resetTest}>Reset</button>
    </div>
  );
};

export default TypingTest;