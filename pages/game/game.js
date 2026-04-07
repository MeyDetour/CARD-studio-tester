import gameplayPage, {
  reloadComposant_gameplayPage,
} from "../../components/game/game/gameplayPage.js";
import {
  winPage,
  reloadComposant_winPage,
} from "../../components/game/winPage/winPage.js";
import {
  waitingPage,
  reloadComposant_waitingPage,
} from "../../components/game/waitingPage/waitingPage.js";
import {
  loosePage,
  reloadComposant_loosePage,
} from "../../components/game/loosePage/loosePage.js";
import { displayError } from "../../src/controller/error.js";
import {
  getCurrentPlayer,
  getGameData
} from "../../src/controller/game/dataStorage.js";
import { incrementePlayerCount } from "../../src/controller/game/gameStatistics.js";

export function gamePage(params = {}) {
  let currentPlayer = getCurrentPlayer();
  let gameData = getGameData();

  if (!currentPlayer) {
    navigateTo({ path: "/" });
    return;
  }

  if (!gameData) {
    displayError("No game data found to display game");
    navigateTo({ path: "/games" });
    return;
  }
  if (!window.socket) {
    displayError("No socket found to display game");
    navigateTo({ path: "/games" });
    return;
  }

  if (gameData.data.state.value == "waitingPlayers") {
    return waitingPage(gameData, currentPlayer);
  }
  if (gameData.data.state.value == "inProgress") {
    return gameplayPage();
  }
}

export function reloadComposant_gamePage() {
  let gameData = getGameData();
  let currentPlayer = getCurrentPlayer();

  if (!gameData) {
    displayError("No game data found to display game");
    navigateTo({ path: "/games" });
    return;
  }
  if (gameData.data.state.value == "waitingPlayers") {
    console.log("reload waiting players");
    reloadComposant_waitingPage();
  }
  if (gameData.data.state.value == "inProgress") {
    console.log("reload in progress");
    reloadComposant_gameplayPage();
  }
  if (
    (gameData.data.state.value == "endOfGame" ||
      currentPlayer.haswin.value === true) &&
    currentPlayer.isSpectator.value !== true
  ) {
    incrementePlayerCount(gameData.roomInDb.id);
    console.log("reload win/lose page");
    reloadComposant_winPage();
  }
  if (
    (gameData.data.state.value == "endOfGame" ||
      currentPlayer.hasloose.value === true) &&
    currentPlayer.isSpectator.value !== true
  ) {
    incrementePlayerCount(gameData.roomInDb.id);
    console.log("reload win/lose page");
    reloadComposant_loosePage();
  }
}
