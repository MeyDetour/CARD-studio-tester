import "./websocket/connection.js";
import "./controller/game/messages.js";
import "./controller/game/game.js";
import "./controller/error.js";
import "./controller/game/actions.js";
import "./helpers/copy.js";
import "./controller/game/spectactor.js";
import "../components/game/widgetLetCommentaire/widgetLetCommentaire.js";
import "./controller/game/players.js";
import { env } from "../env.js";
import { router } from "./router/router.js";
export let token = ""
export let gameId = ""

const initApp = () => {
  window.addEventListener("message", (event) => {
    console.log(event);
    // Vérification de l'origine (Sécurité !)
    if (event.origin !== env.CARD_STUDIO_FRONT_END_URL) {
      console.warn("Message reçu d'une origine non autorisée :", event.origin);
      return
    }

    token  = event.data.token;
    gameId = event.data.gameId;
    
    if (token) {
      // Stocke le token (sessionStorage est bien pour les tests)
      sessionStorage.setItem("jwt", token);
      console.log("Token reçu pour la partie :", gameId);
      
      // Lance ton router seulement APRES avoir reçu le token
      if (typeof router === "function") router();
    }else{
      console.warn("Message reçu sans token :", event.data);
    }
  });

  // On prévient le management qu'on est prêt à recevoir le token
  if (window.opener && !token && !gameId) {
    console.log(window.opener);
    window.opener.postMessage("READY_FOR_TOKEN", env.CARD_STUDIO_FRONT_END_URL);
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}