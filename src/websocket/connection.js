import { gameManagementListen } from "./game/management.js"; 
import { websocketErrorListen } from "./error/error.js";
import { gameUpdatesListen } from "./game/updates.js";
import { gameConnectionsListen } from "./game/connections.js";
import { gameActionsListen } from "./game/action.js";
import { env } from "../../env.js";
import { getGameId, getRoomId, getToken } from "../controller/game/dataStorage.js";
import { getRandomSkin } from "../controller/game/players.js";
import { players } from "../main.js";
import { apiClient } from "../helpers/api.js";
  
export async function connectSocket(gameInDB={}) {
  console.log("TRY TO CONNECT SOCKET");
 
 
  let socket = io(env.CARD_STUDIO_WEBSOCKET_URL);
  
  if (players.length === 0) {
    console.log("CREATE ROOM");
    socket.emit("createRoom", {
      gameInDB,
      pseudo: "Player 1",
      skin: getRandomSkin(),
      isTest: true,
    });
  }else{
      socket.emit("joinRoom", { roomId : getRoomId(), pseudo : "Player "+(players.length+1),skin : getRandomSkin() });
  }

  console.log(players);
  //===============GAME MANAGEMENT=============
  gameManagementListen(socket);
 
  //===============ERROR=============

  websocketErrorListen(socket);

  //===============UPDATES=============
  gameUpdatesListen(socket);
  //===============ROOM CONNECTION=============

  gameConnectionsListen(socket);

  //===============ACTIONS=============

  gameActionsListen(socket);
}
window.connectSocket = connectSocket;

export function disconnectSocket(parmas) {
  if (!players) {
    console.warn("No players found to disconnect.");
    return;
  }
  let player = players[parmas.index];
  if (player.socket && player.socket.connected) {
    player.socket.disconnect();
    console.log("Socket disconnected successfully.");
    players.splice(parmas.index, 1); // Remove the player from the array
  } else {
    console.warn("Socket is already disconnected or was never connected.");
  }
}
window.disconnectSocket = disconnectSocket;
