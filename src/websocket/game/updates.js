import {  storeGameData } from "../../controller/game/dataStorage.js";  
import { reloadComposant_StatPage } from "../../../components/game/statPage/statPage.js"; 

export function gameUpdatesListen(socket) {

      socket.on("youAreSpectator", (currentPlayer) => {
        console.log("RECEIVE YOU ARE SPECTATOR :>>", { currentPlayer });
    
        reloadComposant_StatPage();
      });
    
      socket.on("playerData", (currentPlayer) => {
        console.log("RECEIVE PLAYER DATA :>>", { currentPlayer });
       
      });
    
      socket.on("gameChanges", ({ gameData, currentPlayer }) => {
        console.log("RECEIVE GAME CHANGES :>>", { gameData, currentPlayer });
        
        storeGameData(gameData);
        reloadComposant_StatPage();
      });
     
}