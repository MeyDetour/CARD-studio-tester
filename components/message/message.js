import { getCurrentPlayer } from "../../src/controller/game/dataStorage.js";
import { messageLogComponent } from "../messageLog/messageLog.js";

export function messageComponent(message) {

let currentPlayer = getCurrentPlayer()

  if (!message) {
    console.warn("please provide message");
    return;
  } 

  if (!message.playerId) { 
    return messageLogComponent(message)
  }
  if (!message.content) {
    console.warn("please provide content");
    return;
  }
  return /*html */ ` 
        <div class="message ${message.playerId === currentPlayer.id? "messageRight" : "messageLeft"}">

            <div class="letter">${message.pseudo.charAt(0)}</div>
            <div> 
                <span class="pseudo">${ message.playerId == currentPlayer.id ?"Vous" : message.pseudo} ${message.date}</span>
                <p>${message.content}</p>
            </div>
        </div>
        `;
}

