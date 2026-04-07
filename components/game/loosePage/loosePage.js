import { button } from "../../button/button.js";
import {
  getCurrentPlayer,
  getGameData,
} from "../../../src/controller/game/dataStorage.js";

export function loosePage() {
  let currentPlayer = getCurrentPlayer();
  let gameData = getGameData();
  if (!gameData) {
    displayError("No game data found to display win page");
    return null;
  }
  if (!currentPlayer) {
    displayError("No current player found to display loose page");
    return null;
  }
 if (currentPlayer.haswin.value === true || currentPlayer.isSpectator.value == true) {
    return null;
  }
  // pas besoin de verifier que la partie soit finie
  // car certains joueuers peuvent perdre avant la fin 
  // de la partie


  return /*html*/ ` 
    <div class="loosePage"> 
      <div class="rain">
         <div class="d9-drop d9-drop1"></div>
        <div class="d9-drop d9-drop2"></div>
        <div class="d9-drop d9-drop3"></div>
        <div class="d9-drop d9-drop4"></div>
        <div class="d9-drop d9-drop5"></div>
        <div class="d9-drop d9-drop6"></div>
        <div class="d9-drop d9-drop7"></div>
        <div class="d9-drop d9-drop8"></div>
        <div class="d9-drop d9-drop9"></div>
        <div class="d9-drop d9-drop10"></div>
        <div class="d9-drop d9-drop11"></div>
        <div class="d9-drop d9-drop12"></div>
        <div class="d9-drop d9-drop13"></div>

        <div class="d9-dropMedium d9-dropMedium1"></div>
        <div class="d9-dropMedium d9-dropMedium2"></div>
        <div class="d9-dropMedium d9-dropMedium3"></div>
        <div class="d9-dropMedium d9-dropMedium4"></div>
        <div class="d9-dropMedium d9-dropMedium5"></div>
        <div class="d9-dropMedium d9-dropMedium6"></div>
        <div class="d9-dropMedium d9-dropMedium7"></div>
        <div class="d9-dropMedium d9-dropMedium8"></div>
        <div class="d9-dropMedium d9-dropMedium9"></div>
        <div class="d9-dropMedium d9-dropMedium10"></div>
        <div class="d9-dropMedium d9-dropMedium11"></div>
        <div class="d9-dropMedium d9-dropMedium12"></div>
        <div class="d9-dropMedium d9-dropMedium13"></div>
        </div>
     
      <div class="looseContent">
       <img src="/assets/images/spooky-defeat.png" alt="Image de défaite" class="defeatImage">
   
        <h1>Défaite !</h1>
        ${
          gameData.data.winners && gameData.data.winners.length > 1
            ? `<p>Gagnants : ${gameData.data.winners
                .map((winner) => winner.pseudo)
                .join(", ")}</p>`
            : `<p>Gagnant : ${gameData.data.winners[0].pseudo}</p>`
        }

     
        <div class="buttons">
       ${gameData.data.state.value == "endOfGame" && gameData.admin.id == currentPlayer.id && gameData.data.players>= 2? 
              // on affiche le boutton rejouer que si la partie est vraiment finie
            // le bouton rejouer va reinitialiser la partie et donc faire revenir 
            // tous les joueurs dans la salle d'attente, c'est pour ça que je veux 
            // pas l'afficher avant que la partie soit vraiment finie
             button(null, null, null, "replay", "Rejouer", "darkBlueButton", { gameId: gameData.roomInDb.id }) : ""}
          
        
          ${gameData.roomInDb?.params?.globalGame?.autoriseSpectator && gameData.data.state.value != "endOfGame" ? 
            // si la partie est pas finie alors on affiche pas le bouton regarder 
            // la partie, car ça n'aurait pas de sens de regarder une partie 
            // qui est déjà finie
            button(null, null, null, "replay", "Regarder la partie", "", { gameId: gameData.roomInDb.id }) : ""}
        </div>
        
        
        ${button(null, null, null, "navigateTo", "Revenir au menu", "linkApparence", { path: "/games" })}
       
         </div>
    </div>
    `;
}

export function reloadComposant_loosePage() {
  let content = document.querySelector("#content");
  let page = loosePage(); 
  if (content && page) {
    content.innerHTML = page;
  }
}
