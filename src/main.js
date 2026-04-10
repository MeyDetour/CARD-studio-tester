import "./websocket/connection.js";
import "./controller/game/game.js";
import "./controller/error.js";
import "./controller/game/actions.js";
import "./controller/game/louancher.js";
import "./helpers/copy.js";
import "./controller/game/spectactor.js";
import "../components/game/widgetLetCommentaire/widgetLetCommentaire.js";
import "./controller/game/players.js";
import { apiClient } from "./helpers/api.js";
import { env } from "../env.js";
import { getRandomSkin } from "./controller/game/players.js";
import { loadRoute } from "./router/router.js";
import {
  getGameId,
  getToken,
  setToken,
  setGameId,
  deleteToken,
  deleteGameId,
} from "./controller/game/dataStorage.js";
export let token = getToken() || null;
export let gameId = getGameId() || null;
export let players = [];

const getGame = async () => {
  try {
    let gameInDB = await apiClient("api/game/" + gameId, null, {
      token: token,
    });
    if (!gameInDB) {
      console.error("Game not found in DB for ID:", gameId);
      return;
    }
    connectSocket(gameInDB);
  } catch (e) {
    console.log(e);
    if (e.message === "UNAUTHORIZED") {
      disconnectAndReconnect();
    }
  }
};

const disconnectAndReconnect = () => {
  if (window.opener) {
    // On prévient Studio que la session est morte
    window.opener.postMessage("UNAUTHORIZED", env.CARD_STUDIO_FRONT_END_URL);
    // On ferme la fenêtre de test
    deleteToken();
    deleteGameId();
    loadRoute({path:"/page-401"});
    //window.close();
  } else {
    // Si la fenêtre a été ouverte seule, on redirige juste
    alert("Session expirée, veuillez repasser par Card Studio.");
  }
};
const redirectToCardStudio = () => {
  window.location.href = env.CARD_STUDIO_FRONT_END_URL;
}
window.redirectToCardStudio = redirectToCardStudio;
const handleMessage = (event) => {
    if (token || gameId) return;
    if (event.origin !== env.CARD_STUDIO_FRONT_END_URL) {
      return;
    }

    token = event.data.token;
    gameId = event.data.gameId;

    if (token) {
      setToken(token);
      setGameId(gameId);
      getGame();
    } else {
      console.warn("Message reçu sans token :", event.data);
    }
    window.removeEventListener("message", handleMessage);
  };
const initApp = async () => {
  // 3 - handle message from card studio with token and gameId to start the app
  

  // 2 - wait for message from card studio with token and gameId to start the app
  window.addEventListener("message", handleMessage);

  // 1 - response if card studio call test app
  if (window.opener && !token && !gameId) {
    window.opener.postMessage("READY_FOR_TOKEN", env.CARD_STUDIO_FRONT_END_URL);
  }

  // 4 - if page is reloaded and token and gameId are already in localStorage, start the app
  if (token && gameId) {
    getGame();
    return
  }

  loadRoute({path:"/"});
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
