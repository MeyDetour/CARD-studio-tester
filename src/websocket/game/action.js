import { displayAskPlayerWidget } from "../../../components/game/statPage/topRowPlayerInformations/topRowPlayerInformations.js";
export function gameActionsListen(socket) {
      socket.on("askPlayer", ({ event, params }) => {
    console.log("RECEIVE ORDER TO ASK PLAYER :>> ", { event, params});
    displayAskPlayerWidget(event, params);
  });
}