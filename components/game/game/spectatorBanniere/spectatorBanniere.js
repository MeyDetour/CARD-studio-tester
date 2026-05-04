import { button } from "../../../button/button.js";
import { getGameData, getView } from "../../../../src/controller/game/dataStorage.js";
export function gameplay_spectatorBanniere( 
  currentPlayer
) {

  let gameData = getGameData();
  if (!gameData) {
    displayError("No game data found to display game");
    return "";
  }
  if (!gameData.data.spectators.some(spectator => spectator.id === currentPlayer.id)) {
    return "";
  }
  return /*html */ `
   <div class="spectatorBanniere">
        <p>Vous observez la partie en tant que spectateur.</p>
        </div>  
     `;
}
       

export function reloadComposant_gameplaySpectatorBanniere(
  content, 
  currentPlayer
) {
  let spectatorBanniere = document.querySelector(".spectatorBanniere");
  if (spectatorBanniere) {
    spectatorBanniere.remove();
  }
  content.innerHTML += gameplay_spectatorBanniere(
    currentPlayer
  );
}
