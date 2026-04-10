import { button } from "../../button/button.js";
import { reloadComposant_gameplayPlayers } from "./players/players.js";
import {
  getGameData,
  getView,
} from "../../../src/controller/game/dataStorage.js";
import { getPlayerStat } from "../../../src/controller/game/players.js";
import { displayError } from "../../../src/controller/error.js";
import { gameplay_messageOfLoading } from "./messageOfLoading/messageOfLoading.js";
import { gameplay_displayAllPlayers } from "./players/players.js";
import {
  gameplay_handdeck,
  reloadComposant_gameplayHanddeck,
} from "./handdeck/handdeck.js";
import {
  gameplay_actionsButtons,
  reloadComposant_gameplayActionsButtons,
} from "./actionsButtons/actionsButtons.js";
import { gameplay_menu, hideGameplayMenu } from "./menu/menu.js";
import {
  gameplay_globalValues,
  reloadComposant_gameplayGlobalValues,
} from "./globalValues/globalValues.js";
import {
  getPlayerOfCurrentView,
  getPlayerWhoHasToPlayer,
} from "../../../src/controller/game/players.js";
import {
  gameplay_cardPile,
  reloadComposant_gameplayCardPile,
} from "./cardPile/cardPile.js";
import {
  reloadComposant_gameplaySpectatorBanniere,
  gameplay_spectatorBanniere,
} from "./spectatorBanniere/spectatorBanniere.js";
import { players } from "../../../src/main.js";

export default function gameplayPage() {
  if (!players) {
    displayError("No players found to display game");
    return "";
  }
  const excludeFieldOfPlayer = ["socket", "handDeck", "socketID"];

  let view = getView();
  let currentPlayer = getPlayerOfCurrentView();
  let gameData = getGameData();
  if (!gameData) {
    displayError("No game data found to display game");
    return "";
  }
  if (gameData.data.state.value !== "inProgress") {
    console.warn("room is not in progress");
    return "";
  }
  if (!currentPlayer) {
    displayError("No current player found to display game");
    console.warn("No current player found");
    return "";
  }
  let points = 45;
  let actions =
    currentPlayer.actions && currentPlayer.actions.value
      ? currentPlayer.actions.value
      : [];
  let handDeck =
    currentPlayer.handDeck && currentPlayer.handDeck.value
      ? currentPlayer.handDeck.value
      : [];
  let cardList = gameData.roomInDb.assets.cards;

  let params = gameData.roomInDb.params.rendering.game;
  let cardParams = gameData.roomInDb.params.cards;

  let playerActions = currentPlayer.actions.value;
  let actionOnDeck = playerActions.find((action) => action.actionOnDeck);
  let actionOnDiscardDeck = playerActions.find(
    (action) => action.actionOnDiscardDeck,
  );

  return /*html */ `
  <div class="statGamePage">
    <div class="head" >
              <h2>${gameData.roomInDb.name}</h2> 
          </div> 
        <div class="row">
        <div class="left">
          <div class="boxContainer">
                <div class="titleContainer">
                    <img>
                    <h5>
                        Point de vue
                    </h5> 
                </div>
                    <select name="pointOfView" id="pointOfView"" onchange="changeCardSort(event)">
                    ${players
                      .map(
                        (player, index) => /*html*/ `
                      <option ${index === view.playerView ? "selected" : ""} value="${index}">${player.pseudo}</option>
                    `,
                      )
                      .join("")} 
                  </select>
          </div>
            <div class="boxContainer playerSection">
              <div class="titleContainer">
                    <img>
                    <h4>Joueurs
                    </h4> 
                </div>

                <div class="wrapper">
                    ${players
                      .map(
                        (player, index) => /*html*/ `
                        <div class="playerStat">
                                <div class="titleContainer"><img><h5>${player.pseudo}</h5></div>
                                <div class="statWrapper">
                                  ${getPlayerStat(player,gameData)
                                    .map((stat) => (`
                                      <span>
                                        ${stat.name} : ${stat.value}
                                      </span>
                                   ` ))
                                    .join("")}  
                                </div>
                        </div>
                                    
                    `,
                      )
                      .join("")} 
                  
                        
                    </div>
                </div>
                
           
                <div class="boxContainer">
                    <div class="titleContainer">
                          <img>
                          <h4>
                              Actions pour ${currentPlayer.pseudo}
                            
                          </h4> 
                    </div>
                        <div class="actionWrapper">
                            <button>Piocher</button>
                        </div> 
                </div>
                </div>
         
          <div class="right">
          
            <div class="statEventsDemonsWithValueSection">
              <div class="statEventsDemonsWithValueSection-navigation">
                 <span>Value</span>
                 <span>Events</span>
                 <span>Demons</span>
              </div>
              <div class="boxContainer">
              </div>
            </div>
            
            <div id="gameplayPage">
            ${gameplay_messageOfLoading(gameData.data.logs)}
            ${gameplay_globalValues({ ...gameData.data, ...gameData.data.globalValueStatic })}
            ${gameplay_handdeck(params.displayHandDeck, handDeck, cardList)}
            ${gameplay_spectatorBanniere(currentPlayer)}
            
            ${gameplay_cardPile(
              cardParams,
              actionOnDeck
                ? {
                    playerId: currentPlayer.id,
                    roomId: gameData.roomId,
                    action: actionOnDeck ? actionOnDeck.name : null,
                    actionType: actionOnDeck
                      ? actionOnDeck.type || "default"
                      : "default",
                  }
                : null,
              "deck",
              "Pioche",
            )}
            ${gameplay_cardPile(
              cardParams,
              actionOnDiscardDeck
                ? {
                    playerId: currentPlayer.id,
                    roomId: gameData.roomId,
                    action: actionOnDiscardDeck
                      ? actionOnDiscardDeck.name
                      : null,
                    actionType: actionOnDiscardDeck
                      ? actionOnDiscardDeck.type || "default"
                      : "default",
                  }
                : null,
              "discardDeck",
              "Défausse",
            )}
            
            
            ${gameplay_actionsButtons(
              playerActions.filter(
                (a) => !a.actionOnDeck && !a.actionOnDiscardDeck,
              ),
              gameData.data.currentPlayerPosition.value ===
                currentPlayer.position,
              currentPlayer,
              gameData.roomId,
            )}
                ${gameplay_menu(gameData.data.players, currentPlayer)}
                        
                <div class="headerButtons">
                  ${button("menu", null, null, "toggleGameplayMenu", null, "whiteButton gameplayMenuButton")}
                </div>
              
                ${gameplay_displayAllPlayers(gameData, currentPlayer)}  

                
            </div>
          </div>
        </div>
    `;
}

// On fait un rechargement par suppresion-creation car tous les elements sont en position absolute
// dans waiting page on fait un ecrasement de contenu à partir d'une div précise car c'est un contenu en position relative
export function reloadComposant_gameplayPage() {
  console.log("========RELOAD GAME PLAY PAGE============");

  let gameData = getGameData();
  if (!gameData) {
    displayError("No game data found to display game");
    return;
  }
  if (gameData.data.state.value !== "inProgress") {
    console.log("room is not in progress");
    console.log(gameData.data.state.value);
    return;
  }

  let content = document.querySelector("#gameplayPage");
  if (!content) {
    document.querySelector("#content").innerHTML = gameplayPage();
    return;
  }

  let currentPlayer = getPlayerWhoHasToPlayer();

  if (!currentPlayer) {
    displayError("No current player found to display game");
    return;
  }

  let playerActions = currentPlayer.actions.value;
  let actionOnDeck = playerActions.find((action) => action.actionOnDeck);
  let actionOnDiscardDeck = playerActions.find(
    (action) => action.actionOnDiscardDeck,
  );

  reloadComposant_gameplayPlayers(content, gameData, currentPlayer);
  reloadComposant_gameplayGlobalValues(content, {
    ...gameData.data,
    ...gameData.data.globalValueStatic,
  });
  reloadComposant_gameplaySpectatorBanniere(content, currentPlayer);
  reloadComposant_gameplayHanddeck(
    content,
    gameData.roomInDb.params.rendering.game.displayHandDeck,
    currentPlayer.handDeck.value,
    gameData.roomInDb.assets.cards,
  );
  reloadComposant_gameplayActionsButtons(
    content,
    playerActions.filter((a) => !a.actionOnDeck && !a.actionOnDiscardDeck),
    gameData.data.currentPlayerPosition.value === currentPlayer.position,
    currentPlayer,
    gameData.roomId,
  );
  reloadComposant_gameplayCardPile(
    content,
    gameData.roomInDb.params.cards,
    actionOnDeck
      ? {
          playerId: currentPlayer.id,
          roomId: gameData.roomId,
          action: actionOnDeck ? actionOnDeck.name : null,
          actionType: actionOnDeck ? actionOnDeck.type || "default" : "default",
        }
      : null,
    "deck",
    "Pioche",
  );
  reloadComposant_gameplayCardPile(
    content,
    gameData.roomInDb.params.cards,
    actionOnDiscardDeck
      ? {
          playerId: currentPlayer.id,
          roomId: gameData.roomId,
          action: actionOnDiscardDeck ? actionOnDiscardDeck.name : null,
          actionType: actionOnDiscardDeck
            ? actionOnDiscardDeck.type || "default"
            : "default",
        }
      : null,
    "discardDeck",
    "Défausse",
  );
}
