import { useState } from "react";
import Menu from "./components/Menu";

import Game from "./apps/RockPaperScissors/RockPaperScissors";
import TypingTest from "./apps/TypingTest/TypingTest.jsx";


import "./apps/RockPaperScissors/RockPaperScissors.css";
import "./apps/TypingTest/TypingTest.css";

function App() {
  const [page, setPage] = useState("rps");

  return (
    <>
      <Menu setPage={setPage} />

      {page === "rps" && <Game />}
      {page === "typing" && <TypingTest />}
    </>
  );
}

export default App;