import React from "react";
import PlayerNaming from "./PlayerNaming";

function Playermode(props) {
  return (
    <div>
      <div>{props.playerMode ? "Play With Jarvis" : "Play With Friend"}</div>
      <p></p>
      <button
        onClick={() => {
          props.changeSetting(false);
        }}>
        Two Players
      </button>
      <button
        onClick={() => {
          props.changeSetting(true);
        }}>
        One Player
      </button>
      <p></p>
      <PlayerNaming oneplayer={props.playerMode} />
      <p></p>
      <div>
        <button
          onClick={() => {
            props.submitHandler();
          }}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Playermode;
