function specTheGame() {
    if (socket){
        socket.emit("specTheGame" );
    }

}
window.specTheGame = specTheGame;