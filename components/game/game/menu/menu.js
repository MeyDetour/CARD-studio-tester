import { button } from "../../../button/button.js";
import { storeCardSort,getCardSort } from "../../../../src/controller/game/dataStorage.js";
import {autoReloadComposant_gameplayHanddeck} from "../handdeck/handdeck.js";
 

export function gameplay_menu(players, currentPlayer) {
  let sort = getCardSort()
  return /*html*/ `
    <div class="menu">
    <div class="actions">
        <h2>Menu</h2>
        ${button(null, null, null, "displayLetCommentWidget", "Laisser un commentaire", "linkApparence")}
     </div>
        ${button(null, null, "/", null, "Retourner au menu", "exitButton")}
     <div class="settings">
        <h2>Paramètres</h2>
        <div>
          <h3>Tri des cartes</h3>
          <select name="cardSort" id="card-sort" onchange="changeCardSort(event)">
            <option ${sort === "value" ? "selected" : ""} value="value">Par valeur</option>
            <option ${sort === "color" ? "selected" : ""} value="color">Par couleur</option> 
          </select>
        </div>
    </div>
   
    <hr>
    <div class="players">
        <h3>Joueurs</h3>
        ${players
          .map((player) => /*html */ ` <span>${player.pseudo}</span>   `)
          .join("")}
    </div>
    ${button(null, null, "/", null, "Retourner au menu", "exitButton")}
 
    </div>
    `;
}
export function changeCardSort(e) {
  const sortValue = e.target.value;
  storeCardSort(sortValue);

  autoReloadComposant_gameplayHanddeck()
  toggleGameplayMenu()
  reloadSortSeleciton()
    
}
function reloadSortSeleciton(){
  let sort = getCardSort();
  let selectElement = document.getElementById("card-sort");
  if (selectElement) {
    selectElement.value = sort;
  }
}
window.changeCardSort = changeCardSort
export function hideGameplayMenu() {
    let menuContainer = document.querySelector(".menu");
  if (menuContainer) {
    if (menuContainer.style.display === "flex") {
      menuContainer.classList.add("close");
      setTimeout(() => {
        menuContainer.style.display = "none";
        menuContainer.classList.remove("close");
      }, 1000);
    }
  }
}

export function toggleGameplayMenu() {
  let menuContainer = document.querySelector(".menu");
  if (menuContainer) {
    if (menuContainer.style.display === "flex") {
      hideGameplayMenu()
    } else { 
      menuContainer.style.display = "flex";
      menuContainer.classList.add("open");
      setTimeout(() => {
        menuContainer.classList.remove("open");
      }, 1000);
    }
  }
}
window.toggleGameplayMenu = toggleGameplayMenu;
