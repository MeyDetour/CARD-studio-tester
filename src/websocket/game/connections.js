import {
  storeRoomId,
  storeGameData,
  initView,
} from "../../controller/game/dataStorage.js";
import { loadRoute } from "../../router/router.js";
import { players } from "../../main.js";
import { connectSocket } from "../connection.js";
import { reloadComposant_StatPage } from "../../../components/game/statPage/statPage.js";

export function gameConnectionsListen(socket) {
  socket.on("roomCreated", async ({ gameData, player }) => {
    console.log("RECEIVE ROOM SUCCESSFULLY CRTEATED :>>", { gameData, player });
    storeGameData(gameData);
    storeRoomId(gameData.roomId);
    players.push({ id: player.id, socket: socket, position: player.position });
    initView();
    connectSocket();
    await loadRoute({ path: "/test-config" });
  });

  socket.on("roomJoined", async ({ gameData, player }) => {
    console.log("RECEIVE ROOM JOINED :>>", { gameData, player });

    storeGameData(gameData);
    players.push({ id: player.id, socket: socket, position: player.position });

    await loadRoute({ path: "/test-config" });
  });
  socket.on("roomJoinedAsSpectator", async ({ gameData, player }) => {
    storeGameData(gameData);
    players.push({ id: player.id, socket: socket, position: player.position });
    reloadComposant_StatPage();
  });

  socket.on("playerHasLeftRoom", (gameData) => {
      storeGameData(gameData);
  });

  socket.on("playerHasJoinedRoom", (gameData) => {
      storeGameData(gameData);
  });
  socket.on("playerHasJoinedRoomAsSpectator", (gameData) => {
      storeGameData(gameData);
  });
}
