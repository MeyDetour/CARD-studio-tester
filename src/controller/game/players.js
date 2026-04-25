import { spookySkins } from "../../../data/spookySkins.js";
import { getGameData, getView } from "./dataStorage.js";
import { players } from "../../main.js";
import { getTextualValueOfCard } from "./cards.js";
export function isPassifPlayer(player) {
  let gameData = getGameData();
  if (!gameData) {
    console.warn("No game data found to determine if player is passif");
    return false;
  }
  return (
    gameData.data.spectators.some(spectator => spectator.id === player.id) ||
    player.haswin?.value ||
    player.hasloose?.value
  );
}
export function getPlayerStat(player, gameData) {
  let arrayOfStat = [];
  for (let key in player) {
    if (key == "skin" || key === "actions" || key == "socketID") {
      continue;
    }
    if (key == "handDeck" || key =="personalHandDeck" || key=="personalHandDiscard") {
      arrayOfStat.push({
        name: key,
        value: player[key].value.map((cardId) =>
          gameData.roomInDb.assets.cards[cardId].type == "french_standard"
            ? getTextualValueOfCard(gameData.roomInDb.assets.cards[cardId])
            : gameData.roomInDb.assets.cards[cardId].name,
        ),
      });
      continue;
    }
    if (key == "roles") {
        arrayOfStat.push({
        name: "Roles",
        value:  player.roles.value.map(role => role.name).join(", ")
        
      });
      continue;
    }

    if (key == "gain") {
      for (let gainKey of Object.keys(player.gain?.value)) {
        let gainObject = gameData.roomInDb.assets.gains.find(
          (elt) => elt.id == gainKey,
        );
        if (!gainObject) continue;
        arrayOfStat.push({
          name: gainObject.name,
          value: player.gain.value[gainKey].value,
        });
      }

      continue;
    }

    if (player[key]) {
      arrayOfStat.push({ name: key, value: player[key].value  != undefined?? player[key] });
    }
  }

  return arrayOfStat;
}
export function getRandomSkin() {
  let index = Math.floor(Math.random() * spookySkins.length);
  return spookySkins.splice(index, 1)[0];
}
export function getPlayerWhoHasToPlayer() {
  let gameData = getGameData();
  if (!gameData || !gameData.data || !gameData.data.players) {
    console.warn("Invalid gameData structure:", gameData);
    return null;
  }
  return gameData.data.players.find(
    (player) => player.position === gameData.data.currentPlayerPosition.value,
  );
}
export function getPlayerOfCurrentView() {
  let gameData = getGameData();
  let view = getView();
  if (!gameData || !gameData.data || !gameData.data.players) {
    console.warn("Invalid gameData structure:", gameData);
    return null;
  }
  return gameData.data.players.find(
    (player) => player.position == view.playerView,
  );
}
export function getSocketOfPlayerOfCurrentView() {
  let gameData = getGameData();
  let view = getView();
  if (!gameData || !gameData.data || !gameData.data.players) {
    console.warn("Invalid gameData structure:", gameData);
    return null;
  }
 let currentPlayer =  gameData.data.players.find(
    (player) => player.position == view.playerView,
  );
  return players.find(player => player.id == currentPlayer.id)?.socket || null;
}
