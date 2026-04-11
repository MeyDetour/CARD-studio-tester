import { 
  storeGameData,
} from "../../controller/game/dataStorage.js"; 
import { reloadComposant_winPage } from "../../../components/game/winPage/winPage.js";
import { reloadComposant_StatPage } from "../../../components/game/statPage/statPage.js";


export function gameManagementListen(socket) {
  socket.on("gameStarted", ({ gameData }) => {
    console.log("RECEIVE GAME START SIGNAL");
    storeGameData(gameData);
    reloadComposant_StatPage();
  });
  socket.on("gameEnd", ({ gameData }) => {
    console.log("RECEIVE GAME END SIGNAL");
    storeGameData(gameData);
    reloadComposant_StatPage();
  });
  socket.on("playerWin", ({ gameData, player }) => {
    console.log("=========RECEIVE PLAYER WIN SIGNAL========");
    storeGameData(gameData); 
    reloadComposant_winPage();
  });
}
