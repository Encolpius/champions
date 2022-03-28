import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import RoomProviders from "./RoomProviders";
import {useSetMessages} from '../../contexts/MessagesContext';
import useChannel from "../../hooks/useChannel";
import { setGameUi } from "../store/gameUiSlice";
import useProfile from "../../hooks/useProfile";
import { resetPlayerUi } from "../store/playerUiSlice";

var delayBroadcast;

export const Room = ({ slug }) => {
  const dispatch = useDispatch();
  const gameName = useSelector(state => state.gameUi.gameName);
  const error = useSelector(state => state.gameUi.error);
  const setMessages = useSetMessages();
  const myUser = useProfile();
  const myUserId = myUser?.id;
  const [isClosed, setIsClosed] = useState(false);

  const onChannelMessage = useCallback((event, payload) => {
    if (!payload) return;
    console.log("Got new payload: ", event, payload);
    if (
      event === "phx_reply" &&
      payload.response != null &&
      payload.response.game_ui != null
    ) {
      const { game_ui } = payload.response;
      console.log("dispatching to game", game_ui)
      if (game_ui.error && !error) {
        alert("An error occured.");
      }
      if (gameName !== game_ui.gameName) { // Entered a new room
        // Reset player UI
        dispatch(resetPlayerUi())
      }
      // Simulate high ping/lag;
      //delayBroadcast = setTimeout(function() {
        dispatch(setGameUi(game_ui));
      //}, 2000);
      
    } else if (
      event === "phx_reply" &&
      payload.response != null &&
      payload.response.game_ui === null
    ) {
      if (!isClosed) {
        setIsClosed(true);
        alert("Your room has closed or timed out. If you were in the middle of playing, it may have crashed. If so, please go to the Menu and download the game state file. Then, create a new room and upload that file to continue where you left off.")
      }
    }

  }, [gameName]);

  const onChatMessage = useCallback((event, payload) => {
    if (
      event === "phx_reply" &&
      payload.response != null &&
      payload.response.messages != null
    ) {
      setMessages(payload.response.messages);
    }
  }, []);
  const gameBroadcast = useChannel(`room:${slug}`, onChannelMessage, myUserId);
  const chatBroadcast = useChannel(`chat:${slug}`, onChatMessage, myUserId);

  console.log('Rendering Room',myUserId);

  if (gameName !== slug) return (<div></div>);
  else {
    return (
      <RoomProviders 
        gameBroadcast={gameBroadcast} 
        chatBroadcast={chatBroadcast}/>
    );
  }
};
export default Room;
