import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from "react-redux";
import { setShowHotkeys } from "../../../store/playerUiSlice";
import { useGameL10n } from "../../../../hooks/useGameL10n";
import { useGameDefinition } from "../../../engine/functions/useGameDefinition";

const keyClass = "m-auto border bg-gray-500 text-center bottom inline-block";
const keyClassLong = "m-auto border bg-gray-500 text-center bottom inline-block";
const keyStyle = {width: "3vh", height: "3vh", borderRadius: "0.5vh"}
const keyStyleL = {width: "7vh", height: "3vh", borderRadius: "0.5vh"}
const keyStyleXL = {width: "9vh", height: "3vh", borderRadius: "0.5vh"}
const windowClass = "insert-auto overflow-auto bg-gray-700 border max-w-lg rounded-lg outline-none text-white";
const windowStyle = {
  position:"absolute", 
  zIndex: 2e4, 
  right: "30px", 
  top: "200px", 
  width:"500px", 
  height: "600px",
}
const windowClassL = "insert-auto overflow-auto bg-gray-700 border rounded-lg outline-none text-white";
const windowStyleL = {
  position:"absolute", 
  zIndex: 2e4, 
  left: "3vw", 
  top: "3vh", 
  width:"94vw", 
  height: "94vh",
}
const col1Class = "w-1/3";
const col2Class = "w-2/3";

export const Hotkeys = React.memo(({}) => {
  const dispatch = useDispatch();
  const gameDef = useGameDefinition();
  const l10n = useGameL10n();
  const showWindow = useSelector(state => state?.playerUi?.showHotkeys);
  const tabPressed = useSelector(state => state?.playerUi?.keypress?.Tab);
  if (!showWindow && !tabPressed) return;

  const iconImg = (tokenType) => {
    return(<img className="m-auto h-6 inline-block" src={process.env.PUBLIC_URL + '/images/tokens/'+tokenType+'.png'}/>)
  }

  const tokenTable = () => {
    return(
      <table className="table-fixed rounded-lg w-full">
        <tr className="bg-gray-800">
          <th className={col1Class} >{l10n("Key")}</th>
          <th className={col2Class} >{l10n("Description")}</th>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Space</div></td>
          <td className="p-1 text-center">{l10n("Display all tokens")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>0</div></td>
          <td className="text-center">{l10n("Remove all tokens")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>1</div></td>
          <td className="text-center">{iconImg("resource")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>2</div></td>
          <td className="text-center">{iconImg("progress")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>3</div></td>
          <td className="text-center">{iconImg("damage")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>4</div></td>
          <td className="text-center">{iconImg("time")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>5</div></td>
          <td className="text-center">{iconImg("willpower")}/{iconImg("threat")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>6</div></td>
          <td className="text-center">{iconImg("attack")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>7</div></td>
          <td className="text-center">{iconImg("defense")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>8</div></td>
          <td className="text-center">{iconImg("hitPoints")}</td>
        </tr>
      </table>
    )
  }

  const cardTable = () => {
    const cardHotkeys = gameDef.hotkeys?.card;
    console.log("cardHotkeys",cardHotkeys)
    if (cardHotkeys)
    return(
      <table className="table-fixed rounded-lg w-full">
        <tr className="bg-gray-800">
            <th className={col1Class}>{l10n("Key")}</th>
            <th className={col2Class}>{l10n("Description")}</th>
        </tr>
        {cardHotkeys.map((el, elIndex) => {
          console.log("cardHotkey",el)
          const keys = el.key.split("+")
          return (
            <tr className={elIndex % 2 == 0 ? "bg-gray-500" : "bg-gray-600"}>
              <td className="p-1 text-center">
                {keys.map((key, _keyIndex) => {
                  return (<div className={keyClass} style={key.length > 1 ? keyStyleL : keyStyle}>{key}</div>)
                })}
              </td>
              <td className="text-center">{l10n(el.label)}</td>
            </tr>
          );
        })}
{/*         <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>C</div></td>
          <td className="text-center">{l10n("Detach")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>F</div></td>
          <td className="text-center">{l10n("Flip")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>H</div></td>
          <td className="text-center">{l10n("Shuffle into owner's deck")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>Q</div></td>
          <td className="text-center">{l10n("Commit / uncommit from quest")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center">
            <div className={keyClass} style={keyStyleL}>Shift</div>
            <div className={keyClass} style={keyStyle}>Q</div></td>
          <td className="text-center">{l10n("Commit / uncommit from quest without exhausting / readying")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>S</div></td>
          <td className="text-center">{l10n("Deal shadow card")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>T</div></td>
          <td className="text-center">{l10n("Target card")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>V</div></td>
          <td className="text-center">{l10n("Add to victory display")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>W</div></td>
          <td className="text-center">{l10n("Start/stop drawing arrow")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>X</div></td>
          <td className="text-center">{l10n("Discard")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass} style={keyStyle}>C</div></td>
          <td className="text-center">{l10n("Discard all other cards in this card's stack")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>B</div></td>
          <td className="text-center">{l10n("Send attachment to back of stack")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass} style={keyStyle}>A</div></td>
          <td className="text-center">{l10n("Trigger ability (only available for select cards).")}</td>
        </tr> */}
      </table>
    )
  }

  const gameTable = () => {
    return(
      <table className="table-fixed rounded-lg w-full">
        <tr className="bg-gray-800">
          <th className={col1Class} >{l10n("Key")}</th>
          <th className={col2Class} >{l10n("Description")}</th>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>D</div></td>
          <td className="text-center">{l10n("Draw card")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>E</div></td>
          <td className="text-center">{l10n("Reveal encounter card")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>E</div></td>
          <td className="text-center">{l10n("Deal facedown encounter card")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyle}>K</div></td>
          <td className="text-center">{l10n("Reveal encounter card from second encounter deck")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>K</div></td>
          <td className="text-center">{l10n("Deal facedown encounter card from second encounter deck")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>M</div></td>
          <td className="text-center">{l10n("Mulligan")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>N</div></td>
          <td className="text-center">{l10n("Draw card and gain resources. If host, increment round.")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>O</div></td>
          <td className="text-center">{l10n("Calculate score")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>R</div></td>
          <td className="text-center">{l10n("Refresh and raise threat. If host, move 1st player token.")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>S</div></td>
          <td className="text-center">{l10n("Deal all shadow cards")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>X</div></td>
          <td className="text-center">{l10n("Discard all shadow cards")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center">
          <div className={keyClass+" inline-block"} style={keyStyle}>U</div></td>
          <td className="text-center">{l10n("Raise threat by 1")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center">
          <div className={keyClass+" inline-block"} style={keyStyle}>J</div></td>
          <td className="text-center">{l10n("Reduce threat by 1")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>P</div></td>
          <td className="text-center">{l10n("Save Game")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Esc</div></td>
          <td className="text-center">{l10n("Clear targets/arrows")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass+" inline-block"} style={keyStyle}>←</div>
          <div className="px-2 inline-block">or</div> 
          <div className={keyClass} style={keyStyleL}>Ctrl</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>Z</div>
          </td>
          <td className="text-center">{l10n("Undo one action")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass+" inline-block"} style={keyStyle}>→</div>
          <div className="px-2 inline-block">or</div> 
          <div className={keyClass} style={keyStyleL}>Ctrl</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>Y</div></td>
          <td className="text-center">{l10n("Redo one action")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Ctrl</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>←</div></td>
          <td className="text-center">{l10n("Undo until last round change")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Ctrl</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>→</div></td>
          <td className="text-center">{l10n("Redo until next round change")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass+" inline-block"} style={keyStyle}>↑</div></td>
          <td className="text-center">{l10n("Move to previous game step")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass+" inline-block"} style={keyStyle}>↓</div></td>
          <td className="text-center">{l10n("Move to next game step")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Ctrl</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>↑</div></td>
          <td className="text-center">{l10n("Move to previous phase")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Ctrl</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>↓</div></td>
          <td className="text-center">{l10n("Move to next phase")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass+" inline-block"} style={keyStyle}>+</div></td>
          <td className="text-center">{l10n("Increase card size (for your screen only)")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass+" inline-block"} style={keyStyle}>-</div></td>
          <td className="text-center">{l10n("Decrease card size (for your screen only)")}</td>
        </tr>
      </table>
    )
  }  
  const multiplayerTable = () => {
    return(
      <table className="table-fixed rounded-lg w-full">
        <tr className="bg-gray-800">
          <th className={col1Class}>{l10n("Key")}</th>
          <th className={col2Class}>{l10n("Description")}</th>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>L</div></td>
          <td className="text-center">{l10n("If host, enable multiplayer hotkeys.")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Ctrl</div><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>N</div> <div>or</div> 
          <div className={keyClass} style={keyStyleL}>Alt</div><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>N</div></td>
          <td className="text-center">{l10n("Press Shift+N for all players.")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Ctrl</div><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>R</div> <div>or</div> 
          <div className={keyClass} style={keyStyleL}>Alt</div><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>R</div></td>
          <td className="text-center">{l10n("Press Shift+R for all players.")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Ctrl</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>U</div></td>
          <td className="text-center">{l10n("Raise threat by 1 for all players.")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Ctrl</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>J</div></td>
          <td className="text-center">{l10n("Reduce threat by 1 for all players.")}</td>
        </tr>
        <tr className={"bg-gray-600"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass+" inline-block"} style={keyStyle}>W</div></td>
          <td className="text-center">{l10n("Sit in next open seat.")}</td>
        </tr>
        <tr className={"bg-gray-500"}>
          <td className="p-1 text-center"><div className={keyClass} style={keyStyleL}>Shift</div>
          <div className={keyClass} style={keyStyle}>D</div></td>
          <td className="text-center">{l10n("Draw card on behalf of next empty seat.")}</td>
        </tr>
      </table>
    )
  }


  if (tabPressed) {
    return(
      <div className={windowClassL} style={windowStyleL}>
        <div className="w-full p-3 overflow-y-scroll">
          <div className="w-1/3 float-left p-3">
            <h2 className="mb-2">{l10n("Tokens")}</h2>
            {l10n("Hover over the top/bottom half of the card when pressing the key to add/remove tokens.")}
            {tokenTable()}
          </div>
          <div className="w-1/3 float-left p-3">
            <h2 className="mb-2">{l10n("Card hotkeys")}</h2>
            {l10n("Hover over a card.")}
            {cardTable()}
            <h2 className="mb-2 mt-6">{l10n("Multiplayer hotkeys")}</h2>
            {l10n("Useful for two-handed play.")}
            {multiplayerTable()}
          </div>
          <div className="w-1/3 float-left p-3">
            <h2 className="mb-2">{l10n("Game hotkeys")}</h2>
            {gameTable()}
            </div>
        </div>
      </div>
    )
  }
  else {
    return(
      <Draggable>
        <div className={windowClass} style={windowStyle}>
          <div className="w-full bg-gray-500" style={{height: "25px"}}>
            <FontAwesomeIcon 
              className="ml-2" 
              icon={faTimes} 
              onMouseUp={() => dispatch(setShowHotkeys(false))} 
              onTouchStart={() => dispatch(setShowHotkeys(false))}/>
          </div>
          <div className="w-full p-3 overflow-y-scroll" style={{height: "523px"}}>
            <h2 className="mb-2">{l10n("Tokens")}</h2>
            {l10n("Hover over the top/bottom half of the card when pressing the key to add/remove tokens.")}
            {tokenTable()}
            <br />
            <h2 className="mb-2">{l10n("Card hotkeys")}</h2>
            {l10n("Hover over a card.")}
            {cardTable()}
            <br />
            <h2 className="mb-2">{l10n("Game hotkeys")}</h2>
            {gameTable()}
            <br />
            <h2 className="mb-2">{l10n("Multiplayer hotkeys")}</h2>
            {l10n("Useful for two-handed play.")}
            {multiplayerTable()}
          </div>
        </div>
      </Draggable>
    )
  }
})
