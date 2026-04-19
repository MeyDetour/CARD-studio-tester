import {
  getView,
  storeView,
  getGameData,
} from "../../../../src/controller/game/dataStorage.js";
import { getPlayerOfCurrentView, getSocketOfPlayerOfCurrentView } from "../../../../src/controller/game/players.js";
import { getPlayerStat } from "../../../../src/controller/game/players.js";
import { reloadComposant_gameplayPage } from "../../game/gameplayPage.js";
import { button } from "../../../button/button.js";
import { reloadComposant_winPage } from "../../winPage/winPage.js";
import { reloadComposant_loosePage } from "../../loosePage/loosePage.js";

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

    reloadComposant_winPage();
    reloadComposant_loosePage();
}
window.changePlayerView = changeCurrentView;

// ============ RELOAD =============
export function reload_topRowPlayerInformations() {
  let content = document.querySelector(".statGamePage .right .topRow");
  if (content) {
    content.innerHTML = topRowPlayerInformations();
    if (localStorage.getItem("askPlayer")) {
      displayAskPlayerWidget(
        JSON.parse(localStorage.getItem("askPlayer")).event,
        JSON.parse(localStorage.getItem("askPlayer")).params,
      );
    }
  }
}

// ============ASK PLAYER WIDGET =============
export function displayAskPlayerWidget(event, params) {
  localStorage.setItem("askPlayer", JSON.stringify({ event, params }));

  let content = document.querySelector(
    ".statGamePage .right .topRow .actionWrapper",
  );
  //submit the response
  window.sendAskPlayerValue = function () {
    localStorage.removeItem("askPlayer"); 
    const obj = { insertedValue: getValueOfAskPlayerWidget() };  let socket = getSocketOfPlayerOfCurrentView()
      
    if (
      socket &&
      obj &&
      obj.insertedValue != null &&
      obj.insertedValue != undefined
    ) {
      console.log({ event, obj, params });
     socket.emit("playerInsertedValue", { event, obj, params });
      hideAskPlayerWidget();
    } else {
      console.warn("Dont find socket to send value of widget");
    }
  };

  if (content) {
    let type = event.event.requiresInput.type;
    content.innerHTML += `
    <div class="widgetAskPlayer"> 
                <span>${event.event.requiresInput.label}</span>
                ${
                  event.event.requiresInput.description
                    ? `<p>${event.event.requiresInput.description}</p>`
                    : ""
                }
                <div class="input-container"> 
                  <input id="widgetInput" type="${type}" ${type === "number" ? `min="${parseInt(event.event.requiresInput.min) || 0}" max="${parseInt(event.event.requiresInput.max) || 100}"` : ""} placeholder="${type === "number" ? "Enter a number" : "Enter text"}">
                </div>
                <div class="buttonsContainer">
                  ${button(null, null, null, "sendAskPlayerValue", "Valider", "greenButton", {})}
                  ${button(null, null, null, "hideAskPlayerWidget", "Annuler", "redButton", {})}
                </div>
           
      </div>`;
  }
} 
// hide widget without any action
export function hideAskPlayerWidget() {
  localStorage.removeItem("askPlayer");
  let widget = document.querySelector(
    ".statGamePage .right .topRow .actionWrapper .widgetAskPlayer",
  );
  if (widget) {
    widget.remove();
  }
}
window.hideAskPlayerWidget = hideAskPlayerWidget;

// get the value inside of the widget
function getValueOfAskPlayerWidget() {
  let input = document.querySelector(
    ".statGamePage .right .topRow .actionWrapper .widgetAskPlayer #widgetInput",
  );
  if (input && input.value != "") {
    return input.value;
  }
  return null;
}
