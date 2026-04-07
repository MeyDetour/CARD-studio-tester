import { connectSocket, socket } from "../../websocket/connection.js";
import { navigateTo } from "../../router/router.js";
import { reloadComposant_gamePage } from "../../../pages/game/game.js";
import {
  storeDataOfPlayer,
  storeGameData,
  deleteAllGameVariablesSaved,
} from "./dataStorage.js";
import { apiClient } from "../../helpers/api.js";
import { reloadComposant_gameplayPage } from "../../../components/game/game/gameplayPage.js";

export async function gameLogin(params) {
  console.log("======TRY TO LOGIN======");

  deleteAllGameVariablesSaved();
  if (!socket) return console.error("cannot find socket");

  // GET DATA
  let pseudo = document.querySelector("#pseudo")
    ? document.querySelector("#pseudo").value
    : null;
  let skin = document.querySelector(".choose-skin-image")
    ? document.querySelector(".choose-skin-image").dataset.skin
    : null;
  let gameId = params.gameId;
  let roomId = params.roomId;

  try {
    let gameInDB = await apiClient("game/" + gameId);

    if (!gameInDB) {
      throw new Error("error while fetch");
    }

    // IF GAME IS SELECTED BUT NOT PSEUDO
    if ((gameId || roomId) && !pseudo && !skin && gameInDB) {
      navigateTo({
        path: "/choose-pseudo",
        gameId: gameInDB.id,
        state: "waitingPeople",
        name: gameInDB.name,
        roomId: roomId,
      });
      return;
    }

    // IF PSEUDO AND GAME ID LETS CREATE
    if (gameId && pseudo && skin && gameInDB && !roomId) {
      console.log("========TRY TO CREATE ROOM==========");
      socket.emit("createRoom", { gameInDB, pseudo , skin });
      return;
    }

    // IF PSEUDO AND ROOM ID
    if (roomId && pseudo && skin && gameId) {
      console.log("=============TRY TO JOIN ROOM=======");
      socket.emit("joinRoom", { roomId, pseudo,skin });
      return;
    }

    console.log("AUTRE ");
    console.log("gameId :>> ", gameId);
    console.log("roomId :>> ", roomId);
    console.log("pseudo :>> ", pseudo);
    //join room
  } catch (err) {}
}

export function verifyGameId(params) {
  console.log("<<<<<WE GOT ROOM ID LETS VERIFY>>>>>");
  let roomId = params.roomId;
  let result = params.result;
  let gameId = params.gameId;
  let pathOnEchec = params.pathOnEchec ? params.pathOnEchec : "/";
  if (!result && result != null && result != undefined) {
    console.log("<<<<<ROOM ID DOESNOT EXIST>>>>>");
    navigateTo({ path: pathOnEchec });
    return;
  }
  if (!roomId && result == undefined) {
    let roomId = document.querySelector("#roomCode")
      ? document.querySelector("#roomCode").value
      : null;
    if (!roomId) {
      navigateTo({ path: "/" });
      return;
    }
    if (socket) {
      socket.emit("isExistingRoom", { roomId });
    } else {
      console.warn("Dont find socket to  verify if room exist");
    }
    return;
  }
  if (roomId && (result == null || result == undefined)) {
    socket.emit("isExistingRoom", { roomId, pathOnEchec });
  }

  if (result && gameId) {
    console.log("<<<<<ROOM ID EXIST>>>>>");

    gameLogin({ roomId: roomId, gameId: gameId });
  }
}

export function gameChanges(gameData, currentPlayer) {
  storeGameData(gameData);
  if (currentPlayer) {
    storeDataOfPlayer(currentPlayer);
  }
  reloadComposant_gamePage();
}

window.verifyGameId = verifyGameId;

window.gameLogin = gameLogin;
