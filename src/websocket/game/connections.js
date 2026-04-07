import {
  storeRoomId,
  storeDataOfPlayer,
  storeGameData,
} from "../../controller/game/dataStorage.js";
import { joinRoom } from "../../controller/game/louancher.js";
import { gameChanges } from "../../controller/game/game.js";
import { verifyGameId } from "../../controller/game/game.js";
import { reloadComposant_waitingPagePlayersBlock } from "../../../components/game/waitingPage/waitingPagePlayersBlock/waitingPagePlayersBlock.js";
import { reloadComposant_waitingPageCopyBlock } from "../../../components/game/waitingPage/waitingPageCopyBlock/waitingPageCopyBlock.js";
 

export function gameConnectionsListen(socket) {
  socket.on("roomCreated", ({ gameData, player }) => {
    console.log("RECEIVE ROOM SUCCESSFULLY CRTEATED :>>", { gameData, player });
    storeDataOfPlayer(player);
    storeGameData(gameData);
    storeRoomId(gameData.roomId);
    joinRoom(gameData);
  });

  socket.on("roomJoined", ({ gameData, player }) => {
    console.log("RECEIVE ROOM JOINED :>>", { gameData, player });
    storeRoomId(gameData.roomId);
    storeGameData(gameData);
    storeDataOfPlayer(player);
    joinRoom(gameData);
  });

  socket.on("playerHasLeftRoom", (gameData) => {
    console.log("RECEIVE PLAYER HAS LEFT ROOM :>> ", gameData);
    gameChanges(gameData);
    reloadComposant_waitingPagePlayersBlock();
    reloadComposant_waitingPageCopyBlock();
  });

  socket.on("playerHasJoinedRoom", (gameData) => {
    console.log("RECEIVE PLAYER HAS JOIN ROOM :>>", { gameData });

    gameChanges(gameData);
    reloadComposant_waitingPagePlayersBlock();
    reloadComposant_waitingPageCopyBlock();
  });

  socket.on(
    "isExistingRoomResult",
    ({ roomId, result, gameId, pathOnEchec }) => {
      console.log("RECEIVE IS EXISTING ROOM RESULT :>> ", {
        roomId,
        result,
        gameId,
        pathOnEchec,
      });
      verifyGameId({
        roomId: roomId,
        result: result,
        gameId: gameId,
        pathOnEchec: pathOnEchec,
      });
    },
  );
}
