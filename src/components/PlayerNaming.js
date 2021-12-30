import React, { useContext } from "react";
import { player1Context, player2Context } from "../App";

function PlayerNaming(props) {
  const { player1, setplayer1 } = useContext(player1Context);
  const { player2, setplayer2 } = useContext(player2Context);
  const ip2 = () => {
    return (
      <div>
        <p></p>
        <div></div>
        <label>O Player Name : </label>
        <input
          id='player2'
          type='text'
          placeholder='Player Name'
          value={player2}
          onChange={(e) => {
            setplayer2(e.target.value);
          }}
        />
      </div>
    );
  };
  return (
    <div id='playrename'>
      <label>X Player Name : </label>
      <input
        id='player1'
        type='text'
        placeholder='Player Name'
        value={player1}
        onChange={(e) => {
          setplayer1(e.target.value);
        }}
      />
      {!props.oneplayer ? ip2() : console.log("no")}
    </div>
  );
}

export default PlayerNaming;
