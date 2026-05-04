import { gameplay_identityContainer } from "../identityContainer/identityContainer.js"; 
export function gameplay_displayAllPlayers(gameData, currentPlayer) {
  if (!gameData) {
    displayError("No game data found to display game");
    return "";
  }
  let gainList = gameData.roomInDb.assets.gains;

  // on doit séparé le joueur actuel, ca permet d'avoir player1 player2 pour les autres joueurs sans sauté une valeur à cause du joueur actuel
  let players = gameData.data.players.filter(
    (player) => player.id !== currentPlayer.id,
  );
  let params = gameData.roomInDb.params.rendering.game;

  return /*html */ ` 
       
         ${!gameData.data.spectators.some(spectator => spectator.id === currentPlayer.id) ? gameplay_identityContainer(currentPlayer, {
          key: 0,
          displayPoints: params.displayStatistics,
          dislayCardCount: params.displayCountAdversaryHandDeck,
          gainList: gainList,
          totalPlayerCount: players.length + 1,
          isCurrentPlayerTurn:
            gameData.data.currentPlayerPosition.value ===
            currentPlayer.position,
        }) : ""}
            ${players
              .map((player, key) =>
                gameplay_identityContainer(player, {
                  key: key + 1,
                  displayPoints: params.displayStatistics,
                  dislayCardCount: params.displayCountAdversaryHandDeck,
                  gainList: gainList,
                  totalPlayerCount: players.length + 1,
                  isCurrentPlayerTurn:
                    gameData.data.currentPlayerPosition.value ===
                    player.position,
                })
              )
              .join("")}
    ` 
}

export function reloadComposant_gameplayPlayers(content,gameData, currentPlayer) {
 
 
  document.querySelectorAll("#gameplayPage .player").forEach((playerElt) => {
    playerElt.remove();
  });
  content.innerHTML += gameplay_displayAllPlayers(gameData, currentPlayer);
}
