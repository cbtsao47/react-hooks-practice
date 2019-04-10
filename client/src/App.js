import React, { useState } from "react";
// `useSomething` uses hooks
// useState
// returns currentState and setState in an array
// const [currentState, setState]=useState({})
//the state returned by useState is not merged with the state

import CharPicker from "./components/CharPicker";
import Character from "./components/Character";

const App = props => {
  const [state, setState] = useState({
    selectedCharacter: 1,
    destroyed: false
  });
  const [selectedCharacter, setSelectedCharacter] = useState(1);
  const [chosenSide, setChosenSide] = useState("light");
  const [destroyed, setDestroyed] = useState(false);

  const sideHandler = side => {
    setChosenSide(side); // copy the original state because setState here does not merge
  };

  const charSelectHandler = event => {
    const charId = event.target.value;
    setSelectedCharacter(charId);
  };

  const destructionHandler = () => {
    setDestroyed(true);
  };

  let content = (
    <React.Fragment>
      <CharPicker
        side={chosenSide}
        selectedChar={selectedCharacter}
        onCharSelect={charSelectHandler}
      />
      <Character selectedChar={selectedCharacter} />
      <button onClick={() => sideHandler("light")}>Light Side</button>
      <button onClick={() => sideHandler("dark")}>Dark Side</button>
      {chosenSide === "dark" && (
        <button onClick={destructionHandler}>DESTROY!</button>
      )}
    </React.Fragment>
  );

  if (destroyed) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
};

export default App;
