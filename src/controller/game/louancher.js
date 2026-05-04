import { players } from "../../main.js";
import { navigateTo } from "../../router/router.js";
import { deleteAllGameVariablesSaved } from "./dataStorage.js";
export function startGame() {
  console.log("=========START ROOM=======");
  let socket = players[0]?.socket;
  if (socket) {

  deleteAllGameVariablesSaved();
    socket.emit("startGame");
  } else {
    console.warn("Dont find socket to start game");
  }
}
export function replay() {
  let socket = players[0]?.socket;
  deleteAllGameVariablesSaved();
  if (socket) {
    socket.emit("replayGame");
  } else {
    console.warn("Dont find socket to replay game");
  }
}

window.startGame = startGame;
window.replay = replay;
