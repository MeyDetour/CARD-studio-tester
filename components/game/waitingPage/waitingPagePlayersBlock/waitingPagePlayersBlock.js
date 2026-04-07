import { getGameData } from "../../../../src/controller/game/dataStorage.js";
import { playerCard } from "../../../playerCard/playerCard.js";

export function waitingPagePlayersBlock() {
  let gameData = getGameData() 
  let playerhtml = "";
  gameData.data.players.forEach((player) => {
    playerhtml += playerCard(gameData.admin, player);
  });

  return /*html*/ `<div class="players-container-header">
                            <img src="./assets/players-white.svg"> 
                            <h3>Joueurs (${gameData.data.players.length})</h3>
                        </div>
                        <div class="wrapper">
                          ${playerhtml}
                        </div>

  `;
}

export function reloadComposant_waitingPagePlayersBlock() {
  let div = document.querySelector(".waitingPage .left .players-container");
  if (div) {
    div.innerHTML = waitingPagePlayersBlock();
  }
}
