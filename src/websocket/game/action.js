
import { displayAskPlayerWidget } from "../../../components/game/game/widgetContainerAskPlayer/widgetContainerAskPlayer.js";

export function gameActionsListen(socket) {
      socket.on("askPlayer", ({ event, params, roomId }) => {
    console.log("RECEIVE ORDER TO ASK PLAYER :>> ", { event, params, roomId });
    displayAskPlayerWidget(event, params, roomId);
  });
}