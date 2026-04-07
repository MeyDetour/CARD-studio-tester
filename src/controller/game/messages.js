import { messageComponent } from "../../../components/message/message.js";
import { messageLogComponent } from "../../../components/messageLog/messageLog.js";
import { storeGameData } from "./dataStorage.js";

export function sendMessageInMessagerie() {
  let input = document.querySelector(".chat .send input");
  if (input && input.value.trim() !== "") {
    if (window.socket) {
      var currentdate = new Date();
      let message = {
        content: input.value,
        playerId: input.dataset.playerid,
        pseudo: input.dataset.pseudo,
        date: currentdate.getHours() + ":" + currentdate.getMinutes(),
      };
      console.log("<<<EMIT MESSAGE : " + JSON.stringify(message) + ">>>");
      window.socket.emit("newMessageOnmessagerie", message);
    } else {
      console.warn("cannot send message because window.socket in undefind");
    }
  } else {
    console.warn("input not found");
  }
}
export function cleanMessageInput(message) {
  let input = document.querySelector(".chat .send input");
  if (input) {
    input.value = "";
  }
}
export function addNewMessageInMessagerie(message) {
  let messagerie = document.querySelector(".chat .wrapper");
  if (messagerie) {
    messagerie.innerHTML += messageComponent(message);
  }
}
export function addMessageNotification(){
  if (document.querySelector(".gameplayChatButton") && !document.querySelector("#gameplayPage .gameplayMessagerie-container .chat")) {
    document.querySelector(".gameplayChatButton").classList.add("newMessage");
  }
}
export function removeMessageNotification(){
  if (document.querySelector(".gameplayChatButton")) {
    document.querySelector(".gameplayChatButton").classList.remove("newMessage");
  }
}
export function updateListOfMessages(messages) {
  let gameData = window.gameData;
  gameData.data.messages = messages;
  storeGameData(gameData);
}

window.sendMessageInMessagerie = sendMessageInMessagerie;
