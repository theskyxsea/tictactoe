import React, { useState, useEffect } from "react";

function Tiktacv3(props) {
  const [alive, setalive] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [singlePlayMode, setsinglePlayMode] = useState(props.playerMode);
  const [move, setmove] = useState([]);
  const [winmsg, setwinmsg] = useState("");
  const [permenant, setpermenant] = useState([]);
  const [historyMode, sethistoryMode] = useState(false);
  const [control, setcontrol] = useState(true);
  const [num, setnum] = useState(0);
  const [first, setfirst] = useState(false);
  const [compMove, setcompMove] = useState(0);

  const checkCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function winnerCheck(playerarray) {
    setalive(true);
    playerarray.length === 9 ? setwinmsg("its tie") : setwinmsg("");
    for (let k = 0; k < checkCombination.length; k++) {
      let count1 = [];
      let count2 = [];
      for (let i = 0; i < checkCombination[k].length; i++) {
        for (let j = 0; j < playerarray.length; j++) {
          if (j % 2 === 0) {
            if (playerarray[j] === checkCombination[k][i]) {
              count1.push(checkCombination[k][i]);
              break;
            }
            // single player mode ***cheating***
            // if (!singlePlayMode) {
            //   if (playerarray[j] === checkCombination[k][i]) {
            //     count1.push(checkCombination[k][i]);
            //     break;
            //   }
            // }
          } else {
            if (playerarray[j] === checkCombination[k][i]) {
              count2.push(checkCombination[k][i]);
              break;
            }
          }
        }
      }
      if (count1.length >= checkCombination[k].length) {
        setalive(false);
        count1.map((x) => document.getElementById(x).classList.add("winState"));
        setwinmsg(`winner is ${props.name1}`);
      } else if (count2.length >= checkCombination[k].length) {
        setalive(false);
        count2.map((x) => document.getElementById(x).classList.add("winState"));
        setwinmsg(`winner is ${props.name2}`);
      }
    }
    if (move.length === 9 && winmsg === null) {
      setalive(false);
      setwinmsg("Its a tie");
    }
  }
  useEffect(() => {
    //console.log("object");
    if (!singlePlayMode) return;
    if (move.length > 7) return;
    if (!alive) return;
    if (compMove !== 0) return;
    singleplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compMove, move, alive]);

  const backhandler = () => {
    if (historyMode)
      return setwinmsg("turn of History Mode by selecting any box");
    if (!move.length) {
      setfirst(false);
      return;
    }
    //setmove(permenant);
    let temp = [...move];
    move.map((x) => document.getElementById(x).classList.remove("winState"));
    temp.pop();
    if (singlePlayMode) {
      temp.pop();
    }
    // feature of clearing game after decision
    if (winmsg) {
      temp = [];
      setfirst(false);
    }
    setmove(temp);
    setpermenant(temp);
  };

  const timelineHandler = (id) => {
    if (singlePlayMode) return;
    control ? setcontrol(false) : setcontrol(true);
    if (historyMode) {
      setmove((prevMove) => [...permenant]);
    }
    sethistoryMode(true);
    setnum(parseInt(id[1]));
  };

  useEffect(() => {
    document.title = winmsg ? winmsg : "Tic-Tac-Toe";
  }, [winmsg]);

  useEffect(() => {
    //singleplay();
    render(move);
    winnerCheck(move);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [move]);

  useEffect(() => {
    let temp = [...move];
    temp.splice(-num, num);
    setmove(temp);
    //console.log("use 2 called");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num, control]);

  const clickhandler = (i) => {
    if (!alive) return;
    if (historyMode) {
      sethistoryMode(false);
      setpermenant(move);
    }
    setfirst(true);
    setcompMove(0);
    setmove((prevMove) => [...prevMove, i]);
    setpermenant((pervPermenant) => [...pervPermenant, i]);
  };

  function render(move) {
    for (let i = 0; i < 9; i++) {
      document.getElementById(i).innerText = "";
      document.getElementById(i).disabled = false;
      document.getElementById(i).classList.remove("winState");
    }
    for (let i = 0; i < move.length; i++) {
      // console.log(i);
      if (i % 2 === 0) {
        document.getElementById(move[i]).innerText = "X";
      } else if (i % 2 !== 0) {
        document.getElementById(move[i]).innerText = "O";
      }
      document.getElementById(move[i]).disabled = true;
    }
  }

  function button(qty = 9, val = false, calss) {
    let butn = [];
    let roll = qty > 9 ? 9 : qty;
    for (let i = 0; i < roll; i++) {
      butn.push(
        <button
          key={val ? `a${i}` : i}
          className={calss ? calss : "player-btn"}
          id={i}
          onClick={
            val
              ? () => timelineHandler(`a${qty - i - 1}`)
              : () => clickhandler(i)
          }>
          {val ? i + 1 : ""}
        </button>
      );
    }
    return butn;
  }

  function singleplay() {
    // if (winmsg != "") return;
    if (!first) return;
    let x = Math.floor(Math.random() * 9);
    let found = false;
    while (found === false) {
      //console.log(x);
      for (let i = 0; i < move.length; i++) {
        if (move[i] === x) {
          found = true;
        }
      }
      if (found === false) {
        //if (winmsg !== "") return;
        clickhandler(x);
        setcompMove(1);
        break;
      } else {
        x = Math.floor(Math.random() * 9);
        found = false;
      }
    }
    //console.log("exicuted");
  }

  return (
    <div>
      <div>
        <p>
          {singlePlayMode
            ? `${props.name1} Vs Jarvis (Beta)`
            : `${props.name1} Vs ${props.name2}`}
        </p>
      </div>
      <p></p>
      <div class='table'>
        <img
          alt='Logo'
          src='https://www.pngitem.com/pimgs/m/256-2560570_transparent-man-icon-png-png-download.png'
        />
        <div className='btn-table'>{button()}</div>
        <div>
          {singlePlayMode ? (
            <img
              alt='Logo'
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXPzcJvVWFXfRm57X_BdY0Co0NNxyav9UTgA&usqp=CAU'
            />
          ) : (
            <img
              alt='Logo'
              src='https://www.pngitem.com/pimgs/m/256-2560570_transparent-man-icon-png-png-download.png'
            />
          )}
        </div>
      </div>
      <p></p>
      <div>{winmsg}</div>
      <div>
        <button
          onClick={() => {
            backhandler();
          }}>
          {winmsg ? "Replay" : `Back`}
        </button>
        <p></p>
      </div>
      <div id='timeline'>
        {historyMode
          ? button(permenant.length, true, "timeline")
          : button(move.length, true, "timeline")}
      </div>
    </div>
  );
}
export default Tiktacv3;
