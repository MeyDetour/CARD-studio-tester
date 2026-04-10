import { spookySkins } from "../../../data/spookySkins.js";
import { getGameData, getView } from "./dataStorage.js";
import { players } from "../../main.js";
export function isPassifPlayer(player) {
  return (
    player.isSpectator?.value || player.haswin?.value || player.hasloose?.value
  );
}
export function getPlayerStat(player, gameData) {
  let arrayOfStat = [];
  for (let key in player) {
    if (key == "skin") {
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

    if (player[key] && player[key].value !== undefined) {
      arrayOfStat.push({ name: key, value: player[key].value ?? player[key] });
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
  return players.find((player) => player.position == view.playerView);
}
