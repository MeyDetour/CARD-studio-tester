import { button } from "../../button/button.js";
import { reloadComposant_gameplayPlayers } from "./players/players.js";
import {
  getGameData,
  getView,
} from "../../../src/controller/game/dataStorage.js";
import { getPlayerStat } from "../../../src/controller/game/players.js";
import { displayError } from "../../../src/controller/error.js"; 
import { gameplay_displayAllPlayers } from "./players/players.js";
import {
  gameplay_handdeck,
  reloadComposant_gameplayHanddeck,
} from "./handdeck/handdeck.js";
import {
  gameplay_actionsButtons,
  reloadComposant_gameplayActionsButtons,
} from "./actionsButtons/actionsButtons.js";
import {
  gameplay_globalValues,
  reloadComposant_gameplayGlobalValues,
} from "./globalValues/globalValues.js";
import { getPlayerOfCurrentView } from "../../../src/controller/game/players.js";
import {
  gameplay_cardPile,
  reloadComposant_gameplayCardPile,
} from "./cardPile/cardPile.js";
import {
  reloadComposant_gameplaySpectatorBanniere,
  gameplay_spectatorBanniere,
} from "./spectatorBanniere/spectatorBanniere.js";

export default function gameplayPage() {
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
              gameData.data.currentPlayerPosition.value ==
                currentPlayer.position,
              currentPlayer,
            )}
               
                ${gameplay_displayAllPlayers(gameData, currentPlayer)}  

                 
       
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
    return;
  } 

  let content = document.querySelector("#gameplayPage");
  if (!content) {
    document.querySelector("#content").innerHTML = gameplayPage();
    return;
  }

  let currentPlayer = getPlayerOfCurrentView(); 
  if (!currentPlayer) {
    displayError("No current player found to display game");
    return;
  }
  if ((currentPlayer.haswin.value || currentPlayer.hasloose.value) && !currentPlayer.isSpectator.value) {
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
