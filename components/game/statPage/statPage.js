import { getGameData, getView } from "../../../src/controller/game/dataStorage.js";

import gameplay_statEventsDemonsWithValueSection from "./eventsDemonsWithValueSection/section.js";
import topRowPlayerInformations from "./topRowPlayerInformations/topRowPlayerInformations.js";
import { reloadComposant_gameplay_statEventsDemonsWithValueSection } from "./eventsDemonsWithValueSection/section.js";
import {  reloadComposant_gameplayPage } from "../game/gameplayPage.js";
import { reload_topRowPlayerInformations } from "./topRowPlayerInformations/topRowPlayerInformations.js";
import gameplayPage from "../game/gameplayPage.js"; 
import { reloadComposant_loosePage } from "../loosePage/loosePage.js";
import { reloadComposant_winPage } from "../winPage/winPage.js";
import { button } from "../../button/button.js";
import { players } from "../../../src/main.js";
export function statPage() {

    let view = getView();
  let gameData = getGameData();
  if (!gameData) {
    displayError("No game data found to display game");
    return "";
  }
  return /*html*/ `
<div class="statGamePage">
    <div class="head" >
              <h2>${gameData.roomInDb.name}</h2> 
              <div>
                ${button(null,null,null,'replay',"Relancer","greyBorderButton")}
                ${button(null,null,null,'exit',"Quitter","greyBorderButton")}
              </div>
          </div> 
        <div class="row">
        <div class="left">
           
            <div class="statEventsDemonsWithValueSection">
            ${gameplay_statEventsDemonsWithValueSection(gameData, view)}
            </div>
          </div>
         
          <div class="right">

           <div class="topRow">
         ${topRowPlayerInformations()}
            
        </div>  
            <div id="gameplayPage">
           ${gameplayPage()}
            </div>
          </div>
        </div>
`;
}

export function reloadComposant_StatPage() {
  console.log("=====RELOAD STATT PAGE==========");
  console.log(players);
  let gameData = getGameData();
  console.log(gameData);
  if (!gameData) {
    displayError("No game data found to display game");
    return;
  }

  let content = document.querySelector("#statGamePage");
  if (!content) {
    document.querySelector("#content").innerHTML = statPage();
   
  }

  reload_topRowPlayerInformations();
  reloadComposant_gameplay_statEventsDemonsWithValueSection(
    gameData,
    getView(),
  );
 
  reloadComposant_winPage();
  reloadComposant_loosePage(); 
    reloadComposant_gameplayPage(); 
}
