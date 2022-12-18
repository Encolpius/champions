import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCardObj } from "../store/playerUiSlice";
import { getDisplayName } from "../plugins/lotrlcg/functions/helpers";
import { useGameL10n } from "../../hooks/useGameL10n";
import BroadcastContext from "../../contexts/BroadcastContext";
import { useGameDefinition } from "./functions/useGameDefinition";
import { useDoActionList } from "./functions/useDoActionList";


export const ReminderButton = React.memo(({
  triggerCardIds
}) => {
  const {gameBroadcast, chatBroadcast} = useContext(BroadcastContext);
  const dispatch = useDispatch();
  const numTriggers = triggerCardIds ? triggerCardIds.length : 0;
  const cardById = useSelector(state => state?.gameUi?.game?.cardById);
  const playerN = useSelector(state => state?.playerUi?.playerN)
  const triggerCard = triggerCardIds?.length === 1 ? cardById[triggerCardIds[0]] : null;
  const targetTriggers = (event) => {
    event.stopPropagation();
    if (!playerN) return;
    // Remove targets from all cards you targeted
    gameBroadcast("game_action", {
        action: "action_on_matching_cards", 
        options: {
            criteria:[["targeting", playerN, true]], 
            action: "update_card_values", 
            options: {updates: [["targeting", playerN, false]]}
        }
    });
    chatBroadcast("game_update", {message: "removes targets."})
    gameBroadcast("game_action", {action: "target_card_ids", options:{card_ids: triggerCardIds}});
    for (var cardId of triggerCardIds) {
      const card = cardById[cardId];
      const displayName = getDisplayName(card);
      chatBroadcast("game_update", {message: "targeted "+displayName+"."});
    }
  }  
  const handleStartHover = () => {
    dispatch(setActiveCardObj({
      card: triggerCard,
      mousePosition: "top", 
      screenPosition: "left",
      clicked: false,
      setIsActive: null,
      groupId: null,
      groupType: null,
      cardIndex: null,
  }));
  }
  const handleStopHover = () => {
    dispatch(setActiveCardObj(null));
  };
  return(
    <div 
      className="absolute flex items-center justify-center bg-red-800 hover:bg-red-600 border"
      style={{height:"2.5vh", width:"2.5vh", right:"-2vh", borderRadius: "2.5vh"}}
      onClick={(event) => targetTriggers(event)}
      onMouseEnter={() => handleStartHover()}
      onMouseLeave={() => handleStopHover()}>
      {numTriggers}
    </div>
  )
})

export const SideBarRoundStep = React.memo(({
  stepInfo
}) => {
  const {gameBroadcast, chatBroadcast} = useContext(BroadcastContext);
  const l10n = useGameL10n();
  const gameDef = useGameDefinition();
  const stepId = stepInfo?.stepId;
  const currentStepIndex = useSelector(state => state?.gameUi?.game?.stepIndex);
  const currentStepId = gameDef?.steps?.[currentStepIndex]?.stepId;
  const playerN = useSelector(state => state?.playerUi?.playerN)
  const triggerCardIds = useSelector(state => state?.gameUi?.game?.triggerMap?.[stepId]);
  const numTriggers = triggerCardIds ? triggerCardIds.length : 0;
  const [hovering, setHovering] = useState(null);
  const isRoundStep = (currentStepId === stepId);
  const doActionList = useDoActionList();

  console.log("Rendering SideBarRoundStep", stepInfo);
  const handleButtonClick = (id) => {
    if (!playerN) return;
    var stepIndex = 0;
    gameDef.steps.forEach((stepInfoI, index) => {
      if (stepInfoI.stepId == stepId) stepIndex = index;
    });
    doActionList([
      ["GAME_SET_VAL", "stepIndex", stepIndex],
      ["GAME_ADD_MESSAGE", "$PLAYER_N", " set the round step to ", stepInfo.text, "."]
    ])
  }

  return (
    <div 
      key={stepId}
      className={`flex flex-1 items-center`} 
      style={{
        width: hovering ? "750px" : "100%",
        fontSize: "1.7vh",
      }}
      onClick={() => handleButtonClick()}
      onMouseEnter={() => setHovering(stepId)}
      onMouseLeave={() => setHovering(null)}>
      <div className="flex justify-center" style={{width:"3vh"}}/>
      <div className={`flex h-full items-center justify-center ${isRoundStep ? "bg-red-800" : "bg-gray-500"} ${stepInfo.actions ? "underline" : ""}`} style={{width:"3vh"}}>
        {stepId}
      </div>
      {numTriggers > 0 &&
        <ReminderButton
          triggerCardIds={triggerCardIds}/>
      }
      <div className={`flex flex-1 h-full items-center justify-center ${isRoundStep ? "bg-red-800" : "bg-gray-500"} ${hovering ? "block" : "hidden"}`} >
        <div dangerouslySetInnerHTML={{ __html: l10n(stepId) }} />
      </div>
    </div>
  )
})