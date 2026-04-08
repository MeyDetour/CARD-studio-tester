import {
  storeRoomId,
  storeDataOfPlayer,
  storeGameData,
} from "../../controller/game/dataStorage.js";  
import { reloadComposant_waitingPagePlayersBlock } from "../../../components/game/waitingPage/waitingPagePlayersBlock/waitingPagePlayersBlock.js";
import { reloadComposant_waitingPageCopyBlock } from "../../../components/game/waitingPage/waitingPageCopyBlock/waitingPageCopyBlock.js";
import { loadRoute } from "../../router/router.js";
import { players } from "../../main.js";

export function gameConnectionsListen(socket) {
  socket.on("roomCreated", async ({ gameData, player }) => {
    console.log("RECEIVE ROOM SUCCESSFULLY CRTEATED :>>", { gameData, player });
    storeDataOfPlayer(player);
    storeGameData(gameData);
    storeRoomId(gameData.roomId); 
    players.push({ ...player, socket: socket });
    await loadRoute({ path: "/test-config" });
  });

  socket.on("roomJoined", async ({ gameData, player }) => {
    console.log("RECEIVE ROOM JOINED :>>", { gameData, player });
    
    storeGameData(gameData);
    storeDataOfPlayer(player); 

    players.push({ ...player, socket: socket });

    await loadRoute({ path: "/test-config" });
  });

  socket.on("playerHasLeftRoom", (gameData) => {
  
  });

  socket.on("playerHasJoinedRoom", (gameData) => {
    
  });
}
