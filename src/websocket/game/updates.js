import {  storeGameData } from "../../controller/game/dataStorage.js";
import { reloadComposant_gamePage } from "../../../pages/game/game.js";
import { addMessageInLoadingMessage } from "../../../components/game/game/messageOfLoading/messageOfLoading.js";
 

export function gameUpdatesListen(socket) {

      socket.on("youAreSpectator", (currentPlayer) => {
        console.log("RECEIVE YOU ARE SPECTATOR :>>", { currentPlayer });
    
        reloadComposant_gamePage();
      });
    
      socket.on("playerData", (currentPlayer) => {
        console.log("RECEIVE PLAYER DATA :>>", { currentPlayer });
       
      });
    
      socket.on("gameChanges", ({ gameData, currentPlayer }) => {
        console.log("RECEIVE GAME CHANGES :>>", { gameData, currentPlayer });
        console.log(
          "current player position :",
          gameData.data.currentPlayerPosition.value,
        ); 
      });
    
      socket.on("updateGameDataLogs", (message) => {
        addMessageInLoadingMessage(message);
      });
}