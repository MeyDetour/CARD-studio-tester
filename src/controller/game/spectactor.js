import { players } from "../../main.js";
import { getPlayerOfCurrentView } from "./players.js";
function specTheGame() {
    let currentPlayer = getPlayerOfCurrentView();
    let socket = players.find(player => player.id == currentPlayer.id)?.socket || null;
    if (socket){
        socket.emit("specTheGame" );
    }

}
window.specTheGame = specTheGame;