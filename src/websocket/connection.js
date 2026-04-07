 
import { gameManagementListen } from "./game/management.js";
import { gameMessagerieListen } from "./game/messagerie.js";
import { websocketErrorListen } from "./error/error.js";
import { gameUpdatesListen } from "./game/updates.js";
import { gameConnectionsListen } from "./game/connections.js";
import { gameActionsListen } from "./game/action.js";

export let socket = null;
export async function connectSocket() {
  if (socket) return;
  socket = io("ws://localhost:8008");

  console.log("CONNECTED TO SOCKET SERVER");
  // expose on window so other legacy code can access it
  window.socket = socket;

  //===============GAME MANAGEMENT=============
  gameManagementListen(socket);

  //===============MESSAGERIE=============

  gameMessagerieListen(socket);

  //===============ERROR=============

  websocketErrorListen(socket);

  //===============UPDATES=============
  gameUpdatesListen(socket);
  //===============ROOM CONNECTION=============

  gameConnectionsListen(socket);

  //===============ACTIONS=============

  gameActionsListen(socket);
}
