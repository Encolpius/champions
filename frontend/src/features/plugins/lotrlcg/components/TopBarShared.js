import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import BroadcastContext from "../../../../contexts/BroadcastContext";
import useFocus from "../../../../hooks/useFocus";
import { useGameL10n } from "../../../../hooks/useGameL10n";
import { setValues } from "../../../store/gameUiSlice";
import { setTyping } from "../../../store/playerUiSlice";

var delayBroadcast;

export const TopBarShared = React.memo(({
  threat,
  progress
}) => {
  const {gameBroadcast, chatBroadcast} = useContext(BroadcastContext);
  const dispatch = useDispatch();
  const l10n = useGameL10n();
  const gameUiRound = useSelector(state => state?.gameUi?.game?.roundNumber);
  const playerN = useSelector(state => state?.playerUi?.playerN);
  const [roundValue, setRoundValue] = useState(gameUiRound);
  const [inputRefRound, setInputFocusRound] = useFocus();

  useEffect(() => {    
    if (gameUiRound !== roundValue) setRoundValue(gameUiRound);
  }, [gameUiRound]);

  const handleRoundChange = (event) => {
    const newValue = event.target.value;
    setRoundValue(newValue);
    // Set up a delayed broadcast to update the game state that interrupts itself if the button is clicked again shortly after.
    if (delayBroadcast) clearTimeout(delayBroadcast);
    delayBroadcast = setTimeout(function() {
      const updates = [["game", "roundNumber", parseInt(newValue)]];
      dispatch(setValues({updates: updates}));
      gameBroadcast("game_action", {action: "update_values", options:{updates: updates}});
      chatBroadcast("game_update",{message: "set round number to "+newValue+"."});
      setInputFocusRound();
    }, 400);
  }

  return(
    <div className="float-left h-full bg-gray-600" style={{fontSize: "1.7vh", width: "16%", borderLeft: "1px solid lightgrey"}}>
      <div className="float-left h-full w-1/3">
        <div className="h-1/2 w-full flex justify-center">
          {l10n("Round")}
        </div>
        <div className="h-1/2 w-full flex justify-center">
          <img className="h-full ml-1" src={process.env.PUBLIC_URL + '/images/tokens/time.png'}></img>
          <input 
            className="h-full w-1/2 float-left text-center bg-transparent" 
            value={roundValue}
            onChange={handleRoundChange}
            type="number" min="0" step="1"
            disabled={playerN ? false : true}
            onFocus={event => dispatch(setTyping(true))}
            onBlur={event => dispatch(setTyping(false))}
            ref={inputRefRound}>
          </input>
        </div>
      </div>
      <div className="float-left h-full w-1/3">
        <div className="h-1/2 w-full flex justify-center">
          {l10n("Staging")}
        </div>
        <div className="h-1/2 w-full flex justify-center">
          <div>{threat}</div>
          <img className="h-full ml-1" src={process.env.PUBLIC_URL + '/images/tokens/threat.png'}></img>
        </div>
      </div>
      <div className="float-left h-full w-1/3">
        <div className="h-1/2 w-full flex justify-center">
          {l10n("Progress")}
        </div>
        <div className="h-1/2 w-full flex justify-center">
          <div>{progress}</div>
          <img className="h-full ml-1" src={process.env.PUBLIC_URL + '/images/tokens/progress.png'}></img>
        </div>
      </div>
    </div>
  )
})