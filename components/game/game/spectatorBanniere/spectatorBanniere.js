import { button } from "../../../button/button.js";
export function gameplay_spectatorBanniere( 
  currentPlayer
) {
  if (currentPlayer.isSpectator.value != true) {
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
