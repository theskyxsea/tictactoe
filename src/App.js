import React, { useState, useEffect } from "react";
import "./App.css";
import Tictactoev3 from "./components/Tictactoev3";
//import Tiktac from "./components/Tiktac";
import Playermode from "./components/Playermode";
//import Tiktacv3 from "./components/tictacv3";
// import Hooksuse1 from "./components/Hooksuse1";
export const player1Context = React.createContext();
export const player2Context = React.createContext();

function App() {
  const [playerMode, setplayerMode] = useState(true);
  const [submit, setsubmit] = useState(false);
  const [player1, setplayer1] = useState();
  const [player2, setplayer2] = useState();
  const submitHandler = () => {
    setsubmit(true);
  };
  const changeSetting = (bool) => {
    setplayerMode(bool);
  };

  useEffect(() => {
    document.title = "Tic Tac Toe";
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>TIC - TAC - TOE</header>
      {/* <Hooksuse1 /> */}
      {/* <Tiktac /> */}
      {submit ? (
        <Tictactoev3 playerMode={playerMode} name1={player1} name2={player2} />
      ) : (
        <player1Context.Provider value={{ player1, setplayer1 }}>
          <player2Context.Provider value={{ player2, setplayer2 }}>
            <Playermode
              changeSetting={changeSetting}
              playerMode={playerMode}
              submitHandler={submitHandler}
              submit={submit}
            />
          </player2Context.Provider>
        </player1Context.Provider>
      )}
    </div>
  );
}

export default App;
