import { connectSocket } from "../websocket/connection.js";
import { homePage } from "../../pages/home/home.js";
import { gamesPage } from "../../pages/games/games.js";
import { enterLinkPage } from "../../pages/enterLink/enterLink.js";
import { choosePseudoPage } from "../../pages/choose-pseudo/choose-pseudo.js";
import { gamePage } from "../../pages/game/game.js";
import { gameCodeErrorPage } from "../../pages/gameCodeError/gameCodeError.js";
import { loadingPage } from "../../pages/loading/loading.js";
import {
  deleteRoomId,
  getRoomId,
  deleteAllGameVariablesSaved,
} from "../controller/game/dataStorage.js";
import gameplayPage from "../../components/game/game/gameplayPage.js";
import { verifyGameId } from "../controller/game/game.js";
export async function loadRoute(params = {}) {
  const route = params.path;
  if (!route) {
    console.warn("No route provided, navigating to home page");
    navigateTo({ path: "/" });
    return;
  }

  let content = document.querySelector("#content");
  let html = "";
  console.log("Navigating to:", route, params);

  // HANDLE SAVE
  // si on est deconnecter
  //  on peut refresh et revenir sur la partie
  // si on change de page on delete les data
  if (route != "/" && route != "/game") {
    deleteRoomId();
  }

  //let roomId = getRoomId();
  //if (roomId && route == "/") {
  //  verifyGameId({ roomId: roomId, result: null });
  //  deleteRoomId();
  //  return;
  //}

  switch (route) {
    case "/choose-link":
      html = enterLinkPage(params);
      break;
    case "/game":
      html = loadingPage(params);
      content.innerHTML = html;
      setTimeout(() => {
        html = gamePage(params);
        content.innerHTML = html;
      }, 2000);
      return;
    case "/choose-pseudo":
      html = choosePseudoPage(params);
      break;
    case "/game-code-error":
      html = gameCodeErrorPage(params);
      break;
    case "/enter-link":
      html = enterLinkPage(params);
      break;
    case "/games":
      deleteAllGameVariablesSaved();
      html = await gamesPage(params);
      break;
    case "/":
      deleteAllGameVariablesSaved();
      html = homePage(params);
      break;
    case "/gameplay":
      html = ` ${gameplayPage()} 
                 <div id="widgetDiv"></div>
        `;
      console.log(html);
      break;
    default:
      html = homePage(params);
      break;
  }
  content.innerHTML = html;
}

export function navigateTo(route, params = {}) {
  loadRoute(route, params);
}
window.navigateTo = navigateTo;
export async function router() {
  // Connecter le socket en premier
  await connectSocket();
  await loadRoute({ path: "/" });
}
