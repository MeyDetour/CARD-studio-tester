import {
  getView,
  storeView,
  getGameData,
} from "../../../../src/controller/game/dataStorage.js";
import { getPlayerOfCurrentView } from "../../../../src/controller/game/players.js";
import { getPlayerStat } from "../../../../src/controller/game/players.js";
import { reloadComposant_gameplayPage } from "../../game/gameplayPage.js";

export default function topRowPlayerInformations() {
  let view = getView();
  let gameData = getGameData();
  let currentPlayer = getPlayerOfCurrentView();
  let playersStat2 = getPlayerStat(currentPlayer, gameData); 
  let playerStat1 = playersStat2.splice(Math.round(playersStat2.length / 2));
 
  return /*html*/ `    
            <div class="col">
                <div class="boxContainer">
                      <div class="titleContainer">
                          <img>
                          <h5>
                              Point de vue
                          </h5> 
                      </div>
                          <select name="pointOfView" id="pointOfView"" onchange="changePlayerView(event)">
                          ${gameData.data.players
                            .map(
                              (player) => /*html*/ `
                            <option ${player.position === view.playerView ? "selected" : ""} value="${player.position}">${player.pseudo}</option>
                          `,
                            )
                            .join("")} 
                        </select>
                </div>
    
                <div class="boxContainer actionSection">
                    <div class="titleContainer">
                            <img>
                            <h4>
                                Actions pour ${currentPlayer.pseudo}
                            
                            </h4> 
                    </div>
                        <div class="actionWrapper">
${currentPlayer.actions.value
  .map((elt) => {
    const actionData = JSON.stringify({
      action: elt.name,
      actionType: elt.type || "default",
      playerId: currentPlayer.id,
    }).replace(/"/g, "&quot;");
    return /*html*/ `<button onclick="doAction(${actionData})">${elt.name}</button>`;
  })
  .join("")}
                            
                           
                        </div> 
                </div>
                     
            </div>
            <div class="boxContainer playerSection">
                  <div class="titleContainer">
                        <img>
                        <h4>${currentPlayer.pseudo}</h4>
                        </h4> 
                  </div>
                  <div class="row">
                  <div class="detailWrapper">
                       ${playerStat1
                         .map(
                           (stat) => `
                           <div  class="rowInWrapper"><span>${stat.name} :</span><span>${stat.value}</span></div>
                                       `,
                         )
                         .join("")}  
                  </div> 
                  <div class="separator"></div>
                    <div class="detailWrapper">
                       ${playersStat2
                         .map(
                           (stat) => `
                           <div  class="rowInWrapper"><span>${stat.name} :</span><span>${stat.value}</span></div>
                                       `,
                         )
                         .join("")}  
                  </div>
                  </div>
                    
             
            </div> 
    `;
}

export function changeCurrentView(e) {
  const position = e.target.value;
  let view = getView();
  view.playerView = parseInt(position);
  storeView(view);
  reload_topRowPlayerInformations();
  reloadComposant_gameplayPage();
}
window.changePlayerView = changeCurrentView;

export function reload_topRowPlayerInformations() {
  let content = document.querySelector(".statGamePage .right .topRow");
  if (content) {
    content.innerHTML = topRowPlayerInformations();
  }
}
